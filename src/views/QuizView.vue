<template>
  <div class="quiz">
    <div v-if="currentQuestion">
      <div class="d-flex justify-center">
        <IconCommunity v-if="route.query.q === '1'" />
        <IconDocumentation v-else-if="route.query.q === '2'" />
        <IconEcosystem v-else-if="route.query.q === '3'" />
        <IconSupport v-else-if="route.query.q === '4'" />
        <IconTooling v-else />
      </div>
      <h2 class="mb-4 pt-8">{{ currentQuestion.id }}. {{ currentQuestion.question }}</h2>
      <v-radio-group v-model="answer">
        <v-radio class="quiz-radio" v-for="(item, key) in currentQuestion.answers" :label="item" :key="key"
          :value="key"></v-radio>
      </v-radio-group>

      <v-progress-linear class="mb-8" :model-value="progressBar"></v-progress-linear>

      <div class="d-flex justify-end">
        <v-btn :disabled="!answer" :loading="isFetching" style="max-width: 200px;" class="flex-grow-1" height="48"
           color="primary" @click="handleNext" append-icon="mdi-chevron-right">
           SIGUIENTE
          </v-btn>
          </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconCommunity from '@/components/icons/IconCommunity.vue';
import IconDocumentation from '@/components/icons/IconDocumentation.vue';
import IconEcosystem from '@/components/icons/IconEcosystem.vue';
import IconSupport from '@/components/icons/IconSupport.vue';
import IconTooling from '@/components/icons/IconTooling.vue';
import { useQuestionsStore } from '@/stores/questions';
import { useUsersStore } from '@/stores/users';
import { useFetch } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const VITE_API_URL = import.meta.env.VITE_API_URL
const DELAY_VALUE = 100

let interval: number

const route = useRoute()
const router = useRouter()
const usersStore = useUsersStore()

const { user, answers } = storeToRefs(usersStore)

const { q } = route.query

const answer = ref('')
const progressBar = ref(0)

const questionStore = useQuestionsStore()

const { questions } = storeToRefs(questionStore)


const { post, execute, isFetching } = useFetch(`${VITE_API_URL}/create_answer`, { immediate: false })

const currentQuestion = ref(questions.value.find((question) => question.id! === Number(q)))

function handleNext() {

  const isAnswerDone = answers.value.find((answer) => answer.id === Number(route.query.q))

  if (isAnswerDone) {
    nextQuestion()
    return
  }

  post({ user_id: user.value!.id, question_id: currentQuestion.value!.id, answer: answer.value, delay: DELAY_VALUE - progressBar.value })
  execute().then(async (res) => {
    const response = await res.json()
    usersStore.setUser(response)

    const nextQueryQuestion = Number(route.query.q) + 1

    if (nextQueryQuestion === 6) {
      router.push({ name: 'results' })
    } else {
      usersStore.setAnswer(+route.query.q!)

      router.replace({ name: 'quiz', query: { q: nextQueryQuestion } })
      answer.value = ''
      currentQuestion.value = questions.value.find((question) => question.id! === nextQueryQuestion)
      progressBar.value = 0
      clearInterval(interval)

      setTimeout(() => {
        delay()
      }, 1000);
    }
  })
}

function nextQuestion() {
  const nextQueryQuestion = Number(route.query.q) + 1

  router.replace({ name: 'quiz', query: { q: nextQueryQuestion } })
  answer.value = ''
  currentQuestion.value = questions.value.find((question) => question.id! === nextQueryQuestion)
  progressBar.value = 0
  clearInterval(interval)

  setTimeout(() => {
    delay()
  }, 1000);

}

function delay() {
  interval = setInterval(() => {
    progressBar.value += 1

    if (progressBar.value > (DELAY_VALUE - 1)) {
      clearInterval(interval)
    }
  }, 100)
}

if (!user.value) {
  router.push({ name: 'home' })
}

setTimeout(() => {
  delay()
}, 1000);
</script>

<style>
.quiz {
  min-height: 100vh;
  display: flex;
  align-items: center;
  max-width: 800px;
}

.quiz-radio {
  margin-bottom: 16px;
}

.v-label {
  font-size: 20px;
}
</style>
