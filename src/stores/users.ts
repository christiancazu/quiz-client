import { defineStore } from 'pinia'
import { ref } from 'vue'

export type User = {
  id: number
  name: string
  score?: number
}

export type Answer = {
  id: number
  done: boolean
}


export const useUsersStore = defineStore('users', {

  state: () => {
    return {
      user: ref<User | null>(null),
      answers: ref<Answer[]>([])
    }
  },
  actions: {
    setUser(user: User) {
      this.user = {
        id: user.id,
        name: user.name
      }
    },
    setAnswer(id: number) {
      this.answers.push({ id, done: true })
    }
  },
  persist: {
    storage: sessionStorage,
  }
})
