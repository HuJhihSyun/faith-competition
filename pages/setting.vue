<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  import MaleSvg from '@/assets/images/male.svg?skipsvgo'
  import FemaleSvg from '@/assets/images/female.svg?skipsvgo'
  import GoogleSvg from '@/assets/images/google.svg?skipsvgo'
  import { useLineApi } from '@/composables/useLineApi'

  const router = useRouter()
  const authStore = useAuthStore()
  const { userUpdate } = useLineApi()

  useSeoMeta({
    title: '無限榮耀神 | 基本資料填寫',
    author: '© 2025 Love and Word Church All rights reserved.',
    keywords: '教會,傳道,空提,信仰,榮耀神',
    description:
      '神說：「我是阿拉法，我是俄梅戛，是昔在、今在、以後永在的全能者。」講到阿拉法，主角就是神。而攝理，廣義來說，就是神的歷史，在舊約時代，神展開舊約層級的攝理歷史；在新約時代，神展開新約層級的攝理歷史；在現今，神則展開完成級的成約攝理歷史。如此，若要講到攝理的起點，其實就等於是在講神的起點。然而，神昔在、今在、永在，這起點，實在沒辦法說是哪一天，真要說，也只能說，那就是「初」。',
    ogTitle: '無限榮耀神 | 基本資料填寫',
    ogDescription:
      '神說：「我是阿拉法，我是俄梅戛，是昔在、今在、以後永在的全能者。」講到阿拉法，主角就是神。而攝理，廣義來說，就是神的歷史，在舊約時代，神展開舊約層級的攝理歷史；在新約時代，神展開新約層級的攝理歷史；在現今，神則展開完成級的成約攝理歷史。如此，若要講到攝理的起點，其實就等於是在講神的起點。然而，神昔在、今在、永在，這起點，實在沒辦法說是哪一天，真要說，也只能說，那就是「初」。',
    ogUrl: 'https://www.loveandword.tw/',
    ogImage: 'images/evangelism-cover.jpg'
  })

  type updateUser = {
    sub: string
    name: string
    id: string
    email: string
    picture: string
    gender: string
    department: string
    token?: string
  }

  // 錯誤提示
  const isNameFalse = ref<boolean>(false)
  const isDepartmentFalse = ref<boolean>(false)

  const saveInfo = async () => {
    if (!authStore.userInformation.name || !authStore.userInformation.department) {
      if (!authStore.userInformation.name) {
        isNameFalse.value = true

        setTimeout(() => {
          isNameFalse.value = false
        }, 500)
      }
      if (!authStore.userInformation.department) {
        isDepartmentFalse.value = true

        setTimeout(() => {
          isDepartmentFalse.value = false
        }, 500)
      }
      return
    }

    // TODO: 儲存資料 API
    const updateUser: updateUser = (await userUpdate({
      sub: authStore.userInformation.sub,
      name: authStore.userInformation.name,
      id: authStore.userInformation.id,
      email: authStore.userInformation.email,
      picture: authStore.userInformation.picture,
      gender: authStore.userInformation.gender,
      department: authStore.userInformation.department
    })) as updateUser

    console.log('updateUser', updateUser)

    if (updateUser.token) {
      authStore.jwt = updateUser.token as string
    }

    router.push('/')
  }

  type GoogleUserAccessToken = {
    access_token: string
    token_type: string
    expires_in: number
    scope: string
    authuser: string
    prompt: string
  }

  const handleGoogleLogin = (response: GoogleUserAccessToken) => {
    authStore.loginWithGoogle(response)
  }

  const isLoggedIn = computed(() => !!authStore.jwt)
</script>

<template>
  <div>
    <Subtitle>
      <template #title>無限榮耀神</template>
      <template #subtitle>基本資料填寫</template>
    </Subtitle>
    <div class="flex flex-col items-center mx-auto lg:px-12 xl:px-28">
      <template v-if="!isLoggedIn">
        <ClientOnly>
          <GoogleLogin :callback="handleGoogleLogin" popup-type="TOKEN">
            <Button><GoogleSvg class="w-5 h-5 mr-2" />使用 Google 進行登入</Button>
          </GoogleLogin>
        </ClientOnly>
      </template>
      <template v-else>
        <div class="w-full flex flex-col items-center gap-4">
          <img
            v-show="authStore.userInformation.picture"
            :src="authStore.userInformation.picture"
            :alt="authStore.userInformation.id"
            class="w-24 h-24 rounded-lg object-cover"
          />
          <InputText
            v-model="authStore.userInformation.name"
            :disabled="!!authStore.userInformation.id"
            :class="isNameFalse ? 'bg-red-400/80' : ''"
          />
          <InputText
            v-model="authStore.userInformation.email"
            :disabled="!!authStore.userInformation.id"
            :notice="'請輸入您的電子郵件'"
          />
          <DepartmentSelect
            :class="isDepartmentFalse ? 'bg-red-400/80' : ''"
            v-model="authStore.userInformation.department"
          />
          <ToggleSwitch v-model="authStore.userInformation.gender">
            <template #left-text> <FemaleSvg class="w-4 h-4" />姐妹 </template>
            <template #right-text> <MaleSvg class="w-4 h-4" />弟兄 </template>
          </ToggleSwitch>
        </div>
        <div class="flex flex-col justify-center items-center mt-8">
          <Button :fn="saveInfo">儲存資料</Button>
        </div>
      </template>
    </div>
  </div>
</template>
