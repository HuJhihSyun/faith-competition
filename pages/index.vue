<script setup lang="ts">
  import { useLocalStorage } from '@vueuse/core'
  import MaleSvg from '@/assets/images/male.svg?skipsvgo'
  import FemaleSvg from '@/assets/images/female.svg?skipsvgo'
  import ContactSvg from '@/assets/images/contact-round.svg?skipsvgo'
  import PresentationSvg from '@/assets/images/presentation.svg?skipsvgo'
  import LessonSvg from '@/assets/images/book-open-check.svg?skipsvgo'
  import MeetingSvg from '@/assets/images/handshake.svg?skipsvgo'
  import PraySvg from '@/assets/images/message-circle-heart.svg?skipsvgo'
  import { useLineApi } from '@/composables/useLineApi'

  const router = useRouter()

  useSeoMeta({
    title: '傳道黃金15天 | 1978再出發',
    author: '© 2025 Love and Word Church All rights reserved.',
    keywords: '教會,傳道,空提,信仰,榮耀神',
    description:
      '神說：「我是阿拉法，我是俄梅戛，是昔在、今在、以後永在的全能者。」講到阿拉法，主角就是神。而攝理，廣義來說，就是神的歷史，在舊約時代，神展開舊約層級的攝理歷史；在新約時代，神展開新約層級的攝理歷史；在現今，神則展開完成級的成約攝理歷史。如此，若要講到攝理的起點，其實就等於是在講神的起點。然而，神昔在、今在、永在，這起點，實在沒辦法說是哪一天，真要說，也只能說，那就是「初」。',
    ogTitle: '傳道黃金15天 | 1978再出發',
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
  const currentStep = ref<number>(0)

  const joinEvent = () => {
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

    currentStep.value += 1
  }

  // Step 2
  type TaskOptions = {
    title: string
    id: string
    subtitle: string
    content: string
    icon: Component
  }

  const taskOptions: TaskOptions[] = [
    {
      title: '連結',
      id: 'contact',
      subtitle: '7 分 / 每 1 人',
      content: '以「留到聯絡方式」或「生命填寫夢想表單」為標準',
      icon: markRaw(ContactSvg)
    },
    {
      title: '講義',
      id: 'presentation',
      subtitle: '10 分 / 每 1 次',
      content: '由講師填寫',
      icon: markRaw(PresentationSvg)
    },
    {
      title: '聽課',
      id: 'lesson',
      subtitle: '10 分 / 每 1 次',
      content: '由生命管理者填寫',
      icon: markRaw(LessonSvg)
    },
    {
      title: '見面',
      id: 'meeting',
      subtitle: '3 分 / 每 1 人',
      content: '「陪跑」新生聽課、運動、吃飯、線上通話或固禱皆可',
      icon: markRaw(MeetingSvg)
    },
    {
      title: '禱告',
      id: 'pray',
      subtitle: '3 分 / 每 5 分鐘',
      content: '為「傳道生命」、「宣教目標」之禱告皆可計入',
      icon: markRaw(PraySvg)
    }
  ]

  const currentTaskOption = ref<TaskOptions | null | undefined>(null)
  const isConfirmModalShow = ref<boolean>(false)

  const showConfirmModal = (id: string) => {
    currentTaskOption.value = taskOptions.find((taskOption) => taskOption.id === id)
    isConfirmModalShow.value = true
  }

  const closeModal = () => {
    isConfirmModalShow.value = false
  }

  // API
  const { postLine } = useLineApi()

  const submitData = async (payloadData: Record<string, any>) => {
    const response = await postLine(payloadData)
  }

  const confirmSubmit = (payload: { category: number; minutes?: number }) => {
    const payloadData = {
      ...userInformation.value,
      ...payload
    }
    // API
    submitData(payloadData)
      .then(() => {
        isConfirmModalShow.value = false
        router.push('/result')
      })
      .catch((error) => {
        console.error(error)
      })
  }
</script>

<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="!currentStep">
        <h3 class="text-[#D97F17] font-bold text-2xl text-center mb-1 sacramento">2025</h3>
        <!-- <img src="@/assets/images/love-word.png" alt="love-word" class="w-50 md:w-60 mx-auto mb-4" /> -->
        <h1
          class="text-[#D97F17] text-4xl sm:text-4xl md:text-5xl text-center wen-kai-mono py-3 lg:py-6 px-10 whitespace-nowrap"
        >
          傳道黃金<span class="inline-block mx-2">15</span>天
        </h1>
        <h2
          class="relative text-[#D97F17] font-bold text-xl sm:text-2xl md:text-3xl text-center wen-kai-mono mb-10 before:content-[''] before:w-full before:h-[1px] before:bg-[#D97F17] before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0"
        >
          <span class="inline-block backdrop-blur-sm px-4 md:px-6">1978 再出發</span>
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
      <div v-else>
        <h3 class="text-[#d1760f] text-2xl md:text-3xl text-center mb-4 wen-kai-mono whitespace-nowrap">榮耀神項目</h3>
        <main class="flex flex-col items-center mx-auto gap-2">
          <template v-for="taskOption in taskOptions" :key="taskOption.id">
            <TaskOption @click="showConfirmModal(taskOption.id)">
              <template #title>{{ taskOption.title }}</template>
              <template #subtitle>{{ taskOption.subtitle }}</template>
              <template #content>{{ taskOption.content }}</template>
              <template #icon><component :is="taskOption.icon" /></template>
            </TaskOption>
          </template>
        </main>
      </div>
    </transition>
    <ConfirmModal
      v-if="isConfirmModalShow"
      :taskOption="currentTaskOption"
      @close-modal="closeModal"
      @confirm-submit="confirmSubmit"
    />
  </div>
</template>

<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
