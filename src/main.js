import './assets/css/main.css';
import 'primeicons/primeicons.css';
import 'vue-toastification/dist/index.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Toast from 'vue-toastification';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import DatePicker from 'primevue/datepicker';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const app = createApp(App);
const toastOptions = { timeout: 2000 };
const primeOptions = {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
};

app.use(router);
app.use(Toast, toastOptions);
app.use(PrimeVue, primeOptions);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('DatePicker', DatePicker);
app.component('InputText', InputText);
app.component('Button', Button);
app.mount('#app');
