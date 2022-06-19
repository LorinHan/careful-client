<template>
	<div id="node">
		<p id="title">网络节点设置</p>

		<div id="apiHost">
			<span class="title">数据服务节点：</span>
			<el-input class="input" v-model="apiHost" placeholder="请输入数据服务节点" />
			<el-button class="btn" @click="setApiHost" type="primary">修改</el-button>
		</div>

		<div id="nodeTable">
			<p>docker操作节点 <el-button style="float: right;" type="primary" @click="dialog=true; dialogMode = 'create';">添加</el-button>
			</p>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="name" label="节点名称" />
				<el-table-column prop="ip" label="IP" />
				<el-table-column prop="created_at" label="创建时间" />
				<el-table-column fixed="right" label="操作" width="120">
					<template #default="scope">
						<el-button link type="primary" size="small" @click="dialog=true;dialogMode='update';form.id = scope.row.id;form.name=scope.row.name;form.ip=scope.row.ip;">编辑</el-button>
						<el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF" title="确定要删除吗？"
						 @confirm="del(scope.row.id)">
							<template #reference>
								<el-button link type="primary" size="small">删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<el-dialog v-model="dialog" :title="dialogMode == 'create' ? '添加docker操作节点' : '编辑docker操作节点'">
			<el-form :model="form" style="width: 500px;">
				<el-form-item label="节点名称" label-width="100px">
					<el-input style="width: 300px;" v-model="form.name" autocomplete="off" />
				</el-form-item>
				<el-form-item label="节点ip" label-width="100px">
					<el-input style="width:300px;" v-model="form.ip" autocomplete="off" />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialog = false">取消</el-button>
					<el-button v-loading="loading" type="primary" @click="submit">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script>
	import {
		node
	} from "@/api/api.js";
	export default {
		name: "Node",
		created() {
			this.apiHost = localStorage.getItem("c-api-host");
			this.$api(node.list).then(res => {
				this.tableData = res.data.data;
			})
		},
		data() {
			return {
				apiHost: "",
				dialog: false,
				loading: false,
				dialogMode: 'create',
				form: {
					name: '',
					ip: '',
				},
				tableData: [{
						date: '2016-05-03',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles',
					},
					{
						date: '2016-05-02',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles',
					},
					{
						date: '2016-05-04',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles',
					},
					{
						date: '2016-05-01',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles',
					},
				],
			}
		},
		methods: {
			setApiHost() {
				localStorage.setItem("c-api-host", this.apiHost);
				this.$api(node.list).then(res => {
					this.tableData = res.data.data;
				})
				this.$message.success("操作成功");
			},
			submit() {
				if (this.dialogMode == "create") {
					if (this.form.name == "") {
						return this.$message.error("请填写节点名称");
					}
					if (this.form.ip == "") {
						return this.$message.error("请填写节点ip");
					}
				}

				this.loading = true;
				let api = node.create;
				if (this.dialogMode == 'update') {
					api = node.update;
				} else {
					this.form.id = 0;
				}
				api.data = this.form;
				this.$api(api).then(res => {
					this.loading = false;
					this.dialog = false;
					this.form = {
						name: "",
						ip: ""
					}
					this.$api(node.list).then(res => {
						this.tableData = res.data.data;
					})
					this.$message.success("操作成功");
				}).catch(err => {
					this.loading = false;
				});
			},
			del(id) {
				let api = node.del;
				api.data = {id: id};
				this.$api(api).then(res => {
					this.$api(node.list).then(res => {
						this.tableData = res.data.data;
					});
					this.$message.success("操作成功");
				})
			}
		}
	};
</script>
<style lang="scss">
	#node {
		#title {
			font-size: 18px;
			font-weight: 600;
		}

		#apiHost {
			margin-top: 20px;

			.title {
				margin-right: 10px;
			}

			.input {
				display: inline-block;
				width: 200px;
			}

			.btn {
				margin-left: 10px;
			}
		}

		#nodeTable {
			margin-top: 20px;

			p {
				margin-bottom: 10px;
			}
		}

		.el-dialog__footer {
			text-align: left !important;
			padding-left: 120px;
		}
	}
</style>
