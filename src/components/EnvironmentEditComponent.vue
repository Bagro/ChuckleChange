<script setup>
import {ref} from "vue";
import {fetchWrapper} from "@/helpers/fetch-wrapper";
import router from "@/router";

const props = defineProps(['id']);
const baseUrl = import.meta.env.VITE_API_URL;

const mode = props.id === 'new' ? 'create' : 'edit';
const id = props.id === 'new' ? null : props.id;

const environmentName = ref("");

if (mode === 'edit') {
  fetchWrapper.get(`${baseUrl}/environment/${id}`).then(result => {
    environmentName.value = result.name;
  });
}

async function onSubmit() {
  let environmentId = id;
  if (mode === 'create') {
    const result = await fetchWrapper.post(`${baseUrl}/environment`, {
      name: environmentName.value
    });
    if (result.name === environmentName.value) {
      await router.push("/environments");
    }
  }

  const result = await fetchWrapper.put(`${baseUrl}/environment`, {
    id: environmentId,
    name: environmentName.value
  });

  if (result === "") {
    await router.push("/environments");
  }
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="onSubmit">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-white">Environment name</label>
          <div class="mt-2">
            <input name="name" type="text" v-model="environmentName"
                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div>
          <button type="submit"
                  class="my-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Save
          </button>
          <button type="button" @click="router.go(-1)"
                  class="my-2 flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>