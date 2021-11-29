<template>
  <img :src="imageUrl" alt="" />
</template>

<script>
import SUPABASE_CLIENT from "../config";
import missingImage from "@/assets/no_image_available.jpeg";

import { ref } from "@vue/runtime-core";
export default {
  name: "ImageView",
  props: {
    image: String,
  },
  setup(props) {
    const imageUrl = ref(null);

    const downloadImage = async (path) => {
      if (!path) {
        imageUrl.value = missingImage;
        return;
      }

      const { data, error } = await SUPABASE_CLIENT.storage
        .from("product-bucket")
        .download(path);
      if (error) throw error;
      imageUrl.value = URL.createObjectURL(data);
    };

    downloadImage(props?.image);

    return {
      imageUrl,
    };
  },
};
</script>

<style scoped></style>
