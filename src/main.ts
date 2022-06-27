import "ress";
import axios from "axios";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import config from "./config";
import { Cloudinary } from "@cloudinary/url-gen";
import Vue3TouchEvents from "vue3-touch-events";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.provide("$config", config); // TODO キーを InjectionKey に置き換える
app.provide(
  "$api",
  axios.create({
    // baseURL: App.baseURL,
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
      Accept: "application/json",
    },
  })
);
app.provide("$cloudinary", new Cloudinary(config.cloudinary.options));
app.use(Vue3TouchEvents);

app.mount("#app");
