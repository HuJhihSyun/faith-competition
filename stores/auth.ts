import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const jwt = ref<string | null>(null)

  return {
    jwt
  }
})
