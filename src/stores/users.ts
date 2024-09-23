import { defineStore } from 'pinia'
import { ref } from 'vue'

type User = {
  id: number
  name: string
  score?: number
}

export const useUsersStore = defineStore('users', {

  state: () => {
    return {
      user: ref<User | null>(null)
    }
  },
  actions: {
    setUser(user: User) {
      this.user = {
        id: user.id,
        name: user.name
      }
    }
  },
  persist: true
})
