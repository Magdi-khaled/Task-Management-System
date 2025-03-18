import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import SignupView from "@/views/auth/SignupView.vue";
import ForgetPasswordView from "@/views/auth/ForgetPasswordView.vue";
import TasksView from "@/views/TasksView.vue";
import TaskInfoView from "@/views/TaskInfoView.vue";

const routes = [
    {
        path: '/',
        redirect: '/Home',
    },
    {
        path: '/home',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignupView
    },
    {
        path: '/auth/forgetpassword',
        name: 'ForgetPassword',
        component: ForgetPasswordView
    },
    {
        path: '/user/tasks',
        name: 'Tasks',
        component: TasksView
    },
    {
        path: '/user/tasks/taskinfo/:id',
        name: 'TaskDetails',
        component: TaskInfoView
    },
    // {
    //     path: '/user/tasks/editinfo/:id',
    //     name: 'EditTask',
    //     component: TaskInfoView
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // const userRole = getUserRole();
    // const isLoggedIn = isAuthenticated();

    // if (to.meta.requiresAuth && !isLoggedIn) {
    if (to.meta.requiresAuth) {
        return next({ name: "Login" });
    }

    next();
});


export default router;