<script setup>
import {useRoute} from 'vue-router'
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
  <div>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
      <Field name="email" type="email" :class="errors.email ? 'input-error' : ''" placeholder="Email"/>
      <Field name="password" type="password" :class="errors.password ? 'input-error' : ''"
             placeholder="Password"/>
      <div v-if="errors.apiError" class="error">{{ errors.apiError }}</div>
      <button type="submit" :disabled="isSubmitting">Login</button>
    </Form>
  </div>
</template>

<style>
</style>
