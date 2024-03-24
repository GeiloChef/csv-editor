import './assets/main.css';
/* add all icon we need to the font-awesome library */
import '@/icons/fontAwesomeIconConfig';
import 'primevue/resources/themes/aura-light-green/theme.css';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

import { i18n } from '@/i18n/config';

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia());
app.use(i18n);
app.use(router);
app.use(PrimeVue);

app.mount('#app');
