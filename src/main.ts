import './assets/css/output.css';

import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import VuePapaParse from 'vue-papa-parse';

const app = createApp(App);
app.mount('#app');
app.use(PrimeVue);
app.use(VuePapaParse);
