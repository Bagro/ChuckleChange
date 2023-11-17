<script setup>
import {fetchWrapper} from "@/helpers/fetch-wrapper";
import {ref} from "vue";
import router from "@/router";

const props = defineProps(['id']);
const baseUrl = import.meta.env.VITE_API_URL;

const mode = props.id === 'new' ? 'create' : 'edit';
const id = props.id === 'new' ? null : props.id;

const feature = ref({
  name: '',
  description: '',
  environments: []
});

const environments = ref([]);
const inFeatureEnvironment = ref([]);
const enbledEnvironments = ref([]);
const isLoading = ref(mode === 'edit');

if (mode === 'edit') {
  fetchWrapper.get(`${baseUrl}/feature/${id}`).then(result => {
    feature.value = result;
    isLoading.value = true;

    feature.value.environments.forEach(featureEnvironment => {
      inFeatureEnvironment.value.push(featureEnvironment.environmentId);
      if (featureEnvironment.isEnabled) {
        enbledEnvironments.value.push(featureEnvironment.environmentId);
      }
    })
  });
}

fetchWrapper.get(`${baseUrl}/environments`).then(result => {
  environments.value = result;
});

async function onSubmit() {
  let featureId = id;

  if (mode === 'create') {
    const result = fetchWrapper.post(`${baseUrl}/feature`, {
      name: feature.value.name,
      description: feature.value.description
    });

    if (result) {
      featureId = result.id;
    }
  }

  const updateFeature = {
    id: featureId,
    name: feature.value.name,
    description: feature.value.description,
    environments: inFeatureEnvironment.value.map(id => {
      return {
        id: id,
        isEnabled: enbledEnvironments.value.includes(id),
      }
    })
  };

  const requestOptions = {
    method: 'PUT',
    headers: fetchWrapper.addHeader(`${baseUrl}/feature`),
  };

  requestOptions.headers['Content-Type'] = 'application/json';
  requestOptions.headers['accept'] = '*/*';
  requestOptions.body = JSON.stringify(updateFeature);

  const result = await fetchWrapper.put(`${baseUrl}/feature`, updateFeature); //.then(result => {

  if (result === "") {
    await router.push('/');
  }

}

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="onSubmit">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-white">Feature name</label>
          <div class="mt-2">
            <input name="name" type="text" v-model="feature.name"
                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div>
          <label for="description" class="block text-sm font-medium leading-6 text-white">Description</label>
          <div class="mt-2">
            <input name="description" type="text" v-model="feature.description"
                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div class="my-6 text-white">
          <label for="environments" class="block text-m font-medium leading-6">Environments</label>
          <div class="mt-2 ">
            <ul role="list" class="">
              <li v-for="environment in environments" :key="environment.id" class="flex items-center py-2">
                <input :name="`environments.${environment.id}`" type="checkbox"
                       :value="environment.id" v-model="inFeatureEnvironment"
                       class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                <label class="ml-3 block text-sm font-medium leading-6">{{ environment.name }}</label>
              </li>
            </ul>
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