<template>
  <div>
    <h1 class="mb-4">Resultados</h1>
    <v-data-table :headers="[
      { title: 'Puesto', key: 'rank', sortable: false, align: 'center' },
      { title: 'Usuario', key: 'name', sortable: false },
      { title: 'Puntuación', key: 'score', sortable: false },
    ]" :loading="isFetching" :items="items" item-key="id" items-per-page="20">
      <template v-slot:[`item.rank`]="{ index }">
        {{ index + 1 }}
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/stores/users';
import { useFetch } from '@vueuse/core';
import { ref } from 'vue';

const VITE_API_URL = import.meta.env.VITE_API_URL

const items = ref<User[]>([])

const { execute, isFetching, onFetchResponse } = useFetch(`${VITE_API_URL}/results`, { immediate: false })

onFetchResponse(async (res) => {
  const data: User[] = await res.json()
  items.value = data.sort((a: User, b: User) => b.score! - a.score!)
})

execute()
</script>
