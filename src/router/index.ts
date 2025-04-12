import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // 使用 HTML5 模式
    routes: [
        {
            path: "/list/:part",
            name: "InfoList",
            component: () => import("@/views/InfoList.vue"),
            props: true,
        },
        {
            path: "/",
            redirect: "/list/find",
        },
    ],
});

export default router;
