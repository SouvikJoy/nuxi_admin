import "./vee-validate";
import VueProgressBar from "./vue3-progressbar";
import VueToast from "./vue-toast-notification";
import VueSvgInlinePlugin from "./vue-svg-inline";

export default {
  install: (app) => {
    app.use(VueProgressBar);
    app.use(VueToast);
    app.use(VueSvgInlinePlugin);
  },
};
