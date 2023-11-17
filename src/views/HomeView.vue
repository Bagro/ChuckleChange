<script setup>
import {RouterLink} from "vue-router";
import Features from "@/components/FeaturesComponent.vue";
</script>

<template>
  <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>
  <main>
    <Features />
  </main>
</template>
