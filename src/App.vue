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
      <div v-else class="d-flex justify-center flex-column align-center">
        <h2 class="mb-4">Cargando QUIZ...</h2>
        <div class="loader"></div>

      </div>
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

.main {
  width: 100%;
  min-height: 100vh;
  z-index: -1;
  background: linear-gradient(90deg, #3f51b5, #00bcd4);
  animation: animate 20s linear infinite;
}

@keyframes animate {
  0% {
    filter: hue-rotate(0deg);
  }

  50% {
    filter: hue-rotate(360deg);
  }

  100% {
    filter: hue-rotate(0deg);
  }
}

.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
</style>
