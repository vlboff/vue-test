<script setup>
import { ref, onMounted } from 'vue';
//   import { useStore } from 'vuex';


const filter = ref('');
const repositories = ref([]);
const filteredRepositories = ref([]);
const selectedRepository = ref('');
const show = ref(false);

const url = 'https://api.github.com/graphql'
const token = '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'
//   const store = useStore();

const toggleShow = () => {
  if (show.value) {
    show.value = false;
  } else {
    show.value = true;
  }
}

function filterRepositories() {
  filteredRepositories.value = repositories.value.filter((repository) =>
    repository.name.toLowerCase().includes(filter.value.toLowerCase())
  );
}


function handleSelection(repositoryName) {
  selectedRepository.value = repositoryName;
  show.value = false;
  console.log('Selected repository:', selectedRepository.value);
}

onMounted(async () => {
  repositories.value = await makeRequest(token, `{
      user(login:"octocat") {
        repositories (last: 100) {
          nodes {
            name,
            id
          }
        }
      }
    }`
  );

  filterRepositories();
});

const makeRequest = async (token, query) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer  ${token}`,
    },
    body: JSON.stringify({
      query,
    }),
  });
  const data = await res.json();
  return data.data.user.repositories.nodes;
};
</script>

<template>
  <div class="dropdown">
    <button @click="toggleShow">
      <span v-if="show">Octocat repositories: &#9650;</span>
      <span v-else>Octocat repositories: &#9660;</span>
    </button>
    <div class="dropdown__block" v-show="show">
      <input type="text" class="dropdown__input" v-model="filter" @input="filterRepositories" placeholder="Search repository" />
      <ul class="dropdown__list">
        <li v-for="repository in filteredRepositories" :key="repository.id" :value="repository.name" @click="() => handleSelection(repository.name)">
          {{ repository.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  display: flex;
  margin: 0 auto;
  gap: 10px;
  max-width: fit-content;
}
.dropdown__block {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.dropdown__list {
  max-height: 300px;
  overflow-y: auto;
}

.dropdown__list li {
  cursor: pointer;
}

.dropdown__list li:hover {
  color: #535bf2;
}
</style>