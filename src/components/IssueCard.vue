<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
  },
  state: {
    type: String,
  },
  body: {
    type: String,
  }
})

const wrapCodeBlocks = (str) => {
  const regex = /```([\s\S]+?)```/g;
  const replacement = '<pre>$1</pre>';
  return str.replace(regex, replacement);
}

const parsedBody = computed(() => {
      const div = document.createElement('div');
      div.innerHTML = wrapCodeBlocks(props.body);
      return div.innerHTML;
    });

</script>

<template>
  <div class="issue">
    <h4>{{ title }}</h4>
    <span :class="{
      open: state === 'OPEN',
      closed: state === 'CLOSED'
    }">{{ state }}</span>
    <div v-if="body" v-html="parsedBody" class="issue__body"></div>
    <button class="issue__comments">Comments...</button>
  </div>
</template>

<style lang="scss" scoped>
.issue {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 7px 15px rgba(0,0,0,0.25), 0 7px 7px rgba(0,0,0,0.22);
  transition: all 0.3s;

  &:hover {
    transform: scale(1.01);
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 5px;
    border: 1px solid;
    border-color: #e8e8e8;;
    border-radius: 8px;
  }

  &__comments {
    width: fit-content;
  }
}

.open {
  color: green;
}

.closed {
  color: red;
}
</style>