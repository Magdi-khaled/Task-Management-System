<script setup lang="ts">
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
import AppInput from '../components/AppInput.vue';
import AppTeleport from '../components/AppTeleport.vue';
import AppButton from '../components/AppButton.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { validateTitle, validateDescription } from '@/composables/useValidation';

// data 
const router = useRouter();
const store = useStore();
const failed = ref(false);
const success = ref(false);
const spinnerOn = ref(false);
const title = ref("");
const description = ref("");
const status = ref("pending");

const createTask = async () => {
    try {
        if (title.value && description.value) {
            await store.dispatch("task/createTask", {
                title: title.value,
                status: status.value,
                description: description.value
            });
            spinnerOn.value = true
            setTimeout(() => { success.value = true; spinnerOn.value = false; }, 2000);
            setTimeout(() => {
                success.value = false;
                router.push({ name: 'Tasks' });
            }, 2000);
        }
        else {
            failed.value = true;
            setTimeout(() => { failed.value = false }, 2000);
        }
    }
    catch (err) {
        console.error('Add Task Error', err);
    }
}
</script>

<template>
    <AppNavbar />
    <AppTeleport :show="success" :state="true">
        <i class="fa-solid fa-check-double"></i> Task Added Successfully
    </AppTeleport>
    <AppTeleport :show="failed" :state="false">
        <i class="fa-solid fa-circle-exclamation"></i> All Fields Required
    </AppTeleport>

    <div class="px-4 sm:px-8 mt-4 flex justify-end">
        <AppButton @click="router.push({ name: 'Tasks' })" class="w-3/12 sm:w-2/12 flex justify-center items-center gap-4
                            hover:gap-6 transition-all duration-300">
            back to task list <i class="fa-solid fa-angles-right"></i>
        </AppButton>

    </div>
    <main class="px-4 sm:px-8 flex flex-col items-center gap-4 mt-8 min-h-[31em]">
        <h1 class="mt-4 text-2xl font-bold sm:text-3xl md:text-3xl capitalize text-green-400">
            <i class="fa-solid fa-list-check"></i> add task form
        </h1>

        <form @submit.prevent="createTask" class="w-full sm:w-8/12 p-3 sm:p-6 border border-green-300 rounded-2xl">
            <AppInput label="task title" name="title" type="text" placeholder="Enter task title"
                v-model:modelValue="title" :validator="validateTitle" />

            <AppInput label="task description" name="description" type="textarea" placeholder="Enter task description"
                v-model:modelValue="description" :validator="validateDescription" />


            <div class="flex justify-end mt-8">
                <AppButton class="w-4/12 sm:w-3/12" v-model:disabled="spinnerOn">
                    <p v-if="!spinnerOn">add task</p>
                    <p v-else class="spinner m-auto" />

                </AppButton>
            </div>
        </form>
    </main>
    <AppFooter />
</template>
