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

      <ErrorMessage class="text-xs text-red-600 font-bold" name="name" />

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

      <ErrorMessage class="text-xs text-red-600 font-bold" name="description" />

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
      } catch (e) {
        alert(e.message);
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
