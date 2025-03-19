<script setup>
import { ref, computed } from 'vue';
import Options from '@/components/taskComponents/Options.vue';
import Pagination from '@/components/taskComponents/Pagination.vue';
import AppButton from '../AppButton.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    tasks: { type: Array, required: true }
});

const router = useRouter();
const showInfo = ref(null);
const currentPage = ref(1);
const pageSize = ref(5);

const totalPages = computed(() => {
    return Math.ceil(props.tasks.length / pageSize.value);
});

const paginatedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return props.tasks.slice(startIndex, endIndex);
});

const toggleShowInfo = (index) => {
    showInfo.value === index ? showInfo.value = null : showInfo.value = index;
};
const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};
const islastRow = () => {
    return showInfo.value === paginatedItems.value.length - 1 || showInfo.value === paginatedItems.value.length - 2
        && showInfo.value != 0;
};
</script>
<template>
    <div class="overflow-auto min-h-[20em] sm:min-h-[26em]">
        <div v-if="!paginatedItems.length" class="m-auto">
            <p class="text-center m-5 mt-10 p-5 text-primary font-bold text-lg md:text-xl lg:text-2xl capitalize">
                there are no tasks that match your search...
            </p>
        </div>
        <table v-else class="w-full my-6 text-sm md:text-lg">
            <thead class="bg-green-300 capitalize">
                <th class="sm:py-4 sm:px-4 px-6 py-2 rounded-tl-2xl">
                    Index </th>
                <th class="sm:py-4 sm:px-4 px-6 py-2">title</th>
                <th class="sm:py-4 sm:px-4 px-6 py-2">decsription</th>
                <th class="sm:py-4 sm:px-4 px-6 py-2">status</th>
                <th class="sm:py-4 sm:px-4 px-6 py-2">
                    created at</th>
                <th class="sm:py-4 sm:px-4 px-6 py-2 rounded-tr-2xl">
                    details
                </th>
            </thead>

            <tbody class="text-center relative text-primary">
                <tr v-for="(item, index) in paginatedItems" :key="index" class="h-20 odd:bg-white even:bg-gray-100">
                    <td class="py-2 px-4">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                    <td class="py-2 px-4 capitalize">{{ item.title }}</td>
                    <td class="py-2 px-4">{{ item.description }}</td>
                    <td class="py-2 px-4 capitalize"
                        :class="{ 'text-green-600': item.status === 'done', 'text-red-400': item.status === 'pending' }">
                        {{ item.status }}
                    </td>
                    <td class="py-2 px-4">{{ item.created_at }}</td>
                    <td class="py-2 px-4 relative">
                        <div v-if="item.status === 'pending'">
                            <button @click="toggleShowInfo(index)" class="m-auto cursor-pointer">
                                <i class="fa-solid fa-list-ul cursor-pointer font-extralight text-lg sm:text-2xl"></i>
                            </button>
                            <div class="bg-white" v-if="showInfo === index">
                                <Options ref="optionsRef" :show="showInfo >= 0" :task="item" :lastRow="islastRow()" />
                            </div>
                        </div>
                        <div v-else>
                            <AppButton @click="router.push({ name: 'TaskDetails', params: { id: item.id } })"
                                class="m-auto cursor-pointer">
                                details
                            </AppButton>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Pagination :show="props.tasks.length > pageSize" :currentPage="currentPage" :totalPages="totalPages"
        :nextPage="nextPage" :prevPage="prevPage" />
</template>