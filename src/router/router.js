import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import SignupView from "@/views/auth/SignupView.vue";
import ForgetPasswordView from "@/views/auth/ForgetPasswordView.vue";
import TasksView from "@/views/TasksView.vue";
import TaskInfoView from "@/views/TaskInfoView.vue";
import AddTaskView from "@/views/AddTaskView.vue";
import { isAuthenticated } from "@/composables/useAuth";

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
        component: TasksView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/tasks/taskinfo/:id',
        name: 'TaskDetails',
        component: TaskInfoView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user/tasks/add-task',
        name: 'AddTask',
        component: AddTaskView,
        meta: {
            requiresAuth: true
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = isAuthenticated();

    if (to.meta.requiresAuth && !isLoggedIn) {
        return next({ name: "Login" });
    }

    next();
});


export default router;