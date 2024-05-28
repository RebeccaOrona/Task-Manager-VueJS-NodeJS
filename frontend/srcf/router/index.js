import { createRouter, createWebHistory } from "vue-router";
import TaskList from "../components/TaskList.vue";
import StatusHistory from "../components/StatusHistory.vue";
import HomePage from "../components/Home.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/api/tasks",
    name: "Tasks",
    component: TaskList,
  },
  {
    path: "/api/statusHistory",
    name: "StatusHistory",
    component: StatusHistory,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
