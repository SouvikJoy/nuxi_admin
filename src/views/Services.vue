<template>
  <div class="flex h-full">
    <div class="fixed lg:static bottom-0 w-full lg:w-24 lg:h-full z-10">
      <div class="w-full lg:fixed lg:w-24 h-full bg-blue-800 relative">
        <a
            href="#"
            class="
            hidden
            absolute
            top-10
            left-1/2
            transform
            -translate-x-1/2
            lg:flex lg:justify-center lg:items-center
            w-14
            h-14
            rounded-xl
            hover:bg-white hover:bg-opacity-50
          "
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-8 w-8 text-white"
          >
            <path
                d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
            />
          </svg>
        </a>

        <MainNav />
      </div>
    </div>

    <div class="w-full p-4 lg:p-10">
      <Tools />


      <div class="mt-4 lg:hidden">
        <button
            class="
            flex
            w-32
            h-10
            bg-white
            rounded-lg
            mx-auto
            shadow-lg
            relative
            focus:outline-none
          "
            @click="showSidebar = !showSidebar"
        >
          <div
              class="
              w-16
              h-full
              bg-blue-400
              absolute
              top-0
              rounded-lg
              transform
              duration-300
            "
              :class="showSidebar ? 'translate-x-full' : ''"
          >

          </div>

          <div
              class="
              flex
              justify-center
              items-center
              w-16
              h-full
              transform
              duration-300
            "
              :class="showSidebar ? 'text-gray-400' : 'text-white'"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-6"
            >
              <path
                  d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
              />
            </svg>
          </div>
          <div
              class="
              flex
              justify-center
              items-center
              w-16
              h-full
              transform
              duration-300
            "
              :class="!showSidebar ? 'text-gray-400' : 'text-white'"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-6"
            >
              <path
                  fill-rule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clip-rule="evenodd"
              />
            </svg>
          </div>
        </button>
      </div>

      <div class="overflow-hidden lg:overflow-visible pb-24 lg:pb-0">
        <div
            class="transform lg:transform-none transition-all duration-300"
            :class="showSidebar ? '-translate-x-full' : ''"
        >
          <div class="flex mt-4 lg:mt-10 lg:space-x-10">
            <div
                class="w-full flex-shrink-0 lg:w-3/4 lg:flex-shrink rounded-xl"
            >
              <ServiceList />
            </div>
            <div class="w-full flex-shrink-0 lg:w-1/4 lg:flex-shrink">
              <div class="bg-indigo-50 rounded-xl p-5 space-y-10 flex flex-col">
                <AddServices />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { useStore } from "vuex";
import { computed } from "vue";
import MainNav from "@/components/MainNav.vue";
import Tools from "@/components/Tools.vue";
import AddServices from "@/components/AddService";
import ServiceList from "@/components/ServiceList";

export default {
  name: "Services",
  components: {
    ServiceList,
    AddServices,
    MainNav,
    Tools
  },
  data:() => ({
    showSidebar: false,
  }),
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
};
</script>
