import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

type UserInformation = {
  name: string
  id: string
  email: string
  avatar: string
  department: number
  gender: boolean
}

// 如果使用 token：popup-type="TOKEN"
type GoogleUserAccessToken = {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
  authuser: string
  prompt: string
}

// 預設使用 Credential
type GoogleUserCredential = {
  clientId: string
  client_id: string
  credential: string
  select_by: string
}

export const useAuthStore = defineStore('auth', () => {
  const jwt = useLocalStorage<string | null>('october_praise_auth_jwt', null)
  const userInformation = useLocalStorage<UserInformation>('october_praise_auth_user', {
    name: '',
    id: '',
    email: '',
    avatar: '',
    department: 0,
    gender: false
  })

  const loginWithGoogle = async (response: GoogleUserAccessToken) => {
    console.log('Google User Response', response)

    const { access_token } = response
    if (!access_token) {
      console.error('No access token found')
      return
    }

    try {
      const user = (await $fetch('/api/auth/google', {
        method: 'POST',
        body: { accessToken: access_token }
      })) as {
        name: string
        email: string
        avatar: string
        id: string
      }
      console.log('User Info:', user)
      userInformation.value.name = user.name
      userInformation.value.email = user.email
      userInformation.value.avatar = user.avatar
      userInformation.value.id = user.id

      // TODO: JWT
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }

  return {
    jwt,
    userInformation,
    loginWithGoogle
  }
})
