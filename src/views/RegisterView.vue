<script setup>
import {useRoute} from 'vue-router'
import {Form, Field} from 'vee-validate';
import * as Yup from 'yup';

import router from '@/router';
import {useAuthStore} from '@/stores/auth.store';
import {fetchWrapper} from "@/helpers/fetch-wrapper";

const route = useRoute()
const authStore = useAuthStore();
const baseUrl = import.meta.env.VITE_API_URL;

if (authStore.user) {
  router.push('/')
}

const schema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});

function onSubmit(values, {setErrors}) {
  const {email, password} = values;

  fetchWrapper.post(`${baseUrl}/auth/register`, {email, password})
      .then(() => {
        router.push('/login');
      })
      .catch(error => {
        setErrors({apiError: error});
      });
}

</script>

<template>
  <div>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
      <Field name="email" type="email" :class="errors.email ? 'input-error' : ''" placeholder="Email"/>
      <Field name="password" type="password" :class="errors.password ? 'input-error' : ''"
             placeholder="Password"/>
      <Field name="confirmPassword" type="password" :class="errors.confirmPassword ? 'input-error' : ''"
             placeholder="Confirm Password"/>
      <div v-if="errors.apiError" class="error">{{ errors.apiError }}</div>
      <button type="submit" :disabled="isSubmitting">Login</button>
    </Form>
  </div>
</template>

<style scoped>

</style>