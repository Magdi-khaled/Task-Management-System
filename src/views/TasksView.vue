<script setup>
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';
import FilterComponent from '@/components/taskComponents/Filter.vue';
import TaskTable from '@/components/taskComponents/TaskTable.vue';
import { ref } from 'vue';
import { tasks } from '@/composables/useTasks';

const filteredArray = ref([]);

</script>
<template>
    <AppNavbar />
    <div class="px-4 sm:px-8 mt-4">
        <h1 class="w-fit font-bold text-xl text-primary capitalize pb-1 border-b-[3px] border-b-green-500">
            <i class="fa-solid fa-list-check"></i> Task List<span class="text-md text-highlight">
                ({{ tasks.length }})</span>
        </h1>

        <FilterComponent @update:filteredArray="(val) => filteredArray = val" />

        <TaskTable :tasks="filteredArray" />
    </div>
    <AppFooter />
</template>