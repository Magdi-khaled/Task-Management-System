import { createStore } from 'vuex';
import auth from './auth';
import task from './task';

export default createStore({
    modules: {
        auth,
        task
    }
});
