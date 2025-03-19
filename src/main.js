import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './stores/'
import router from './router/router'
import './assets/main.css';

import { handleSessionExpiry } from '@/composables/useToken';

const app = createApp(App);

// handleSessionExpiry(router);

app.use(router);
app.use(store);

app.mount('#app')
