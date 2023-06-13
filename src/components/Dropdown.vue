<script setup>
import { ref, onMounted } from 'vue';
import { makeRequest, token } from '../api/request';
//   import { useStore } from 'vuex';

const OCTOCAT_REPOSITORIES_QUERY = `{
  user(login:"octocat") {
    repositories (last: 100) {
      nodes {
        name,
        id,
        owner {
          id,
          login
        }
      }
    }
  }
}`

const filter = ref('');
const repositories = ref([]);
const filteredRepositories = ref([]);
const selectedRepositoryName = ref('');
const selectedRepositoryOwner = ref('');
const show = ref(false);

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
    repository.name.toLowerCase().includes(filter.value.toLowerCase()) || repository.owner.login.toLowerCase().includes(filter.value.toLowerCase())
  );
}

function handleSelection(repositoryName, ownerLogin) {
  selectedRepositoryName.value = repositoryName;
  selectedRepositoryOwner.value = ownerLogin;
  show.value = false;
  console.log(`Selected repository: ${selectedRepositoryName.value}, owner: ${selectedRepositoryOwner.value}`);
}

onMounted(async () => {
  const data = await makeRequest(token, OCTOCAT_REPOSITORIES_QUERY);
  repositories.value = data.data.user.repositories.nodes;
  filterRepositories();
});
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
        <li v-for="repository in filteredRepositories" :key="repository.id" :value="repository.name" @click="() => handleSelection(repository.name, repository.owner.login)">
          {{ repository.name }} (owner: {{ repository.owner.login }})
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  display: flex;
  margin: 0 auto;
  gap: 10px;
  max-width: fit-content;

  &__block {
    display: flex;
    gap: 10px;
    flex-direction: column;

    .dropdown__list {
      max-height: 300px;
      overflow-y: auto;

      li {
        cursor: pointer;
      }

      li:hover {
        color: #535bf2;
      }
    }
  }
}
</style>