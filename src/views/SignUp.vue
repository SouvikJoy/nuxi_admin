 <template>
  <div>
    <h1>SignUp Page</h1>
    <form @submit.prevent="signUp">
      <input
        class="inputField"
        type="email"
        placeholder="Your email"
        v-model="form.email"
      />
      <input
        class="inputField"
        type="password"
        placeholder="Your Password"
        v-model="form.password"
      />
      <button type="submit">Sign Up</button>
    </form>
    <p>Already have an account? <router-link to="/sign-in">Sign In</router-link></p>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const form = reactive({
      email: "",
      password: "",
    });
    const store = useStore();

    const signUp = () => {
      store.dispatch("signUpAction", form);
    };

    return {
      form,
      signUp,
    };
  },
};
</script>

<style>
</style>