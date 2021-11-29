<template>
  <div class="md:mx-6">
    <div class="title">Product List</div>
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
                <tr v-for="(product, index) in productList" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <ImageView :image="product.image" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ product.name }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ product.category }}
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
                      >Edit</a
                    >
                    <button
                      @click.prevent="deleteProduct(product)"
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
export default {
  name: "ProductList",
  components: { ImageView },
  setup() {
    const router = useRouter();
    const { displayError, productList, removeProduct } = dataService();

    const addProduct = () => {
      router.push("/add-product");
    };

    const deleteProduct = async (product) => {
      await removeProduct(product);
      router.go();
    };

    return {
      addProduct,
      productList,
      displayError,
      deleteProduct,
    };
  },
};
</script>

<style scoped></style>
