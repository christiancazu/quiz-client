<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { RouterView } from 'vue-router'

import { useQuestionsStore } from '@/stores/questions'
import { ref } from 'vue';

const VITE_API_URL = import.meta.env.VITE_API_URL

const isLoaded = ref(false)

const { onFetchResponse } = useFetch(`${VITE_API_URL}/questions`).json()

const questionStore = useQuestionsStore()

onFetchResponse(async (res) => {
  const data = await res.json()
  questionStore.setQuestions(data)
  isLoaded.value = true
})

</script>

<template>
  <main class="main">
    <v-container fluid class="app-container">
      <RouterView v-if="isLoaded" />
      <h2 v-else>loading</h2>
    </v-container>
  </main>
</template>

<style scoped>
.main,
.app-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
