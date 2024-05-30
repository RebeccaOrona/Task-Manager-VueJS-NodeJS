import { createApp } from "vue";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();
const i18n = createI18n({
  locale: "es", // default locale
  messages: {
    es: {
      itemsPerPage: "Elementos por página:",
    },
  },
});

createApp(App).use(i18n).use(vuetify).use(router).mount("#app");
