<script setup lang="ts">
import AppInput from "../AppInput.vue";
import { watch, ref, defineEmits, onMounted } from "vue";
import Loading from '@/components/Loading.vue';
import { useStore } from "vuex";

const emit = defineEmits(["update:filteredArray"]);
const store = useStore();

const filterResults = ref([]);
const searchText = ref("");
const selectedStatus = ref("");
const searchLoading = ref(false);
let debounceTimer = ref(null);

onMounted(async () => {
    await store.dispatch("task/fetchTasks");
    filterResults.value = await store.getters["task/getTasks"];
    emit("update:filteredArray", filterResults.value);
});

const filterTasks = () => {
    const allTasks = store.getters["task/getTasks"];
    let filtered = [...allTasks];

    if (searchText.value.trim()) {
        filtered = filtered.filter(item => item.title.toLowerCase().includes(searchText.value.toLowerCase()));
    }

    if (selectedStatus.value) {
        filtered = filtered.filter(item => item.status === selectedStatus.value);
    }

    filterResults.value = filtered;
    emit("update:filteredArray", filterResults.value);
};

watch([searchText, selectedStatus], () => {
    searchLoading.value = true;

    if (debounceTimer.value) clearTimeout(debounceTimer.value);
    debounceTimer.value = setTimeout(() => {
        searchLoading.value = false;
        if (!searchText.value.trim() && !selectedStatus.value) {
            filterResults.value = store.getters["task/getTasks"];
            emit("update:filteredArray", filterResults.value);
        } else {
            filterTasks();
        }
    }, 600);
});
</script>

<template>
    <div class="bg-gray-50 shadow-2xl w-full grid grid-cols-1 sm:grid-cols-3 items-center gap-2 p-4 mt-6 rounded-xl">
        <div class="relative col-span-2">
            <AppInput type="text" name="search" placeholder="Search by Title..." :optional="true"
                v-model="searchText" />
            <i v-if="!searchLoading"
                class="fa-solid fa-magnifying-glass text-sm sm:text-md text-highlight absolute left-[2%] sm:left-[1%] top-[30%]"></i>
            <Loading v-else class="absolute left-[0.5%] top-[25%]" />
        </div>
        <AppInput name="filterStatus" type="select" optionsType="Filter by status..." :options="['done', 'pending']"
            v-model="selectedStatus" class="col-span-2 sm:col-span-1 " />
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