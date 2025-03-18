<script setup>
defineProps({
    show: {
        type: Boolean,
        required: true
    }
});
</script>
<template>
    <teleport to='body'>
        <div v-show="show" class="fixed z-60 inset-0 bg-[#00000075] flex justify-center items-center font-light">
            <div class="w-10/12 sm:w-fit p-4 bg-white rounded-2xl text-primary">
                <slot />
            </div>
        </div>
    </teleport>
</template>
