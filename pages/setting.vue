<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  import MaleSvg from '@/assets/images/male.svg?skipsvgo'
  import FemaleSvg from '@/assets/images/female.svg?skipsvgo'
  import GoogleSvg from '@/assets/images/google.svg?skipsvgo'

  const router = useRouter()
  const authStore = useAuthStore()

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

  const saveInfo = async () => {
    await authStore.updateUser()
    router.push({ path: '/' })
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
          <InputText v-model="authStore.userInformation.name" :disabled="!!authStore.userInformation.id" />
          <InputText
            v-model="authStore.userInformation.email"
            :disabled="!!authStore.userInformation.id"
            :notice="'請輸入您的電子郵件'"
          />
          <DepartmentSelect v-model="authStore.userInformation.department" />
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
