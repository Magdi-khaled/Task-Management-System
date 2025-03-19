import { tasks } from "@/composables/useTasks";
import { formatDate } from "@/composables/useFormatter";
import { reactive } from "vue";
import axios from "axios";

const taskStore = {
    namespaced: true,
    state: () => ({
        taskList: reactive([...tasks]),
    }),
    mutations: {
        setTasks(state, tasks) {
            state.taskList = tasks;
        },
        addTask(state, task) {
            state.taskList.push(task);
        },
        updateTask(state, updatedTask) {
            const index = state.taskList.findIndex((t) => t.id === updatedTask.id);
            if (index !== -1) state.taskList[index] = updatedTask;
        },
        removeTask(state, id) {
            const index = state.taskList.findIndex((t) => t.id === id);
            if (index !== -1) state.taskList.splice(index, 1);
        }
    },
    actions: {
        async fetchTasks({ commit, state }) {
            try {
                const token = localStorage.getItem("authToken");
                // Uncomment to enable API call needs (Endpoint)
                // const response = await axios.get(
                //   `http://127.0.0.1:8000/api/tasks`,
                //   { headers: { Authorization: `Bearer ${token}` } }
                // );
                // const tasks = response.data.data;
                commit("setTasks", state.taskList); // Using imported tasks as a placeholder
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        },
        async createTask({ commit, state }, { title, status, description }) {
            try {
                // Uncomment to enable API call needs (Endpoint)
                // const token = localStorage.getItem("authToken");
                // await axios.post(
                //   `http://127.0.0.1:8000/api/createTask`,
                //   { title, status, description },
                //   { headers: { Authorization: `Bearer ${token}` } }
                // );

                const created_at = formatDate(Date.now());
                const createdTask = {
                    id: state.taskList.length + 1,
                    title,
                    status,
                    description,
                    created_at,
                };
                commit("addTask", createdTask);
            } catch (error) {
                console.error("Error Creating Task:", error);
            }
        },
        async editTask({ commit }, { id, title, status, description, created_at }) {
            try {
                // Uncomment to enable API call needs (Endpoint)
                // const token = localStorage.getItem("authToken");
                // await axios.post(
                //   `http://127.0.0.1:8000/api/editTask/${id}`,
                //   { title, status, description },
                //   { headers: { Authorization: `Bearer ${token}` } }
                // );

                const updatedTask = { id, title, status, description, created_at };
                commit("updateTask", updatedTask);
                console.log("Task Edited Successfully");
            } catch (error) {
                console.error("Error Editing Task:", error);
            }
        },
        async deleteTask({ commit }, id) {
            try {
                // Uncomment to enable API call needs (Endpoint)
                // const token = localStorage.getItem("authToken");
                // await axios.delete(
                //   `http://127.0.0.1:8000/api/deleteTask/${id}`,
                //   { headers: { Authorization: `Bearer ${token}` } }
                // );

                commit("removeTask", id);
                console.log("Task Deleted Successfully");
            } catch (error) {
                console.error("Error Deleting Task:", error);
            }
        },
    },
    getters: {
        getTasks: (state) => state.taskList,
    },
};

export default taskStore;
