import './assets/main.css';
/* add all icon we need to the font-awesome library */
import '@/icons/fontAwesomeIconConfig';
import 'primevue/resources/themes/aura-dark-amber/theme.css';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createPinia } from 'pinia';
import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';


import App from './App.vue';
import router from './router';

import { i18n } from '@/i18n/config';

const app = createApp(App);

// eslint-disable-next-line vue/no-reserved-component-names,vue/multi-word-component-names
app.component('Button', Button);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia());
app.use(i18n);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.mount('#app');
