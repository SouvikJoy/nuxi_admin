import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import router from '../router';
import { supabase } from "@/supabase";

import { createToast } from 'mosha-vue-toastify';


export default createStore({
  state: {
    user: [],
    loggedIn: false,
    colors: {
        color: '#ffffff',
        colos: '#ffffff',
    },
  },
  mutations: {
      SET_USER(state, payload) {
          state.user = payload;
          state.loggedIn = true;
      },
      RESET_USER(state) {
          state.user = [];
          state.loggedIn = false;
      },
  },
  actions: {
    async signInAction({ commit }, form) {
        try {
            const { user, error } = await supabase.auth.signIn({
                email: form.email,
                password: form.password,
            });
            if (!error || user) {
                await router.push("/");
                commit("SET_USER", user);
                createToast("Login Successfully Done", {
                    hideProgressBar: "true",
                    showIcon: "true",
                    position: "top-right",
                    transition: "slide",
                    type: "success",
                });
            }
            if (error) {
                createToast(error.message, {
                    hideProgressBar: "true",
                    showIcon: "true",
                    position: "top-right",
                    transition: "slide",
                    type: "danger",
                });
                console.log(error);
            }
            console.log("user", user);
        } catch (err) {
            console.log(err);
        }
    },

    async signUpAction({dispatch}, form) {
      try {
        const { error} = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        alert("You've been registered successfully");
        await dispatch("signInAction", form)
      } catch (error) {
        alert(error.error_description || error.message);
      }
    },

    async signOutAction({ commit }) {
        const { user, error } = await supabase.auth.signOut();
        commit("RESET_USER", user);
        await router.push("/");
        createToast("Logout Successfully Done", {
            hideProgressBar: "true",
            showIcon: "true",
            position: "top-right",
            transition: "slide",
            type: "success",
        });
        if (error) {
            createToast(error.message, {
                hideProgressBar: "true",
                showIcon: "true",
                position: "top-right",
                transition: "slide",
                type: "success",
            });
            console.log(error);
        }
    },
  },
  modules: {
  },

  plugins: [createPersistedState()],

})
