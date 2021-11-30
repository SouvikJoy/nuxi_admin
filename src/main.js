import { createApp as createVueApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'


import plugins from "./plugins";

import "./assets/css/tailwind.css";

// eslint-disable-next-line no-unused-vars
const createApp = (ssr = false) => {
    const app = createVueApp(App);

    app.use(router);
    app.use(store);
    app.use(plugins);
    app.use(moshaToast);

    return {
        app,
    };
};

const { app } = createApp(false);

router.isReady().then(() => app.mount("#app"));
