<script setup lang="ts">
  import MaleSvg from '@/assets/images/male.svg?skipsvgo'
  import FemaleSvg from '@/assets/images/female.svg?skipsvgo'
  import { useLocalStorage } from '@vueuse/core'

  const { postLogin } = useLineApi()
  const authStore = useAuthStore()
  const router = useRouter()

  const now = ref<Date>(new Date())
  const today = ref<number>(now.value.getDate())

  useSeoMeta({
    title: '光輝十月 | 無限榮耀神',
    author: '© 2025 Love and Word Church All rights reserved.',
    keywords: '教會,傳道,空提,信仰,榮耀神',
    description:
      '神說：「我是阿拉法，我是俄梅戛，是昔在、今在、以後永在的全能者。」講到阿拉法，主角就是神。而攝理，廣義來說，就是神的歷史，在舊約時代，神展開舊約層級的攝理歷史；在新約時代，神展開新約層級的攝理歷史；在現今，神則展開完成級的成約攝理歷史。如此，若要講到攝理的起點，其實就等於是在講神的起點。然而，神昔在、今在、永在，這起點，實在沒辦法說是哪一天，真要說，也只能說，那就是「初」。',
    ogTitle: '光輝十月 | 無限榮耀神',
    ogDescription:
      '神說：「我是阿拉法，我是俄梅戛，是昔在、今在、以後永在的全能者。」講到阿拉法，主角就是神。而攝理，廣義來說，就是神的歷史，在舊約時代，神展開舊約層級的攝理歷史；在新約時代，神展開新約層級的攝理歷史；在現今，神則展開完成級的成約攝理歷史。如此，若要講到攝理的起點，其實就等於是在講神的起點。然而，神昔在、今在、永在，這起點，實在沒辦法說是哪一天，真要說，也只能說，那就是「初」。',
    ogUrl: 'https://www.loveandword.tw/',
    ogImage: 'images/evangelism-cover.jpg'
  })

  type UserInformation = {
    name: string
    department: number
    gender: boolean
  }

  const userInformation = useLocalStorage<UserInformation>('loveWordsEventUserInfo', {
    name: '',
    department: 0,
    gender: false
  })

  // 錯誤提示
  const isNameFalse = ref<boolean>(false)
  const isDepartmentFalse = ref<boolean>(false)

  // 當前步驟

  const joinEvent = async () => {
    if (!userInformation.value.name || !userInformation.value.department) {
      if (!userInformation.value.name) {
        isNameFalse.value = true

        setTimeout(() => {
          isNameFalse.value = false
        }, 500)
      }
      if (!userInformation.value.department) {
        isDepartmentFalse.value = true

        setTimeout(() => {
          isDepartmentFalse.value = false
        }, 500)
      }
      return
    }

    const result = (await postLogin({
      name: userInformation.value.name,
      department: userInformation.value.department,
      gender: userInformation.value.gender
    })) as { id: string }

    if (!result) return
    localStorage.setItem('october_praise_auth_jwt', result.id)
    authStore.jwt = result.id
    router.push(`/day/${today.value}`)
  }
</script>

<template>
  <div>
    <div>
      <h3 class="text-[#D97F17] font-bold text-2xl text-center montserrat">2025</h3>
      <h1
        class="text-[#D97F17] text-3xl sm:text-4xl md:text-5xl text-center wen-kai-mono py-3 lg:py-4 px-10 tracking-wider whitespace-nowrap"
      >
        光輝十月
      </h1>
      <h2
        class="relative text-[#D97F17] font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-center wen-kai-mono mb-6 md:mb-10 before:content-[''] before:w-full before:h-[1px] before:bg-[#D97F17] before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0"
      >
        <span class="inline-block backdrop-blur-sm px-4 md:px-6 tracking-widest">無限榮耀神</span>
      </h2>
      <div class="flex flex-col items-center mx-auto">
        <InputText :class="{ 'bg-red-400/80': isNameFalse }" v-model="userInformation.name" />
        <DepartmentSelect
          class="mt-4"
          :class="{ 'bg-red-400/80': isDepartmentFalse }"
          v-model="userInformation.department"
        />
        <ToggleSwitch v-model="userInformation.gender" class="mt-4">
          <template #left-text> <FemaleSvg class="w-4 h-4" />姐妹 </template>
          <template #right-text> <MaleSvg class="w-4 h-4" />弟兄 </template>
        </ToggleSwitch>
      </div>
      <div class="flex flex-col justify-center items-center mt-8">
        <Button :fn="joinEvent">參與積分</Button>
      </div>
    </div>
  </div>
</template>
