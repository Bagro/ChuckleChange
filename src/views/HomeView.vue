<script setup>
import {RouterLink} from "vue-router";
</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <header class=" bg-gray-900">
      <!-- Make an top bar with a logo at the far left and menu that starts inline with the content -->
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-row mx-auto items-left">
          <div class="w-2/12 flex md:block hidden text-white text-2xl">
            Chuckle Change
          </div>
          <nav class="mx-auto flex w-8/12 max-w-7xl items-left justify-left p-2 lg:px-4 text-white">
            <RouterLink to="/features" class="text-m font-semibold leading-6 ">Features</RouterLink>
            <RouterLink to="/environments" class="ml-3 text-m font-semibold leading-60">Environments</RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <main class="mb-auto h-10">
      <RouterView/>
    </main>

    <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 Patric Green. All Rights Reserved.
    </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="https://codeberg.org/bagro/ChuckleChange" class="hover:underline mx-2" target="_blank"
               rel="noopener noreferrer">
              <img src="@/assets/codeberg-logo_icon_white.svg" alt="Codeberg"/>
            </a>
          </li>
          <li>
            <a href="https://codeberg.org/bagro/ChuckleChange/src/branch/main/LICENSE" class="hover:underline mx-2"
               target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License" class="px-2"/>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>
