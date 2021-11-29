import { ref } from "vue";
import SUPABASE_CLIENT from "./config";
import { v4 as uuidv4 } from "uuid";

const productList = ref();
const categoryList = ref();
const serviceList = ref();
const subscribersList = ref();
const displayError = ref();
const session = ref();

const dataService = () => {
  const initialize = async () => {
    session.value = SUPABASE_CLIENT.auth.session();

    if (session.value) {
      await loadProducts();
      await loadCategories();
      await loadServices();
      await loadSubscribers();
    }

    SUPABASE_CLIENT.auth.onAuthStateChange(async (_event, _session) => {
      session.value = _session;

      if (_session) {
        await loadProducts();
        await loadCategories();
        await loadServices();
        await loadSubscribers();
      }
    });
  };

  const saveProducts = async (formData) => {
    try {
      const { file, ...productData } = formData;
      const imagePath = `products/${uuidv4()}-${file.name}`;

      const { error: sError } = await SUPABASE_CLIENT.storage
        .from("product-bucket")
        .upload(imagePath, file);
      if (sError) throw sError;

      const { data: dbData, error: dbError } = await SUPABASE_CLIENT.from(
        "products"
      ).insert([{ ...productData, image: imagePath }]);
      if (dbError) throw dbError;

      return { success: true, data: dbData };
    } catch (e) {
      console.log(e);
      return { success: false, error: e };
    }
  };

  const saveCategories = async (formData) => {
    try {
      const { file, ...categoryData } = formData;
      const imagePath = `categories/${uuidv4()}-${file.name}`;

      const { error: sError } = await SUPABASE_CLIENT.storage
        .from("product-bucket")
        .upload(imagePath, file);
      if (sError) throw sError;

      const { data: dbData, error: dbError } = await SUPABASE_CLIENT.from(
        "categories"
      ).insert([{ ...categoryData, image: imagePath }]);
      if (dbError) throw dbError;

      return { success: true, data: dbData };
    } catch (e) {
      console.log(e);
      return { success: false, error: e };
    }
  };

  const saveServices = async (formData) => {
    try {
      const { ...serviceData } = formData;


      const { data: dbData, error: dbError } = await SUPABASE_CLIENT.from(
          "services"
      ).insert([{ ...serviceData }]);
      if (dbError) throw dbError;

      return { success: true, data: dbData };
    } catch (e) {
      console.log(e);
      return { success: false, error: e };
    }
  };

  const removeProduct = async (product) => {
    try {
      const { error: prodError } = await SUPABASE_CLIENT.from("products")
        .delete()
        .eq("id", product.id);
      if (prodError) throw prodError;

      if (product?.image) {
        const { error: storageError } = await SUPABASE_CLIENT.storage
          .from("product-bucket")
          .remove([product.image]);

        if (storageError) throw storageError;
      }
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  };

  const removeCategory = async (category) => {
    try {
      const { error: catError } = await SUPABASE_CLIENT.from("categories")
        .delete()
        .eq("id", category.id);
      if (catError) throw catError;

      if (category?.image) {
        const { error: storageError } = await SUPABASE_CLIENT.storage
          .from("product-bucket")
          .remove([category.image]);

        if (storageError) throw storageError;
      }
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  };

  const removeService = async (service) => {
    try {
      const { error: serviceError } = await SUPABASE_CLIENT.from("services")
          .delete()
          .eq("id", service.id);
      if (serviceError) throw serviceError;

    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  };

  const removeSubscribersEmail = async (subscriber) => {
    try {
      const { error } = await SUPABASE_CLIENT.from("subscribers")
          .delete()
          .eq("id", subscriber.id);
      if (error) throw error;

    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  };

  const loadProducts = async () => {
    const load = async () => {
      let { data, error } = await SUPABASE_CLIENT.from("products").select(`
    *,
    product_variants (
      *
    )
  `);
      productList.value = data;
      displayError.value = error;

      return { data, error };
    };

    SUPABASE_CLIENT.from("products")
      .on("*", async (payload) => {
        console.log("Change received!", payload);
        await load();
      })
      .subscribe();

    await load();
  };

  const loadCategories = async () => {
    const load = async () => {
      let { data, error } = await SUPABASE_CLIENT.from("categories").select(`
    *,
    category_variants (
      *
    )
  `);
      categoryList.value = data;
      displayError.value = error;

      return { data, error };
    };

    SUPABASE_CLIENT.from("categories")
      .on("*", async (payload) => {
        console.log("Change received!", payload);
        await load();
      })
      .subscribe();

    await load();
  };


  const loadServices = async () => {
    const load = async () => {
      let { data, error } = await SUPABASE_CLIENT.from("services").select(`
    *,
    category_variants (
      *
    )
  `);
      serviceList.value = data;
      displayError.value = error;

      return { data, error };
    };

    SUPABASE_CLIENT.from("services")
        .on("*", async (payload) => {
          console.log("Change received!", payload);
          await load();
        })
        .subscribe();

    await load();
  };

  const loadSubscribers = async () => {
    const load = async () => {
      let { data, error } = await SUPABASE_CLIENT.from("subscribers").select(`*`);
      subscribersList.value = data;
      return { data, error };
    };

    SUPABASE_CLIENT.from("subscribers")
        .on("*", async (payload) => {
          console.log("Change received!", payload);
          await load();
        })
        .subscribe();

    await load();
  };


  const loadProductById = async (productId) => {
    let { data, error } = await SUPABASE_CLIENT.from("products")
      .select(`*, product_variants ( * ) `)
      .eq("id", productId);

    console.log(data, error);
    return { data, error };
  };

  const loadCategoryById = async (categoryId) => {
    let { data, error } = await SUPABASE_CLIENT.from("categories")
      .select(`*, category_variants ( * ) `)
      .eq("id", categoryId);

    console.log(data, error);
    return { data, error };
  };

  const loadServiceById = async (serviceId) => {
    let { data, error } = await SUPABASE_CLIENT.from("services")
        .select(`*, category_variants ( * ) `)
        .eq("id", serviceId);

    console.log(data, error);
    return { data, error };
  };

  return {
    displayError,
    productList,
    categoryList,
    serviceList,
    subscribersList,

    saveProducts,
    loadProducts,
    removeProduct,
    loadProductById,
    initialize,
    saveCategories,
    removeCategory,
    loadCategories,
    loadCategoryById,
    saveServices,
    removeService,
    loadServices,
    loadServiceById,
    loadSubscribers,
    removeSubscribersEmail
  };
};

dataService().initialize();

export default dataService;
