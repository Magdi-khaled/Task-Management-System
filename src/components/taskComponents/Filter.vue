<script setup lang="ts">
import AppInput from "../AppInput.vue";
import { watch, ref, defineEmits } from "vue";
import Loading from '@/components/Loading.vue';
import { tasks } from '@/composables/useTasks';

const emit = defineEmits(["update:filteredArray"]);

const filterResults = ref([...tasks]);
const searchText = ref("");
const selectedStatus = ref("");
const searchLoading = ref(false);
let debounceTimer = ref(null);

emit("update:filteredArray", filterResults.value);

const filterUsers = () => {
    if (searchText.value)
        filterResults.value = tasks.filter(item => item.title.toString().toLowerCase().includes(searchText.value.toLowerCase()));

    if (searchText.value && selectedStatus.value) {
        filterResults.value = filterResults.value.filter(item => selectedStatus.value === 'done' ? item.status === true : item.status === false);
    }

    else if (selectedStatus.value && !searchText.value)
        filterResults.value = tasks.filter(item => selectedStatus.value === 'done' ? item.status === true : item.status === false);

    emit("update:filteredArray", filterResults.value);
};


watch([searchText, selectedStatus], (newVal) => {
    searchLoading.value = true;
    if (debounceTimer.value) clearTimeout(debounceTimer.value);

    debounceTimer.value = setTimeout(() => {
        searchLoading.value = false;
        if (newVal[0] === "") {
            emit("update:filteredArray", tasks);
        }
        else filterUsers();
    }, 1000);
});

</script>

<template>
    <div class="bg-gray-100 shadow-2xl w-full grid grid-cols-1 sm:grid-cols-3 items-center gap-2 p-4 mt-6 rounded-xl">
        <div class="relative col-span-2">
            <AppInput type="text" name="search" placeholder="Search by name, email..." :optional="true"
                v-model="searchText" />
            <i v-if="!searchLoading"
                class="fa-solid fa-magnifying-glass text-sm sm:text-md text-highlight absolute left-[2%] sm:left-[1%] top-[30%]"></i>
            <Loading v-else class="absolute left-[0.5%] top-[25%]" />
        </div>
        <AppInput name="filterStatus" type="select" optionsType="Filter by status..." :options="['done', 'pending']"
            v-model="selectedStatus" class="col-span-2 sm:col-span-1" />
    </div>
</template>

<style scoped>
:deep(input) {
    padding-left: 2rem;
}

@media (max-width:536px) {
    :deep(input) {
        padding-left: 1.5rem;
    }
}
</style>