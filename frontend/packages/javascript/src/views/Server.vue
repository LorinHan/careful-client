<template>
  <div id="server">
    <el-tabs
      tab-position="left"
      style="height: 100%"
      class="demo-tabs"
      @tab-change="tabChange"
    >
      <el-tab-pane :name="0">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><FolderAdd /></el-icon>
            <span> 添加文件夹</span>
          </span>
        </template>
        <el-form :model="form" style="width: 500px">
          <el-form-item label="文件夹名称" label-width="100px">
            <el-input
              style="width: 300px"
              v-model="form.name"
              autocomplete="off"
              maxlength="20"
            />
            <el-button
              v-loading="loading"
              type="primary"
              style="margin-left: 20px"
              @click="createFolder"
              >创建</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-for="item in folderList" :key="item.id" :name="item.id">
        <template #label>
          <span>
            <el-icon
              class="myHover"
              @click.stop="
                folderDialog = true;
                editForm.name = item.name;
                editForm.id = item.id;
              "
              ><Edit
            /></el-icon>
            <span style="margin: 0 10px">{{ item.name }}</span>
            <el-popconfirm title="确定删除吗?" @confirm="delFolder(item.id)">
              <template #reference>
                <el-icon class="myHover"><Delete /></el-icon>
              </template>
            </el-popconfirm>
          </span>
        </template>

        <div class="content">
          <div id="serverTool">
            <el-button
              type="primary"
              style="margin-right: 20px; float: right"
              @click="
                serverForm.id = 0;
                serverDialog = true;
                serverDialogTitle = '创建服务';
              "
              >创建服务</el-button
            >
          </div>
          <el-collapse v-model="collapse">
            <el-collapse-item
              v-for="item in serverPointList"
              :key="item.server_id"
              :name="item.server_id"
            >
              <template #title>
                <div class="title">
                  {{ item.server_name }}
                  <el-icon
                    class="myHover"
                    @click.stop="
                      serverPointDialog = true;
                      serverPointForm.server_id = item.server_id;
                    "
                    ><CirclePlus
                  /></el-icon>
                  <el-icon
                    class="myHover"
                    @click.stop="
                      serverForm.id = item.server_id;
                      serverForm.name = item.server_name;
                      serverDialog = true;
                      serverDialogTitle = '修改服务';
                    "
                    ><Edit
                  /></el-icon>
                  <el-popconfirm
                    title="确定删除吗?"
                    @confirm="delServer(item.server_id)"
                  >
                    <template #reference>
                      <el-icon class="myHover"><Delete /></el-icon>
                    </template>
                  </el-popconfirm>
                </div>
              </template>
              <div>
                <el-card class="box-card" v-for="sp in item.point" :key="sp.id">
                  <template #header>
                    <div class="card-header">
                      <span>{{ sp.name }}</span>
                      <div class="btn">
                        <el-popconfirm
                          title="确定删除吗?"
                          @confirm="delServerPoint(sp.id)"
                        >
                          <template #reference>
                            <el-icon class="myHover"><Delete /></el-icon>
                          </template>
                        </el-popconfirm>
                      </div>
                    </div>
                  </template>
                  <div class="serverPointContent">
                    容器：<span class="font-weight-600">{{
                      sp.container_name
                    }}</span>
                  </div>
                  <div class="serverPointContent">
                    端口：<span class="font-weight-600">{{
                      containers[sp.container_name]
                        ? containers[sp.container_name].public_port +
                          ":" +
                          containers[sp.container_name].private_port
                        : ""
                    }}</span>
                  </div>
                  <div class="serverPointContent">
                    状态：<span class="font-weight-600">{{
                      containers[sp.container_name]
                        ? containers[sp.container_name].state +
                          " " +
                          containers[sp.container_name].status
                        : ""
                    }}</span>
                  </div>
                  <div class="serverPointContent">
                    镜像：<span class="font-weight-600">{{
                      containers[sp.container_name]
                        ? containers[sp.container_name].image
                        : ""
                    }}</span>
                  </div>
                  <div class="serverPointContent">
                    创建时间：<span class="font-weight-600">{{
                      containers[sp.container_name]
                        ? formatTime(
                            containers[sp.container_name].created * 1000
                          )
                        : ""
                    }}</span>
                  </div>
                </el-card>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-model="folderDialog" width="420px" title="编辑文件夹">
      <div class="dialog-body">
        <el-form :model="form">
          <el-form-item label="文件夹名称">
            <el-input
              v-model="editForm.name"
              autocomplete="off"
              maxlength="20"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            class="dialog-btn dialog-y"
            @click="folderDialog = false"
            size="small"
          >
            取消
          </el-button>
          <el-button
            type="primary"
            class="dialog-btn dialog-y"
            @click="updateFolder()"
            size="small"
          >
            修改
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="serverDialog" width="420px" :title="serverDialogTitle">
      <div class="dialog-body">
        <el-form :model="form">
          <el-form-item label="服务名称">
            <el-input
              v-model="serverForm.name"
              autocomplete="off"
              maxlength="20"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            class="dialog-btn dialog-y"
            @click="serverDialog = false"
            size="small"
          >
            取消
          </el-button>
          <el-button
            type="primary"
            class="dialog-btn dialog-y"
            @click="submitServer()"
            size="small"
          >
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="serverPointDialog" width="420px" title="创建服务节点">
      <div class="dialog-body">
        <el-form :model="form">
          <el-form-item label="节点名称">
            <el-input
              v-model="serverPointForm.name"
              autocomplete="off"
              maxlength="20"
            />
          </el-form-item>
          <el-form-item label="容器名称">
            <el-input
              v-model="serverPointForm.container_name"
              autocomplete="off"
              maxlength="20"
            />
          </el-form-item>
          <el-form-item label="网络节点">
            <el-select-v2
              v-model="serverPointForm.node_id"
              :options="nodes"
              placeholder="Please select"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            class="dialog-btn dialog-y"
            @click="serverPointDialog = false"
            size="small"
          >
            取消
          </el-button>
          <el-button
            type="primary"
            class="dialog-btn dialog-y"
            @click="submitServerPoint()"
            size="small"
          >
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { folder, server, serverPoint, docker, node } from "@/api/api.js";
export default {
  name: "Server",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      loading: false,
      form: {
        name: "",
      },
      editForm: {
        id: 0,
        name: "",
      },
      folderList: [],
      folderDialog: false,
      serverDialog: false,
      folderID: 0,
      collapse: ["1", "2", "3", "4"],
      serverPointList: [],
      serverForm: {
        name: "",
        folder_id: 0,
      },
      serverDialogTitle: "创建服务",
      containerName: [],
      containers: {},
      serverPointDialog: false,
      serverPointForm: {
        name: "",
        container_name: "",
        server_id: 0,
        node_id: 0,
      },
      nodes: [],
    };
  },
  methods: {
    createFolder() {
      if (this.form.name.length == 0) {
        return this.$message.error("请填写文件夹名称");
      }
      let req = folder.create;
      req.data = this.form;
      this.$api(req).then((res) => {
        this.getFolder();
        this.form.name = "";
        this.$message.success("操作成功");
      });
    },
    getFolder() {
      this.$api(folder.list).then((res) => {
        this.folderList = res.data.data;
      });
    },
    delFolder(id) {
      let req = folder.del;
      req.data = {
        id: id,
      };
      this.$api(req).then((res) => {
        this.getFolder();
        this.$message.success("操作成功");
      });
    },
    updateFolder() {
      let req = folder.update;
      req.data = this.editForm;
      this.$api(req).then((res) => {
        this.getFolder();
        this.folderDialog = false;
        this.$message.success("操作成功");
      });
    },
    getNodeList() {
      this.$api(node.list).then((res) => {
        this.nodes = [
          {
            value: 0,
            label: "请选择网络节点",
          },
        ];
        res.data.data.forEach((item) => {
          this.nodes.push({
            value: item.id,
            label: item.name,
          });
        });
        console.log(this.nodes);
      });
    },
    formatTime(datetime) {
      var date = new Date(datetime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var year = date.getFullYear(),
        month = ("0" + (date.getMonth() + 1)).slice(-2),
        sdate = ("0" + date.getDate()).slice(-2),
        hour = ("0" + date.getHours()).slice(-2),
        minute = ("0" + date.getMinutes()).slice(-2),
        second = ("0" + date.getSeconds()).slice(-2);
      // 拼接
      var result =
        year +
        "-" +
        month +
        "-" +
        sdate +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      // 返回
      return result;
    },
    tabChange(name) {
      if (name != 0) {
        this.folderID = name;
      }
      this.getServerPointList();
    },
    getServerPointList() {
      const req = serverPoint.list;
      req.params = {
        folder_id: this.folderID,
      };
      this.$api(req).then((res) => {
        this.serverPointList = [];
        this.collapse = [];
        this.containerName = [];
        let servers = {};
        if (res.data.data) {
          res.data.data.forEach((item) => {
            if (!servers[item.server_id]) {
              servers[item.server_id] = {
                server_id: item.server_id,
                server_name: item.server_name,
                point: [],
              };
            }
            if (item.id) {
              servers[item.server_id].point.push(item);
              this.containerName.push(item.container_name);
            }
            this.collapse.push(item.server_id);
          });
          for (const key in servers) {
            this.serverPointList.push(servers[key]);
          }

          this.$api({
            url: docker.list.url,
            method: docker.list.method,
            params: {
              name: this.containerName,
            },
          }).then((dres) => {
            this.containers = {};
            dres.data.data.forEach((item) => {
              if (item.status.length > 20) {
                item.status = item.status.substr(0, 20);
              }
              this.containers[item.name] = item;
            });
          });
        }
      });
    },
    submitServer() {
      this.serverForm.folder_id = this.folderID;
      let req = {
        url: server.create.url,
        method: server.create.method,
        data: this.serverForm,
      };
      if (req.data.id != 0) {
        req.url = server.update.url;
        req.method = server.update.method;
      }

      this.$api(req).then((res) => {
        this.getServerPointList();
        this.serverDialog = false;
        this.$message.success("操作成功");
      });
    },
    delServer(id) {
      this.$api({
        url: server.del.url,
        method: server.del.method,
        data: { id: id },
      }).then((res) => {
        this.getServerPointList();
        this.$message.success("操作成功");
      });
    },
    delServerPoint(id) {
      this.$api({
        url: serverPoint.del.url,
        method: serverPoint.del.method,
        data: { id: id },
      }).then((res) => {
        this.getServerPointList();
        this.$message.success("操作成功");
      });
    },
    submitServerPoint() {
      if (this.serverPointForm.name == "") {
        return this.$message.error("请填写节点名称");
      }
      if (this.serverPointForm.container_name == "") {
        return this.$message.error("请填写容器名称");
      }
      if (this.serverPointForm.node_id == 0) {
        return this.$message.error("请选择网络节点");
      }
      this.$api({
        url: serverPoint.create.url,
        method: serverPoint.create.method,
        data: this.serverPointForm,
      }).then((res) => {
        this.getServerPointList();
        this.serverPointDialog = false;
        this.$message.success("操作成功");
      });
    },
  },
  created() {
    this.getFolder();
    this.getNodeList();
  },
};
</script>
<style lang="scss">
#server {
  width: 100%;
  height: 100%;
  position: relative;
  .myHover:hover {
    color: red;
    cursor: pointer;
  }
  .el-tabs__item.is-left {
    // overflow-y: auto;
    text-align: center;
  }
  .el-tabs__content {
    height: 100%;
    overflow-y: auto !important;
  }
  #addFolderBtn {
    position: absolute;
  }
  .content {
    .title {
      padding: 0 10px;
      font-size: 16px;
      font-weight: 600;
      i {
        margin: 0 10px;
      }
    }
    .box-card:first-child {
      margin-right: 1%;
    }
    .box-card {
      width: 49%;
      float: left;
      margin-bottom: 10px;
      .serverPointContent {
        float: left;
        width: 50%;
        margin-bottom: 5px;
      }
    }
  }

  #serverTool {
    overflow: hidden;
    margin-bottom: 20px;
  }
  .el-collapse-item {
    margin-bottom: 20px;
  }
  .el-card__body {
    overflow: hidden;
  }
  .el-card__body {
    padding: 10px;
  }
  .font-weight-600 {
    font-weight: 600;
  }
  .card-header {
    .btn {
      float: right;
    }
  }
}
</style>
