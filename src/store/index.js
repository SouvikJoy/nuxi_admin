import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import router from '../router';
import { supabase } from "@/supabase";

import { createToast } from 'mosha-vue-toastify';
// import the styling for the toast
import 'mosha-vue-toastify/dist/style.css'


export default createStore({
  state: {
    user: null,
    colors: {
        color: '#ffffff',
        colos: '#ffffff',
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async signInAction({ commit }, form) {
      try {
        const { error, user } = await supabase.auth.signIn({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        await router.push('/')
        createToast('You have Signed In successfully',
        {
          showIcon: 'true',
              transition: 'bounce',
            type: 'success',
        })
        commit('setUser', user.email)
      } catch (error) {
        createToast('Invalid Credentials',
            {
              showIcon: 'true',
              transition: 'bounce',
              type: 'danger',
            })
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
      try {
        const { error } = await supabase.auth.signOut();

        createToast('You have Signed Out successfully',
            {
              showIcon: 'true',
              transition: 'bounce',
              type: 'danger',
            })
        if (error) throw error;
        commit('setUser', null)
        await router.push("/sign-in");
      } catch (error) {
        createToast('Error',
            {
              showIcon: 'true',
              transition: 'bounce',
              type: 'danger',
            })
      }
    },
  },
  modules: {
  },

  plugins: [createPersistedState()],

})
