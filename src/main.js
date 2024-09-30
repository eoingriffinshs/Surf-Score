import { createApp } from 'vue';
import App from '/App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './router/routes';
import './assets/main.css';
import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

let router = createRouter({
    history: createWebHistory(),
    routes: routes
});
const app = createApp(App);
app.use(router);
app.use(LoadingPlugin);
app.mount('#app');