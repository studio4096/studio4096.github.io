<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div>
    <header class="header">
      <div class="gnav">
        <ul>
          <li><RouterLink to="/">Top</RouterLink></li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
        </ul>
      </div>
    </header>
    <main role="main">
      <RouterView />
    </main>
  </div>
</template>

<style>
@import "@/assets/imports.css";
@import "@/assets/main.css";
</style>
