import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import lazyPlugin from 'vue3-lazy';
import 'element-plus/dist/index.css';
import 'normalize.css';
import '@/assets/iconfont/iconfont.css';
import App from './App.vue';
import router from './router';
import 'swiper/scss';
import { register } from 'swiper/element/bundle';

register();
const app = createApp(App);
const pinia = createPinia();
pinia.use(createPersistedState());
app.use(ElementPlus);
app.use(router);
app.use(pinia);
app.use(lazyPlugin, {
    loading: '/loading.gif',
    error: '/error.jpeg'
})
app.mount('#app');
