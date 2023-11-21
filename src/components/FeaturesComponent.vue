<script setup>
import {ref} from "vue";
import {CheckBadgeIcon, CheckCircleIcon, Cog6ToothIcon} from "@heroicons/vue/24/solid";
import {fetchWrapper} from "@/helpers/fetch-wrapper";

const baseUrl = import.meta.env.VITE_API_URL;

let features = ref({});

fetchWrapper.get(`${baseUrl}/features`).then(result => {
  features.value = result;
});

function toggleEnvironment(featureId, environmentId) {
  fetchWrapper.put(`${baseUrl}/feature/toggle`, {featureId, environmentId}).then(result => {
    const index = features.value.findIndex(feature => feature.id === featureId);
    if (index !== -1) {
      const feature = features.value[index];

      const envIndex = feature.environments.findIndex(env => env.environmentId === environmentId);
      if (envIndex !== -1) {
        features.value[index].environments[envIndex].isEnabled = result.isActive;
      }
    }
  });
}

</script>

<template>
  <div class="flex flex-row mb-3 w-6/12 mx-auto rounded-lg  my-2 justify-center">
    <button @click="$router.push({name: 'featureEdit', params: {id: 'new'}})"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Add feature
    </button>
  </div>
    <div v-for="feature in features" :key="feature.id" class="flex flex-row mb-3 w-6/12 mx-auto rounded-lg bg-slate-100 p-6 m-2">
      <div class="w-1/4 group">
        <div class="flex justify-between">
          <h3 class="font-bold text-lg">{{ feature.name }}</h3>
          <RouterLink :to="{name: 'featureEdit', params: {id: feature.id}}">
            <Cog6ToothIcon class="w-6 h-6 fill-gray-400 hidden group-hover:block cursor-pointer"/>
          </RouterLink>
        </div>

        <p class="text-xs bg-slate-300 p-1 mt-2 rounded">{{ feature.key }}</p>
        <p>{{ feature.description }}</p>
      </div>
      <div class="w-3/4">
        <div class="flex flex-row ml-2">
          <div v-for="env in feature.environments" :key="env.id" class="flex flex-col items-center mr-2">
            <h4 class="font-bold">{{ env.environmentName }}</h4>
            <div class="mt-2 cursor-pointer" @click="toggleEnvironment(feature.id, env.environmentId)">
              <CheckCircleIcon v-if="env.isEnabled" class="w-6 h-6 fill-green-600"/>
              <CheckBadgeIcon v-else class="w-6 h-6 fill-red-600"/>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>