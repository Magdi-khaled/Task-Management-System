<script setup>
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
import AppButton from '../components/AppButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

</script>
<template>
    <AppNavbar />
    <main class="px-4 sm:px-8 h-[85vh] flex flex-col justify-center items-center text-center">
        <h1 class="text-3xl sm:text-4xl font-bold">Task Management Made Simple</h1>
        <p class="mt-4 text-lg sm:text-xl max-w-2xl text-black-100">
            A powerful and intuitive <span class="capitalize text-green-500">task management system</span>built with
            Vue.js.
            Effortlessly create, update, and manage tasks with a seamless user experience.
            Stay organized and boost productivity with our single-page application.
        </p>
        <AppButton @click="router.push({ name: 'Tasks' })"
            class="mt-8 w-10/12 sm:w-5/12 md:w-3/12 lg:w-2/12 flex gap-2 justify-center items-center hover:gap-4  transition-all duration-300">
            get started <i class="fa-solid fa-arrow-right"></i>
        </AppButton>
    </main>
    <AppFooter />
</template>

<style scoped>
main {
    background-image: linear-gradient(rgba(0, 0, 0, 0.068), rgba(0, 0, 0, 0.289)),
        url('../assets/media/bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
}
</style>