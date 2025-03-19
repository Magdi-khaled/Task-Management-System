import { users } from "@/composables/useUsers";
import { setToken } from "@/composables/useToken";
import { isAuthenticated } from "@/composables/useAuth";
import axios from 'axios';

const authStore = {
    namespaced: true,
    state() {
        return {
            isAuthenticate: isAuthenticated(),
            user: localStorage.getItem('user')
        };
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setAuth(state, status) {
            state.isAuthenticate = status;
        }
    },
    actions: {
        async login({ commit }, { email, password }) {
            try {
                // Uncomment to enable API call needs (Endpoint)
                // const response = await axios.post(
                //     "http://127.0.0.1:8000/api/user/login", { email, password });
                // const existUser = response.data.data;

                const existUser = users.find(user => email === user.email && password === user.password);
                if (existUser) {
                    const token = email;
                    // 30 minutes - session time
                    setToken(existUser.token || token, 30, existUser);
                    commit('setAuth', isAuthenticated());
                    commit('setUser', { email, password });

                    console.log("Login Successfully");
                } else {
                    console.log("Email or Password Wrong...");
                }
            } catch (err) {
                console.error("Login Error", err);
            }
        },
        async signup({ commit }, { fname, lname, email, password }) {
            try {
                // Uncomment to enable API call needs (Endpoint)
                // const response = await axios.post(
                //     "http://127.0.0.1:8000/api/user/signup", { fname, lname, email, password });

                const createdUser = { fname, lname, email, password };
                users.push(createdUser);
                console.log('User Registered Successfully');
            } catch (err) {
                console.error("Signup Error", err);
            }
        },
        async logout({ commit }) {
            try {
                localStorage.clear();
                commit('setAuth', false);
                commit('setUser', null);
                console.log("Logout successful");
            } catch (err) {
                console.error("Logout Error", err);
            }
        },
        async fetchUser({ commit }) {
            try {
                const token = localStorage.getItem('authToken');
                // Uncomment to enable API call needs (Endpoint)
                // const response = await axios.get(
                //     "http://127.0.0.1:8000/api/user",
                //     {
                //         headers: { Authorization: `Bearer ${token}`, },
                //     }
                // );
                // const user = response.data.data;

                const user = localStorage.getItem('user');
                commit("setUser", user);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        },
    },
    getters: {
        isLoggedIn: (state) => state.isAuthenticate,
        getUser: (state) => state.user
    }
};

export default authStore;