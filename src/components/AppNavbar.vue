<script setup lang="ts">
import AppButton from './AppButton.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';
import authStore from '../stores/auth';

const router = useRouter();
const toggleNavigation = ref(true);
const notSmallScreen = ref(false);


const updateScreen = () => {
    notSmallScreen.value = window.innerWidth > 746;
}
onMounted(() => {
    notSmallScreen.value = window.innerWidth > 746;
    window.addEventListener('resize', updateScreen)
});
onUnmounted(() => {
    window.removeEventListener('resize', updateScreen)
});

const logout = async () => {
    try {
        // await authStore.logout();
        router.push({ name: 'Login' });
    }
    catch (err) {
        console.error('Error Logout', err);
    }
}

</script>

<template>
    <div class="px-4 sm:px-8 flex items-center justify-between py-2 border-b-2 border-green-400">
        <!-- Logo -->
        <div class="w-2/12 text-primary flex items-center gap-4">
            <!-- <img class="aspect-square w-12" src="../assets/media/web-icon.svg" alt=""> -->
            <h1 class="capitalize font-bold text-xl sm:text-2xl lg:text-3xl monoton-regular text-green-500"> TASK system
            </h1>
        </div>
        <transition name="fade">
            <!-- Links -->
            <div v-if="toggleNavigation && notSmallScreen || !toggleNavigation && !notSmallScreen" class="fixed md:relative z-10 h-full
                        md:h-fit top-0 md:top-0 right-0 w-11/12 md:w-6/12 lg:w-5/12 bg-white md:bg-transparent
                        shadow-md md:shadow-none px-4 md:px-0 border-l-2 md:border-l-0 border-l-green-300">
                <nav>
                    <!-- Toggle Menu Button -->
                    <div class="md:hidden w-full text-end pt-4 pb-2 border-b border-b-green-400">
                        <button @click="toggleNavigation = !toggleNavigation" class="md:hidden cursor-pointer">
                            <i class="fa-solid fa-bars-staggered text-2xl"></i>
                        </button>
                    </div>
                    <ul class="flex flex-col md:flex-row gap-0 md:gap-8 text-left">
                        <li
                            class="text-green-400 capitalize font-semibold hover:text-green-500 hover:bg-green-50 hover:md:bg-white duration-100 border-b md:border-b-0 md:border-b-green-300">
                            <routerLink :to="{ name: 'Home' }" class="block w-full h-full py-3 md:py-2 ">home
                            </routerLink>
                        </li>
                        <li
                            class="text-green-400 capitalize font-semibold hover:text-green-500 hover:bg-green-50 hover:md:bg-white duration-100 border-b md:border-b-0 md:border-b-green-300">
                            <routerLink :to="{ name: 'Tasks' }" class="block w-full h-full py-3 md:py-2"> tasks
                            </routerLink>
                        </li>
                        <li
                            class="text-green-400 capitalize font-semibold hover:text-green-500 hover:bg-green-50 hover:md:bg-white duration-100 border-b md:border-b-0 md:border-b-green-300">
                            <routerLink :to="{ name: 'Home' }" class="block w-full h-full py-2 md:py-2">about
                            </routerLink>
                        </li>
                        <li
                            class="text-green-400 capitalize font-semibold hover:text-green-500 hover:bg-green-50 hover:md:bg-white duration-100 border-b md:border-b-0 md:border-b-green-300">
                            <routerLink :to="{ name: 'Home' }" class="block w-full h-full py-3 md:py-2">contact
                            </routerLink>
                        </li>
                        <li
                            class="text-green-400 capitalize font-semibold hover:text-green-500 hover:bg-green-50 hover:md:bg-white duration-100 border-b md:border-b-0 md:border-b-green-300">
                            <routerLink :to="{ name: 'Home' }" class="block w-full h-full py-3 md:py-2">support
                            </routerLink>
                        </li>
                    </ul>
                    <!-- Sign In Button -->
                    <div class="block md:hidden w-full text-center my-4">
                        <AppButton @click="router.push({ name: 'Login' })" class="py-[4px]">sign in</AppButton>
                    </div>
                    <!-- Sign Out Button -->
                    <!-- <div class="block md:hidden w-full text-center">
                        <AppButton @click="logout" class="py-[4px]">Log out</AppButton>
                    </div> -->
                </nav>
            </div>
        </transition>
        <!-- Toggle Menu Button -->
        <button @click="toggleNavigation = !toggleNavigation" class="md:hidden cursor-pointer">
            <i class="fa-solid fa-bars-staggered text-2xl"></i>
        </button>

        <!-- Sign In Button -->
        <div class="hidden md:block">
            <AppButton @click="router.push({ name: 'Login' })" class="py-[4px]">sign in</AppButton>
        </div>

        <!-- Sign Out Button -->
        <!-- <div class="hidden md:block">
                <AppButton @click="logout" class="py-[4px]">Log out</AppButton>
            </div> -->
    </div>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: translateX(0%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>