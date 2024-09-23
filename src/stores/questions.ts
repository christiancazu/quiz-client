import { defineStore } from 'pinia'
import { ref } from 'vue'

type Question = {
  id: number
  question: string
  answers: any
}

export const useQuestionsStore = defineStore('questions', {

  state: () => {
    return {
      questions: ref<Question[]>([])
    }
  },
  getters: {
  },
  actions: {
    setQuestions(q: Question[]) {
      this.questions = q
    }
  }
})
