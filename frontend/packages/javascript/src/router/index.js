import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Node from "@/views/settings/Node.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/settings/node",
    name: "Node",
		component: Node,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
