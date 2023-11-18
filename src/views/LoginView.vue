<script setup>
import {RouterLink, useRoute} from 'vue-router'
import {Form, Field} from 'vee-validate';
import * as Yup from 'yup';

import router from '@/router';
import {useAuthStore} from '@/stores/auth.store';

const route = useRoute()
const authStore = useAuthStore();

if (authStore.user) {
  router.push('/')
}

const schema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function onSubmit(values, {setErrors}) {
  const {email, password} = values;

  return authStore.login(email, password).then(() => {
    router.push(route.query.redirect || '/')
  })
      .catch(error => {
        setErrors({apiError: error});
      });
}

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white">Email address</label>
          <div class="mt-2">
            <Field name="email" type="email" :class="errors.email ? 'input-error' : ''"
                   class="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
          <div class="mt-2">
            <Field name="password" type="password" :class="errors.password ? 'input-error' : ''"
                   class="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div v-if="errors.apiError" class="error">{{ errors.apiError }}</div>
        <div>
          <button type="submit" :disabled="isSubmitting"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Login
          </button>
        </div>
      </Form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member? Register
        <RouterLink to="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">here
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<style>
</style>
