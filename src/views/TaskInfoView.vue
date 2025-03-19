<script setup lang="ts">
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
import AppInput from '../components/AppInput.vue';
import AppButton from '../components/AppButton.vue';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { tasks } from '@/composables/useTasks';

const router = useRouter();
const route = useRoute();
const task = computed(() => {
    return tasks.find(item => item.id === +route.params.id)
})
</script>

<template>
    <AppNavbar />

    <div class="px-4 sm:px-8 mt-4 flex justify-end">
        <AppButton @click="router.push({ name: 'Tasks' })" class="w-6/12 sm:w-2/12 flex justify-center items-center gap-4
                            hover:gap-6 transition-all duration-300">
            back to task list <i class="fa-solid fa-angles-right"></i>
        </AppButton>

    </div>
    <main class="px-4 sm:px-8 flex flex-col items-center gap-4 my-8 min-h-[31em]">
        <h1 class="mt-4 text-2xl font-bold sm:text-3xl md:text-3xl capitalize text-green-400">
            <i class="fa-solid fa-list-check"></i> task details
        </h1>

        <form @submit.prevent="" class="w-full sm:w-8/12 p-3 sm:p-6 border border-green-300 rounded-2xl">
            <AppInput label="task title" name="title" type="text" :hide="true" v-model:modelValue="task.title" />

            <AppInput label="task status" name="status" type="select" placeholder="Enter task title"
                :options="['done', 'pending']" v-model:modelValue="task.status" :hide="true" />

            <AppInput label="created_at" name="created_at" type="text" :hide="true" v-model="task.created_at" />

            <AppInput label="task description" name="description" type="textarea" placeholder="Enter task description"
                v-model:modelValue="task.description" :hide="true" />

        </form>
    </main>
    <AppFooter />
</template>
