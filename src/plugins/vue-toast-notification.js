import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export default {
  install: (app) => {
    app.use(VueToast, {
      duration: 5000,
      position: "top-right",
    });
  },
};
