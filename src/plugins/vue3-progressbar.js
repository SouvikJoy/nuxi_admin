import VueProgressBar from "@aacassandra/vue3-progressbar";

export default {
  install: (app) => {
    app.use(VueProgressBar, {
      color: "#0072fb",
      failedColor: "#c60b0b",
      thickness: "10px",
      transition: {
        speed: "0.2s",
        opacity: "0.6s",
        termination: 300,
      },
      autoRevert: true,
      location: "left",
      inverse: false,
    });
  },
};
