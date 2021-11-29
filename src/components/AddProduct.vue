<template>
  <div class="mx-6">
    <div class="title">Create New Product</div>
    <Form ref="formRef" v-slot="{ errors }" @submit="saveProductToDatabase">
      <Field
        name="name"
        v-model="formData.name"
        :class="fieldClasses(!!errors.name)"
        placeholder="Product Name"
        class="my-1"
        rules="required"
      />

      <ErrorMessage class="text-xs text-red-600 font-bold" name="name" />

      <Field
        name="description"
        as="textarea"
        :class="fieldClasses(!!errors.description)"
        v-model="formData.description"
        rows="3"
        class="input-class my-2"
        rules="required|max:180"
      />

      <ErrorMessage class="text-xs text-red-600 font-bold" name="description" />

      <Field
        name="brief"
        :class="fieldClasses(!!errors.brief)"
        v-model="formData.brief"
        placeholder="Product Brief"
        class="my-1"
        rules="required|max:180"
      />

      <ErrorMessage class="text-xs text-red-600 font-bold" name="brief" />

      <Field
        name="price"
        type="number"
        :class="fieldClasses(!!errors.price)"
        v-model="formData.price"
        placeholder="Product Price"
        class="my-1"
        rules="required"
      />

      <ErrorMessage class="text-xs text-red-600 font-bold" name="price" />

      <select
        name="category"
        :class="fieldClasses(!!errors.category)"
        v-model="formData.category"
        class="input-class my-1"
        id="category"
      >
        <option
          v-for="(category, index) in categoryList"
          :key="index"
          :value="category.name"
        >
          {{ category.name }}
        </option>
      </select>

      <ErrorMessage class="text-xs text-red-600 font-bold" name="category" />

      <div class="my-8">
        <label class="block text-sm font-medium text-gray-700">
          Product Image
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
                  rules="required"
                />
              </label>
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
  name: "AddProduct",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    initRule(["min", "max", "required"]);

    const router = useRouter();
    const { saveProducts, categoryList } = dataService();
    const selectedFile = ref(null);

    const formData = ref({
      name: "",
      description: "",
      price: "",
      category: "",
      brief: "",
    });

    const saveProductToDatabase = async () => {
      try {
        await saveProducts({
          ...formData.value,
          price: Number(formData.value.price * 100),
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
      saveProductToDatabase,
      formData,
      handleFileChange,
      categoryList,
    };
  },
  methods: {
    fieldClasses(hasError) {
      const cls =
        "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150";

      return !hasError ? cls : `${cls} is-error`;
    },
  },
};
</script>

<style></style>
