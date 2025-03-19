<script setup>
defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    },
    nextPage: {
        type: Function,
        required: true
    },
    prevPage: {
        type: Function,
        required: true
    },
    show: {
        type: Boolean,
        required: true
    },
});
</script>

<template>
    <div class="flex justify-center items-center my-4" v-show="show">
        <button @click="prevPage" :disabled="currentPage === 1"
            class="text-green-100 cursor-pointer border-[1px] 
            py-[0.325rem] sm:py-[0.625rem] px-3 sm:px-4 rounded-full transition-all duration-200 transition-[cubic-bezier(0.23, 1, 0.32, 1)] hover:text-green-400 hover:bg-green-200"
            :class="{ 'pointer-events-none bg-green-50': currentPage === 1, 'bg-green-400': currentPage !== 1 }">
            <i class="fa-solid fa-chevron-left text-sm sm:text-lg"></i>
        </button>
        <span class="text-primary mx-4 sm:text-xl">{{ currentPage }} to {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages"
            class="text-green-100 cursor-pointer border-[1px] 
            py-[0.325rem] sm:py-[0.625rem] px-3 sm:px-4 rounded-full transition-all duration-200 transition-[cubic-bezier(0.23, 1, 0.32, 1)] hover:text-green-400 hover:bg-green-200"
            :class="{ 'pointer-events-none bg-green-50': currentPage === totalPages, 'bg-green-400': currentPage !== totalPages }">
            <i class="fa-solid fa-chevron-right text-sm sm:text-lg"></i>
        </button>
    </div>
</template>