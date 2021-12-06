<template>
  <div v-if="isLoggedIn">
    <router-view />
  </div>

  <div v-if="!isLoggedIn">
    <SignIn />
  </div>
</template>

<style>
</style>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import SignIn from "@/views/SignIn";

const store = useStore();
const isLoggedIn = computed(() => store.state.loggedIn);
</script>
