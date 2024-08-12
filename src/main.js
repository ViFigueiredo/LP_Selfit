import './assets/css/main.css';
import 'vue-toastification/dist/index.css';

import { createApp } from 'vue';
import Toast from 'vue-toastification';

import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';

const options = { timeout: 2000 };
const app = createApp(App);

app.use(router);
app.use(Toast, options);
app.use(PrimeVue);
app.mount('#app');
