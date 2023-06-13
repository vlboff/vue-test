<script setup>
import { ref, onMounted } from 'vue';
import { makeRequest, token } from '../api/request';
import IssueCard from './IssueCard.vue';

const issues = ref([]);

const REPOSITORY_ISSUE_QUERY = `query ($name: String!, $owner: String!) {
  repository(owner:$owner, name:$name) {
    issues(last: 100) {
      edges {
        node {
          id,
          state,
          title,
          body
        }
      }
    }
  }
}`;

const REPOSITORY_ISSUE_VARIABLES = `{
  "owner": "kevva",
  "name": "brightness"
}`;

onMounted(async () => {
  const data = await makeRequest(token, REPOSITORY_ISSUE_QUERY, REPOSITORY_ISSUE_VARIABLES);
  issues.value = data.data.repository.issues.edges
});

</script>

<template>
    <div class="issues">
      <h2>ISSUES:</h2>
      <IssueCard v-for="issue in issues" :key="issue.node.id" :title="issue.node.title" :state="issue.node.state" :body="issue.node.body"/>
    </div>
</template>

<style lang="scss" scoped>
.issues {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}
</style>