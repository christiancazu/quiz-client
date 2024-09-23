<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { useFetch } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const VITE_API_URL = import.meta.env.VITE_API_URL

const name = ref('')

const router = useRouter()
const usersStore = useUsersStore()

const { user } = storeToRefs(usersStore)

const { post, execute, isFetching } = useFetch(`${VITE_API_URL}/create_user`, { immediate: false })

async function handleNext() {
  post({ name: name.value })
  execute().then(async (res) => {
    const response = await res.json()
    usersStore.setUser(response)

    router.push({ name: 'quiz', query: { q: 1 } })
  })
}

if (user.value) {
  router.push({ name: 'quiz', query: { q: 1 } })
}
</script>

<template>
  <div class="home">
    <div class="home-container">
      <div class="d-flex justify-center">
        <img src="@/assets/cover.webp" alt="cover">
      </div>
      <h1 class="text-center my-2">QUIZ</h1>
      <v-text-field style="width: 100%;" :rules="[(v) => v.length > 2 || 'Mínimo 3 caracters']" v-model="name"
        label="Ingrese su nombre"></v-text-field>
      <div class="d-flex justify-space-between">
        <v-btn style="max-width: 200px;" class="flex-grow-1" height="48" text="VER RESULTADOS" color="info"
          @click="$router.push({ name: 'results' })" />
        <v-btn :disabled="name.length < 3 || name.length > 30" :loading="isFetching" style="max-width: 200px;"
          class="flex-grow-1" height="48" text="SIGUIENTE" color="primary" @click="handleNext" />
      </div>
    </div>
  </div>
</template>

<style>
.home {
  min-height: 100vh;
  align-items: center;
  display: flex;
  max-width: 600px;
  width: 100%;
  justify-content: center;
}

.home-container {
  width: 100%;
}
</style>
