<template>
  <div class="home">
    <p>Hello wails vue</p>
		<el-button type="primary">>El BTN</el-button>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
};
</script>
<style lang="scss">
.home {
  .logo {
    display: block;
    width: 620px;
    height: 280px;
    margin: 10px auto 10px;
  }
  .link {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    margin: 18px auto;
    .btn {
      display: block;
      width: 150px;
      height: 50px;
      line-height: 50px;
      padding: 0 5px;
      margin: 0 30px;
      border-radius: 8px;
      text-align: center;
      font-weight: 700;
      font-size: 16px;
      white-space: nowrap;
      text-decoration: none;
      cursor: pointer;
      &.start {
        background-color: #fd0404;
        color: #ffffff;
        &:hover {
          background-color: #ec2e2e;
        }
      }
      &.star {
        background-color: #ffffff;
        color: #fd0404;
        &:hover {
          background-color: #f3f3f3;
        }
      }
    }
  }
}
</style>
