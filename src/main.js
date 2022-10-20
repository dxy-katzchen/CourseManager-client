import { createApp } from "vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";

import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
const Pinia = createPinia();
Pinia.use(piniaPluginPersist);
app.use(Pinia);

app.mount("#app");
