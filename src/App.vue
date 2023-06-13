<script setup>
import Dropdown from './components/Dropdown.vue';
import Issues from './components/Issues.vue';
</script>

<template>
  <main>
    <Dropdown />
    <Issues />
  </main>
</template>

<style scoped>
.dropdown {
  display: flex;
  flex-direction: column;
}

.dropdown__list {
  max-height: 500px;
  overflow-y: auto;
}
</style>