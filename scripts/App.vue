<template>
  <div>
    <header class="header">
      <div class="gnav">
        <ul>
          <li><router-link to="/">Top</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </div>
    </header>
    <main role="main">
      <router-view></router-view>
    </main>
  </div>
</template>
<script lang="ts">
export default {
}
</script>
