<script setup>
import { defineProps, ref, watch } from 'vue';

const modelValue = defineModel();

const props = defineProps({
    label: String,
    name: String,
    placeholder: String,
    modelValue: [String, Number, Boolean],
    minLen: Number,
    maxLen: Number,
    type: {
        type: String,
        default: 'text',
        validator: (value) => ['text', 'number', 'email', 'password', 'select', 'textarea'].includes(value),
    },
    hide: Boolean,
    optional: Boolean,
    options: { type: Array, default: () => [] },
    optionsType: { type: String, default: 'Select an option' },
    validator: { type: Function, default: null },
});

const inputValue = ref(props.modelValue || '');
const errorMessage = ref('');

watch(inputValue, (newValue) => {
    modelValue.value = newValue;
    if (props.validator) {
        errorMessage.value = props.validator(newValue);
    }
});

watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue;
});
</script>

<template>
    <div class="mb-4 flex flex-col gap-1">
        <label v-if="props.label" :for="props.name"
            class="block text-xs sm:text-sm font-medium text-secondary capitalize">
            {{ props.label }} <span v-if="!props.optional" class="text-red-500">*</span>
        </label>

        <!-- Input Field All Types Except select & textarea -->
        <input v-if="props.type !== 'select' && props.type !== 'textarea'" :type="props.type" v-model="inputValue"
            :placeholder="props.placeholder" :id="props.name" :name="props.name" :disabled="props.hide"
            autocomplete="on" :class="{
                'bg-green-50 text-green-500 pointer-events-none': props.hide,
                'capitalize': props.hide && props.type !== 'email'
            }"
            class="mt-1 w-full px-2 py-2 sm:py-3 rounded-md outline-0 border border-green-300 text-black-100 text-xs sm:text-sm shadow-sm" />

        <!-- Select -->
        <select v-else-if="props.type === 'select'" v-model="inputValue" :name="props.name" :id="props.name"
            :disabled="props.hide" :class="{
                'bg-green-50 text-green-500 pointer-events-none': props.hide,
            }"
            class=" capitalize mt-1 w-full px-2 py-2 sm:py-3 rounded-md outline-0 border border-green-300 text-xs sm:text-sm text-black-100 shadow-xs">
            <option value="" disabled>{{ props.optionsType }}</option>
            <option v-for="option in props.options" :key="option" :value="option" class="capitalize">
                {{ option }}
            </option>
        </select>

        <!-- Textarea -->
        <textarea v-else v-model="inputValue" :name="props.name" :id="props.name" :disabled="props.hide"
            :placeholder="props.placeholder" :class="{
                'bg-green-50 text-green-500 pointer-events-none': props.hide,
            }" class="h-[4em] sm:h-[5em] capitalize mt-1 w-full px-2 py-2 sm:py-3 rounded-md outline-0 border 
            border-green-300 text-xs sm:text-sm text-black-100 shadow-xs" />

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-xs">
            {{ errorMessage }}
        </p>
    </div>
</template>
