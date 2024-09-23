<template>
  <div>
    <h1 class="mb-4">Resultados</h1>
    <v-data-table :headers="[
      { title: 'Puesto', key: 'rank', sortable: false, align: 'center' },
      { title: 'Usuario', key: 'name', sortable: false },
      { title: 'Puntuación', key: 'score', sortable: false },
    ]" :loading="isFetching" :items="items" item-key="id" items-per-page="20">
      <template v-slot:item="{ index, item }">
        <tr class="text-subtitle-1" :class="{ 'bg-yellow': item.id === user?.id }">
          <td class="text-center">{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.score }}</td>
        </tr>
      </template>
    </v-data-table>

    <MyAnswers />
  </div>
</template>

<script setup lang="ts">
import MyAnswers from '@/components/MyAnswers.vue';
import { useUsersStore, type User } from '@/stores/users';
import { useFetch } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const VITE_API_URL = import.meta.env.VITE_API_URL

const usersStore = useUsersStore()

const { user } = storeToRefs(usersStore)


const items = ref<User[]>([])

const { execute, isFetching, onFetchResponse } = useFetch(`${VITE_API_URL}/results`, { immediate: false })

onFetchResponse(async (res) => {
  const data: User[] = await res.json()
  items.value = data.sort((a: User, b: User) => b.score! - a.score!)
})

execute()
</script>
