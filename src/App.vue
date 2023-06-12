<script setup>
import Dropdown from './components/Dropdown.vue';
</script>

<template>
  <main>
    <Dropdown />
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