<script setup>
import AppTeleport from '../AppTeleport.vue';
import AppButton from '../AppButton.vue';
import AppModal from '../AppModal.vue';
import { ref } from 'vue';

const props = defineProps({
    task: {
        type: Object,
        required: true
    },
    show: {
        type: Boolean,
        required: true
    },
    lastRow: {
        type: Boolean,
        required: true
    }
});

const success = ref(false);

const isModalActive = ref(false);
const isDeletedModalActive = ref(false);


const deleteTask = async () => {
    try {
        // await taskStore.deletetask(id);
        success.value = true;
        setTimeout(() => { success.value = false }, 2000);
        isDeletedModalActive.value = false;
    }
    catch (err) {
        console.error('Delete Task Error', err);
    }
};
</script>

<template>

    <AppTeleport :show="success" :state="true">
        <i class="fa-solid fa-check-double"></i> task deleted Successfully
    </AppTeleport>
    <div v-show="props.show" class="absolute right-[60%] z-50 border border-primary rounded-xl text-green-400 bg-white"
        :class="{ 'top-[50%]': !props.lastRow, 'top-[-90%]': props.lastRow }">
        <ul>
            <li class="rounded-t-xl hover:bg-green-100 hover:text-green-400 cursor-pointer duration-150 ">
                <!-- <router-link :to="{ name: 'TaskDetails', params: { id: props.task.id } }" -->
                <router-link :to="{ name: 'TaskDetails', params: { id: props.task.id } }"
                    class="block w-full h-full py-2 px-5">details
                </router-link>
            </li>
            <li class="py-2 px-5 hover:bg-green-100 hover:text-green-400 duration-150">
                <!-- <router-link :to="{ name: 'EditTask', params: { id: props.task.id } }" -->
                <button @click="isModalActive = !isModalActive" class="cursor-pointer capitalize">
                    edit
                </button>
            </li>
            <li class="py-2 px-5 rounded-b-xl hover:bg-green-100 hover:text-green-400 cursor-pointer duration-150"
                @click="isDeletedModalActive = true">
                delete
            </li>
        </ul>

        <AppModal :show="isModalActive">
            Edit Task
        </AppModal>

        <AppModal :show="isDeletedModalActive">
            <div class="flex flex-col capitalize">
                <h1 class=" text-xl">
                    Are you sure you want to delete this task?
                </h1>
                <h4 class="underline"> taskinfo </h4>
                <p class="capitalize">title: {{ props.task.title }}</p>
                <p class="capitalize">status: <span
                        :class="{ 'text-red-400': !props.task.status, 'text-green-300': props.task.status }"> {{
                            props.task.status ?
                                'Done' :
                                'Pending'
                        }}</span></p>
                <div class="flex items-center justify-end gap-4 mt-8">
                    <AppButton class="w-4/12" @click="deleteTask(props.task.id)">
                        confirm
                    </AppButton>
                    <AppButton class="w-4/12" @click="isDeletedModalActive = false">
                        cancel
                    </AppButton>
                </div>
            </div>
        </AppModal>
    </div>
</template>