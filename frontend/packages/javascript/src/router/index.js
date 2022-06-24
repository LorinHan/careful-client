import { createRouter, createWebHashHistory } from "vue-router";
import Server from "@/views/Server.vue";
import Node from "@/views/settings/Node.vue";

const routes = [
  {
    path: "/",
    name: "Server",
    component: Server,
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
