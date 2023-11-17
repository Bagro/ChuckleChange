<script setup>

import {ref} from "vue";
import {fetchWrapper} from "@/helpers/fetch-wrapper";
import {Cog6ToothIcon} from "@heroicons/vue/24/solid";

const baseUrl = import.meta.env.VITE_API_URL;
const environments = ref({});

fetchWrapper.get(`${baseUrl}/environments`).then(result => {
  environments.value = result;
});
</script>

<template>
  <div class="flex flex-row mb-3 w-6/12 mx-auto rounded-lg  my-2 justify-center">
    <button @click="$router.push({name: 'environmentEdit', params: {id: 'new'}})"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Add environment
    </button>
  </div>
  <div v-for="environment in environments" :key="environment.id"
       class="flex flex-row mb-3 w-6/12 mx-auto rounded-lg bg-slate-100 p-6 m-2 group">
    <div class="flex justify-between">
      <h3 class="font-bold text-lg">{{ environment.name }}</h3>
      <RouterLink :to="{name: 'environmentEdit', params: {id: environment.id}}">
        <Cog6ToothIcon class="w-6 h-6 fill-gray-400 hidden group-hover:block cursor-pointer"/>
      </RouterLink>
    </div>

    <p>{{ environment.description }}</p>
  </div>
</template>

<style scoped>

</style>