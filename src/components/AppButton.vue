<script setup>
const disabled = defineModel('disabled', { default: false });

</script>

<template>
    <button :class="{ disabled: disabled }" class="cursor-pointer py-3 px-[6px] text-sm sm:text-md bg-green-300 text-black-100 whitespace-nowrap 
            font-medium capitalize rounded-md border-[1px] border-green-500 hover:bg-green-200 hover:text-green-500 transform hover:translate-x-[-4px] 
            hover:translate-y-[-4px] hover:shadow-md hover:shadow-black transition duration-200 ease-in-out">
        <slot />
    </button>
</template>

<style scoped>
.disabled {
    border: 1px solid rgb(166, 165, 165);
    background-color: var(--colors-green-50);
    color: gray;
    opacity: 0.7;
    pointer-events: none;
}
</style>