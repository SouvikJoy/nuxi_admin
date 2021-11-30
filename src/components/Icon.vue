<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="50px" viewBox="0 0 433.4 359.11">
    <defs>
      <linearGradient id="linear-gradient" y1="179.55" x2="433.4" y2="179.55" gradientUnits="userSpaceOnUse">
        <stop offset="0" :stop-color="firstStop"/>
        <stop offset="1" :stop-color="secondStop"/>
      </linearGradient>
    </defs>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <path class="cls-1" d="M431.7,23.18Q372.6,216,313.49,359.11l-137.73-32Q157.67,249.2,139.59,182.3l27.57-6c13.56-3.06,25.06,2.9,25.69,13.35q3.75,50.58,7.5,102.6L234,295.66q4.69-66.87,9.38-135.88l27.58-6c13.56-3.06,22.52,5.54,20,19Q279.26,238.17,267.59,299l33.63,3.38Q331.81,199.36,362.4,77.69L71,168.07q42.45,68.51,84.89,172.83c3.81,9.75,2.54,16.09-2.85,13.84L141.7,350.2q-70-121.33-140-173c-5.66-3.9,3.29-12.2,20-19l390-156C428.4-4.62,437.36,5,431.7,23.18Z"/>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: "Icon",
  props: {
    firstStop: {
      type: String,
      default: '#0062ff'
    },
    secondStop: {
      type: String,
      default: '#00e6e9'
    }
  },
  data: () => ({

  })
}
</script>

<style scoped>
.cls-1 {
  fill: url(#linear-gradient);
}
</style>
