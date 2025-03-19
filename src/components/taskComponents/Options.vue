<script setup>
import AppTeleport from '../AppTeleport.vue';
import AppButton from '../AppButton.vue';
import AppInput from '../AppInput.vue';
import AppModal from '../AppModal.vue';
import { ref, toRefs, computed } from 'vue';
import { useStore } from 'vuex';
import { validateTitle, validateDescription } from '@/composables/useValidation';

const props = defineProps({
    task: { type: Object, required: true },
    show: { type: Boolean, required: true },
    lastRow: { type: Boolean, required: true }
});

const success1 = ref(false);
const success2 = ref(false);
const failed = ref(false);
const store = useStore();
const spinnerOn = ref(false);
const isModalActive = ref(false);
const isDeleteModalActive = ref(false);
const taskRefs = computed(() => props.task || {});
const { id, title, status, description, created_at } = toRefs({ ...taskRefs.value });

const editTask = async () => {
    try {
        if (title.value && description.value) {
            spinnerOn.value = true;
            await store.dispatch("task/editTask", {
                id: id.value, title: title.value, status: status.value,
                description: description.value, created_at: created_at.value
            });

            setTimeout(() => { success1.value = true; spinnerOn.value = false; isModalActive.value = false; }, 2000);
            setTimeout(() => { success1.value = false }, 4000);
        }
        else {
            failed.value = true;
            setTimeout(() => { failed.value = false }, 2000);
        }
    }
    catch (err) {
        console.error('Update Task Error', err);
    }
};
const deleteTask = async (id) => {
    try {
        await store.dispatch("task/deleteTask", id);
        spinnerOn.value = true
        setTimeout(() => { success2.value = true; spinnerOn.value = false; isDeleteModalActive.value = false; }, 2000);
        setTimeout(() => { success2.value = false }, 4000);
    }
    catch (err) {
        console.error('Delete Task Error', err);
    }
};
</script>

<template>
    <AppTeleport :show="success1" :state="true">
        <i class="fa-solid fa-check-double"></i> task information updated successfully
    </AppTeleport>
    <AppTeleport :show="faild" :state="false">
        <i class="fa-solid fa-check-double"></i> some fields filled wrong
    </AppTeleport>
    <AppTeleport :show="success2" :state="true">
        <i class="fa-solid fa-check-double"></i> task deleted Successfully
    </AppTeleport>

    <div v-show="props.show"
        class="absolute right-[60%] z-50 border border-primary rounded-xl shadow-xl text-green-400 bg-white"
        :class="{ 'top-[50%]': !props.lastRow, 'top-[-90%]': props.lastRow }">
        <ul>
            <li class="rounded-t-xl hover:bg-green-100 hover:text-green-400 cursor-pointer duration-150 ">
                <router-link :to="{ name: 'TaskDetails', params: { id: id } }"
                    class="block w-full h-full py-2 px-5">details
                </router-link>
            </li>
            <li class="hover:bg-green-100 hover:text-green-400 duration-150">
                <button @click="isModalActive = !isModalActive" class="py-2 px-5 cursor-pointer capitalize">
                    edit
                </button>
            </li>
            <li class="py-2 px-5 rounded-b-xl hover:bg-green-100 hover:text-green-400 cursor-pointer duration-150"
                @click="isDeleteModalActive = true">
                delete
            </li>
        </ul>


        <!-- update modal -->
        <AppModal :modalActive="isModalActive">
            <div class="p-4">
                <h1 class="text-xl sm:text-2xl font-bold capitalize border-b-2 border-b-green-400 ">edit task form</h1>
                <form @submit.prevent="" class="grid grid-cols-6 gap-4 mt-4">
                    <AppInput label="title" name="title" type="text" placeholder="Task Title..." v-model="title"
                        class="col-span-3" :validator="validateTitle" />

                    <AppInput label="status" name="status" type="select" optionsType="Choose status..."
                        :options="['done', 'pending']" v-model="status" class="col-span-3" />

                    <AppInput label="description" name="description" type="textarea" placeholder="Task Description..."
                        v-model="description" class="col-span-6" :validator="validateDescription" />

                    <div class="col-span-6 w-full flex items-center justify-end gap-4 mt-4">
                        <AppButton class="w-3/12" @click="editTask(id)" v-model:disabled="spinnerOn">
                            <p v-if="!spinnerOn">update</p>
                            <p v-else class="spinner m-auto" />
                        </AppButton>
                        <AppButton class="w-3/12" @click="isModalActive = false">
                            cancel
                        </AppButton>
                    </div>
                </form>
            </div>
        </AppModal>

        <!-- delete modal -->
        <AppModal :modalActive="isDeleteModalActive">
            <div class="flex flex-col capitalize">
                <h1 class=" text-xl">
                    Are you sure you want to delete this task?
                </h1>
                <h4 class="underline"> taskinfo </h4>
                <p class="capitalize">title: {{ title }}</p>
                <p class="capitalize">status: <span
                        :class="{ 'text-red-400': status === 'pending', 'text-green-300': status === 'done' }">
                        {{ status }}</span></p>
                <div class="flex items-center justify-end gap-4 mt-8">
                    <AppButton class="w-4/12" @click="deleteTask(id)" v-model:disabled="spinnerOn">
                        <p v-if="!spinnerOn">confirm</p>
                        <p v-else class="spinner m-auto" />
                    </AppButton>
                    <AppButton class="w-4/12" @click="isDeleteModalActive = false">
                        cancel
                    </AppButton>
                </div>
            </div>
        </AppModal>
    </div>
</template>