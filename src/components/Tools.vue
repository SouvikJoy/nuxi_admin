<template>
  <div class="flex lg:space-x-10">
    <div class="hidden lg:w-1/2 lg:block">
      <SearchForm />
    </div>
    <div class="w-full lg:w-1/2">
      <div class="flex justify-between">
        <div class="lg:hidden">
          <router-link
            :to="{ name: 'Dashboard' }"
            class="
              flex
              justify-center
              items-center
              w-10
              h-10
              rounded-xl
            "
          >
            <Icon />
          </router-link>
        </div>

        <div class="h-10 hidden lg:flex items-center space-x-6 font-semibold">
          <a href="#" class="hover:text-blue-800">Feedback</a>
          <a href="#" class="hover:text-blue-800">Contacts</a>
          <a href="#" class="hover:text-blue-800">Help</a>
        </div>
        <div class="flex items-center space-x-4">
          <a
            href="#"
            class="
              flex
              items-center
              justify-center
              w-10
              h-10
              text-gray-300
              hover:text-gray-700
              relative
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-6"
            >
              <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
              />
            </svg>

            <div
              class="
                w-2
                h-2
                bg-red-500
                rounded-full
                absolute
                top-2
                right-2
                border border-white
              "
            ></div>
          </a>

          <div class="lg:relative">
            <button
              @click="isOpen = !isOpen"
              class="
                w-10
                h-10
                rounded-full
                overflow-hidden
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-blue-800
                focus:ring-offset-white
              "
            >
              <img
                src="https://tailwindcss.com/_next/static/media/sarah-dayan.a8ff3f1095a58085a82e3bb6aab12eb2.jpg"
                alt=""
                class="w-10 h-10 object-cover"
              />
            </button>

            <button
              v-if="isOpen"
              @click="isOpen = false"
              class="fixed inset-0 w-full h-full z-30 cursor-default"
              tabindex="-1"
            ></button>

            <transition
              enter-active-class="transition ease-out duration-100 transform"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75 transform"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="isOpen"
                class="absolute right-0 z-40 mt-2 w-full lg:w-48"
              >
                <div
                  class="
                    bg-white
                    mx-4
                    lg:mx-0
                    rounded-md
                    shadow-lg
                    py-1
                    ring-1 ring-black ring-opacity-5
                  "
                >
                  <div class="lg:hidden p-3">
                    <SearchForm />
                  </div>

                  <div class="lg:hidden border-b">
                    <a
                      href="#"
                      class="
                        block
                        px-4
                        py-2
                        text-sm text-gray-700
                        hover:bg-gray-100
                      "
                      >Feedback</a
                    >
                    <a
                      href="#"
                      class="
                        block
                        px-4
                        py-2
                        text-sm text-gray-700
                        hover:bg-gray-100
                      "
                      >Contacts</a
                    >
                    <a
                      href="#"
                      class="
                        block
                        px-4
                        py-2
                        text-sm text-gray-700
                        hover:bg-gray-100
                      "
                      >Help</a
                    >
                  </div>

                  <a
                    href="#"
                    class="
                      block
                      px-4
                      py-2
                      text-sm text-gray-700
                      hover:bg-gray-100
                    "
                    >Profile</a
                  >
                  <a
                    href="#"
                    class="
                      block
                      px-4
                      py-2
                      text-sm text-gray-700
                      hover:bg-gray-100
                    "
                    >Settings</a
                  >
                  <a
                    href="#"
                    @click.prevent="signOut"
                    class="
                      block
                      px-4
                      py-2
                      text-sm text-gray-700
                      hover:bg-gray-100
                    "
                    >Log out</a
                  >
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from "./SearchForm.vue";
import {useStore} from "vuex";
import {computed} from "vue";
import Icon from "@/components/Icon";
export default {
  components: {Icon, SearchForm },
  name: "Tools",
  setup() {
    const store = useStore();

    const userEmail = computed(() => store.state.user);

    const signOut = () => {
      store.dispatch("signOutAction");
    };
    return {
      signOut,
      userEmail,
    };
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>
