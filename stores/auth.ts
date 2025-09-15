import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { useLineApi } from '@/composables/useLineApi'

const { getUserInfo } = useLineApi()

type UserInformation = {
  name: string
  id: string
  email: string
  picture: string
  sub: string
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
    picture: '',
    sub: '',
    department: 0,
    gender: false
  })

  const loginWithGoogle = async (response: GoogleUserAccessToken) => {
    const { access_token } = response

    if (!access_token) {
      console.error('No access token found')
      return
    }

    try {
      const userInfo: UserInformation | any = await getUserInfo(access_token)
      userInformation.value = {
        name: userInfo.name,
        id: userInfo.id,
        email: userInfo.email,
        picture: userInfo.picture,
        sub: userInfo.sub,
        department: userInfo.department,
        gender: userInfo.gender
      }

      // TODO: JWT
      if (userInfo.token) {
        jwt.value = userInfo.token
      }
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
