<template>
  <div class="mx-6">
    <div class="title">Create New Service</div>
    <Form ref="formRef" v-slot="{ errors }" @submit="saveServiceToDatabase">
      <Field
        v-model="formData.name"
        placeholder="Service Name"
        :class="fieldClasses(!!errors.name)"
        class="input-class"
        name="name"
        rules="required"
      />

      <ErrorMessage class="text-xs text-red-600 font-bold tracking-wider" name="name" />

      <Field
        as="textarea"
        name="description"
        v-model="formData.description"
        :class="fieldClasses(!!errors.description)"
        label="Service Description"
        rows="6"
        type="text"
        class="input-class my-2"
        rules="required|max:180"
      />

      <ErrorMessage class="text-xs text-red-600 font-bold tracking-wider" name="description" />

      <button class="button-class">Create</button>
    </Form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import dataService from "@/dataService";
import { Field, Form, ErrorMessage } from "vee-validate";
import { initRule } from "@/utils";
import {createToast} from "mosha-vue-toastify";

export default {
  name: "AddService",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    initRule(["min", "max", "required"]);

    const router = useRouter();
    const { saveServices } = dataService();

    const formData = ref({
      name: "",
      description: "",
    });

    const saveServiceToDatabase = async () => {
      try {
        await saveServices({
          ...formData.value
        });

        createToast('Service Created',
            {
              showIcon: 'true',
              transition: 'bounce',
              type: 'success',
            })
        await router.go();
      } catch (e) {
        createToast('Error',
            {
              showIcon: 'true',
              transition: 'bounce',
              type: 'danger',
            })
      }
      await router.go();
    };

    return {
      saveServiceToDatabase,
      formData,
    };
  },
  methods: {
    fieldClasses(hasError) {
      const cls = "text-red-600 focus:ring-2 focus:ring-red-600";

      return !hasError ? cls : `${cls} is-error`;
    },
  },
};
</script>

<style></style>
