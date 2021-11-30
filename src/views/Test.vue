<template>
  <div class="grid place-items-center min-h-screen">
    <div>
      <Icon :first-stop="color" :second-stop="color" class="absolute"/>
      <ColorPicker
          class="relative top-20 right-20"
          theme="light"
          :color="color"
          :sucker-hide="false"
          :sucker-canvas="suckerCanvas"
          :sucker-area="suckerArea"
          @changeColor="changeColor"
          @openSucker="openSucker"
      />
    </div>
    </div>
</template>

<script>
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'
import Icon from "@/components/Icon";
export default {
  name: "Test",
  components: {
    Icon,
    ColorPicker
  },
  data() {
    return {
      color: '#59c7f9',
      suckerCanvas: null,
      suckerArea: [],
      isSucking: false,
      isHidden: true
    }
  },
  methods: {
    show () {
      this.isHidden = !this.isHidden
    },
    changeColor(color) {
      const { r, g, b, a } = color.rgba
      this.color = `rgba(${r}, ${g}, ${b}, ${a})`
    },
    openSucker(isOpen) {
      if (isOpen) {
        // ... canvas be created
        // this.suckerCanvas = canvas
        // this.suckerArea = [x1, y1, x2, y2]
      } else {
        // this.suckerCanvas && this.suckerCanvas.remove
      }
    },
  },
}
</script>

<style scoped>

</style>
