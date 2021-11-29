<template>
  <div class="mx-6">
    <div class="title">Create New Category</div>
    <Form ref="formRef" v-slot="{ errors }" @submit="saveCategoryToDatabase">
      <Field
        v-model="formData.name"
        placeholder="Category Name"
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
        label="Category Description"
        rows="6"
        type="text"
        class="input-class my-2"
        rules="required|max:180"
      />

      <ErrorMessage class="text-xs text-red-600 font-bold tracking-wider" name="description" />

      <div class="my-8">
        <label class="block text-sm font-medium text-gray-700">
          Category Image
        </label>
        <div
          class="
            mt-1
            flex
            justify-center
            px-6
            pt-5
            pb-6
            border-2 border-gray-300 border-dashed
            rounded-md
          "
        >
          <div class="space-y-1 text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="flex text-sm text-gray-600">
              <label
                for="file-upload"
                class="
                  relative
                  cursor-pointer
                  bg-white
                  rounded-md
                  font-medium
                  text-indigo-600
                  hover:text-indigo-500
                  focus-within:outline-none
                  focus-within:ring-2
                  focus-within:ring-offset-2
                  focus-within:ring-indigo-500
                "
              >
                <span>Upload a file</span>
                <Field
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  class="sr-only"
                  @change="handleFileChange"
                  rule="required"
                />
              </label>

              <ErrorMessage
                class="text-xs text-red-600 font-bold tracking-wider"
                name="file-upload"
              />

              <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

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
  name: "AddCategory",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    initRule(["min", "max", "required"]);

    const router = useRouter();
    const { saveCategories } = dataService();
    const selectedFile = ref([]);

    const formData = ref({
      name: "",
      description: "",
    });

    const saveCategoryToDatabase = async () => {
      try {
        await saveCategories({
          ...formData.value,
          file: selectedFile.value,
        });
      } catch (e) {
        alert(e.message);
      }
      await router.go();
    };

    const handleFileChange = (event) => {
      selectedFile.value = event.target.files[0];
    };

    return {
      saveCategoryToDatabase,
      formData,
      handleFileChange,
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
