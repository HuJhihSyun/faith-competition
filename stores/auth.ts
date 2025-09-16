import { defineStore } from 'pinia'
import { useLineApi } from '@/composables/useLineApi'

const { getUserInfo, userUpdate } = useLineApi()

type UserInformation = {
  name: string
  id: string
  email: string
  picture: string
  sub: string
  department: number
  gender: boolean
  token?: string
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
  const jwt = ref<string | null>(null)
  const userInformation = reactive<UserInformation>({
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
      userInformation.name = userInfo.name
      userInformation.id = userInfo.id
      userInformation.email = userInfo.email
      userInformation.picture = userInfo.picture
      userInformation.sub = userInfo.sub
      userInformation.department = userInfo.department || 0
      userInformation.gender = userInfo.gender || false

      if (userInfo.token) jwt.value = userInfo.token

      localStorage.setItem('october_praise_auth_jwt', jwt.value || '')
      localStorage.setItem('october_praise_auth_user', JSON.stringify(userInformation))
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }

  const updateUser = async () => {
    const updateUser = (await userUpdate({
      sub: userInformation.sub,
      name: userInformation.name,
      id: userInformation.id,
      email: userInformation.email,
      picture: userInformation.picture,
      gender: userInformation.gender,
      department: userInformation.department
    })) as UserInformation

    userInformation.name = updateUser.name
    userInformation.id = updateUser.id
    userInformation.email = updateUser.email
    userInformation.picture = updateUser.picture
    userInformation.sub = updateUser.sub
    userInformation.department = updateUser.department
    userInformation.gender = updateUser.gender

    localStorage.setItem('october_praise_auth_user', JSON.stringify(userInformation))

    if (updateUser.token) {
      jwt.value = updateUser.token as string
    }
  }

  return {
    jwt,
    userInformation,
    loginWithGoogle,
    updateUser
  }
})
