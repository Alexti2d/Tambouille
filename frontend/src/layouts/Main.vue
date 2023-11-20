<script setup>
import ComponentNav from "../components/ComponentNav.vue";
</script>

<template>
  <ComponentNav />
  <Suspense>
    <template #default>
      <router-view></router-view>
    </template>
    <template #fallback>
      <span>Loading...</span>
    </template>
  </Suspense>
</template>
