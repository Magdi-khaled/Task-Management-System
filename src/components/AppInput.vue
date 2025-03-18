<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import type { PropType } from 'vue';

const modelValue = defineModel<string | number>('modelValue');

const props = defineProps({
    label: String,
    name: String,
    placeholder: String,
    modelValue: [String, Number] as PropType<string | number>,
    minLen: Number as PropType<number | undefined>,
    maxLen: Number as PropType<number | undefined>,
    type: {
        type: String as PropType<'text' | 'number' | 'email' | 'password' | 'select'>,
        default: 'text',
    },
    hide: Boolean,
    optional: Boolean,
    // Select variables
    options: { type: Array as PropType<string[]>, default: () => [] },
    optionsType: String as PropType<string | undefined>,
    // Validation rules
    validator: { type: Function as PropType<(value: string | number | string[]) => string | null>, default: () => null },
});

const inputValue = ref<string | number>(props.modelValue || '');

const errorMessage = ref<string | null>("");

watch(inputValue, (newValue) => {
    modelValue.value = newValue;
    if (props.validator) {
        errorMessage.value = props.validator(newValue);
    }
});

</script>

<template>
    <div class="mb-4 flex flex-col gap-1">
        <label v-if="props.label" :for="props.name" class="block text-sm font-medium text-secondary capitalize">
            {{ props.label }} <span v-if="!props.optional" class="text-red-500">*</span>
        </label>

        <!-- Input Field -->
        <input v-if="props.type !== 'select'" :type="props.type" v-model="inputValue" :placeholder="props.placeholder"
            :id="props.name" :name="props.name" :disabled="props.hide" autocomplete="on" :class="[{
                'bg-gray-200 border-gray-400 cursor-not-allowed': props.hide, 'bg-white border-primary': !props.hide,
                'capitalize': props.hide && props.type !== 'email'
            }]" class="mt-1 w-full px-2 py-2 sm:py-3 rounded-md outline-0 border text-sm shadow-sm" />

        <!-- Select -->
        <select v-else v-model="inputValue" :name="name" :id="name"
            class="capitalize mt-1 w-full px-2 py-2 sm:py-3 rounded-md outline-0 border border-primary bg-white text-sm text-gray-700 shadow-xs">
            <option value="" selected disabled>{{ optionsType }}</option>
            <option v-for="option in options" :key="option" :value="option" class="capitalize">
                {{ option }}
            </option>
        </select>

        <!-- Validation Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-xs">
            {{ errorMessage }}
        </p>
    </div>
</template>
