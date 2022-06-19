import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import i18n from "@/i18n";

// Register global common components
// 注册全局通用组件
import publicComponents from "@/components/public";
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css';
import api from "@/api/index.js"

const app = createApp(App);

app.use(publicComponents);
app.use(ElementPlus);
app.config.globalProperties.$api = api;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(i18n).mount("#app");
