import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './stores/'
import router from './router/router'
import './assets/main.css';


const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app')
