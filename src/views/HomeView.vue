<script setup>
import {RouterLink} from "vue-router";
</script>

<template>
  <header class="bg-gray-900">
    <nav class="mx-auto flex max-w-7xl items-left justify-left p-2 lg:px-4 text-white">
      <RouterLink to="/features"  class="text-m font-semibold leading-6 ">Features</RouterLink>
      <RouterLink to="/environments" class="ml-3 text-m font-semibold leading-60">Environments</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>
