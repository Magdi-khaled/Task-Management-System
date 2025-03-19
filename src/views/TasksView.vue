<script setup>
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppButton from '@/components/AppButton.vue';
import FilterComponent from '@/components/taskComponents/Filter.vue';
import TaskTable from '@/components/taskComponents/TaskTable.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from "vuex";

const store = useStore();
const tasksLength = ref(null);
const router = useRouter();
const filteredArray = ref([]);

onMounted(async () => {
    await store.dispatch("task/fetchTasks");
    tasksLength.value = await store.getters["task/getTasks"].length;
});


</script>
<template>
    <AppNavbar />
    <div class="px-4 sm:px-8 mt-4">
        <div class="flex flex-col-reverse sm:flex-row gap-y-4 sm:gap-y-0 justify-between">
            <h1 class="w-fit font-bold text-xl text-primary capitalize pb-1 border-b-[3px] border-b-green-500">
                <i class="fa-solid fa-list-check"></i> your task list<span class="text-md text-highlight">
                    ({{ tasksLength }})</span>
            </h1>
            <div class="w-full sm:w-fit flex justify-end">
                <AppButton @click="router.push({ name: 'AddTask' })" class="w-6/12 sm:w-fit flex justify-center items-center gap-4
                            hover:gap-6 transition-all duration-300">
                    add new task <i class="fa-solid fa-plus"></i>
                </AppButton>
            </div>
        </div>

        <FilterComponent @update:filteredArray="(val) => filteredArray = val" />
        <TaskTable :tasks="filteredArray" />
    </div>
    <AppFooter />
</template>