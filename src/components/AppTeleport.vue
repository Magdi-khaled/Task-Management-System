<script setup>
defineProps({
    show: {
        type: Boolean,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    }
});
</script>
<template>
    <teleport to='body'>
        <div v-show="show" class="fixed top-4 left-4 p-3 sm:p-5 "
            :class="{ 'bg-green-400 text-white': state, 'bg-red-400 text-black-100': !state }">
            <p class="text-sm sm:text-md capitalize">
                <slot />
            </p>
        </div>
    </teleport>
</template>
