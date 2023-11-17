<script setup>
import {RouterLink} from "vue-router";
</script>

<template>
  <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-left justify-left p-6 lg:px-8">
      <RouterLink to="/features" class="text-m font-semibold leading-6 text-gray-900">Features</RouterLink>
      <RouterLink to="/Environments" class="ml-3 text-m font-semibold leading-6 text-gray-900">Environments</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>
