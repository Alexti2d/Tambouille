import { createApp } from "vue";
import ComponentListArticle from "./components/ComponentListArticle.vue";
import FormAddArticle from "./components/FormAddArticle.vue";
import Main from "./layouts/Main.vue";
import Login from "./layouts/login/Login.vue";
import * as VueRouter from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'ComponentListArticle',
        component: ComponentListArticle
    },
    {
        path: '/form-add',
        name: 'FormAddArticle',
        component: FormAddArticle
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

createApp(Main).use(router).mount("#app");
