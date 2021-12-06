<template>
  <div class="mx-6">
    <div class="title">Category List</div>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="
              shadow
              overflow-hidden
              border-b border-gray-200
              sm:rounded-lg
            "
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Name
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(category, index) in categoryList" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <ImageView :image="category.image" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ category.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    class="
                      px-6
                      py-4
                      whitespace-nowrap
                      text-right text-sm
                      font-medium
                    "
                  >
                    <a
                      href="#"
                      class="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Edit
                    </a>
                    <button
                      @click.prevent="deleteCategory(category)"
                      class="text-red-600 hover:text-indigo-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import dataService from "@/dataService";
import ImageView from "@/components/ImageView";
import {createToast} from "mosha-vue-toastify";
export default {
  name: "CategoryList",
  components: { ImageView },
  setup() {
    const router = useRouter();
    const { displayError, categoryList, removeCategory, logout } =
      dataService();

    const addCategory = () => {
      router.push("/add-category");
    };

    const deleteCategory = async (category) => {
      await removeCategory(category);
      createToast('Category Deleted',
          {
            showIcon: 'true',
            transition: 'bounce',
            type: 'danger',
          })
      await router.go()
    };

    const doLogout = async () => {
      await logout();
      await router.replace("/login");
    };

    return {
      addCategory,
      categoryList,
      displayError,
      deleteCategory,
      doLogout,
    };
  },
};
</script>

<style scoped></style>
