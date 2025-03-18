import { createStore } from "vuex";
import auth from "./auth/index";

const store = createStore({
    modules: {
        auth
    }
});

export default store;
