<template>
  <div class="my-4" v-if="user">
    <h1 class="mb-2">Mis Respuestas</h1>

    <div class="">
      <div v-for="(question, index) in questions" :key="question.id" class="mb-2">
        <h5>
          {{ question.id }}. {{ question.question }}
        </h5>
        <p class="ml-4 text-grey-lighten-2 text-subtitle-2">
          {{ myAnswers[index] }}
        </p>
      </div>
    </div>
  </div>
  <div class="d-flex justify-end" v-else>
    <v-btn style="max-width: 200px;" height="48" class="my-4" color="info" @click="$router.push({ name: 'home' })"
      prepend-icon="mdi-home">
      INICIAR QUIZ
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useQuestionsStore } from '@/stores/questions';
import { useUsersStore } from '@/stores/users';
import { useFetch } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const VITE_API_URL = import.meta.env.VITE_API_URL

const questionStore = useQuestionsStore()
const usersStore = useUsersStore()

const { questions } = storeToRefs(questionStore)
const { user } = storeToRefs(usersStore)

const myAnswers = ref([])

const { execute } = useFetch(`${VITE_API_URL}/my_answers/${user.value?.id}`, { immediate: false })

if (user.value) {
  execute().then(async (res) => {
    const data = await res.json()
    myAnswers.value = data.reduce((acc: any, question: any) => {
      const current = questions.value.find((q) => q.id === question.question_id)

      acc.push(current?.answers[question.answer])

      return acc
    }, [])

  })
}
</script>