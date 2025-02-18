<script setup lang="ts">
  import { useLocalStorage } from '@vueuse/core'
  import MaleSvg from '@/assets/images/male.svg?skipsvgo'
  import FemaleSvg from '@/assets/images/female.svg?skipsvgo'
  import ContactSvg from '@/assets/images/contact-round.svg?skipsvgo'
  import PresentationSvg from '@/assets/images/presentation.svg?skipsvgo'
  import LessonSvg from '@/assets/images/book-open-check.svg?skipsvgo'
  import MeetingSvg from '@/assets/images/handshake.svg?skipsvgo'
  import PraySvg from '@/assets/images/message-circle-heart.svg?skipsvgo'

  useSeoMeta({
    title: '2025 傳道777榮耀神',
    author: '© 2025 Love and Word Church All rights reserved.',
    copyright: '© 2025 Love and Word Church All rights reserved.',
    keywords: '教會,傳道,空提,信仰,榮耀神',
    description:
      '秉持著聖經真理的教導，效法主愛人如己的精神，讓不同年齡、背景與特質的人，相聚一起學習成長，致力於讓 神所打造的天國理想世界，能夠實現在這地上。',
    ogTitle: '2025 傳道777榮耀神',
    ogDescription:
      '秉持著聖經真理的教導，效法主愛人如己的精神，讓不同年齡、背景與特質的人，相聚一起學習成長，致力於讓 神所打造的天國理想世界，能夠實現在這地上。',
    ogUrl: 'https://www.loveandword.tw/',
    ogImage: 'https://www.loveandword.tw/resource/images/img.jpg'
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

    console.log('userInformation', userInformation)
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
      title: '傳道',
      id: 'contact',
      subtitle: '3 分 / 每 1 人',
      content: '以「留到聯絡方式」或「生命填寫夢想表單」為標準',
      icon: markRaw(ContactSvg)
    },
    {
      title: '講義',
      id: 'presentation',
      subtitle: '5 分 / 每 1 次',
      content: '由講師填寫',
      icon: markRaw(PresentationSvg)
    },
    {
      title: '聽課',
      id: 'lesson',
      subtitle: '5 分 / 每 1 次',
      content: '由生命管理者填寫',
      icon: markRaw(LessonSvg)
    },
    {
      title: '見面',
      id: 'meeting',
      subtitle: '1 分 / 每 1 人',
      content: '「陪跑」新生聽課、運動、吃飯、線上通話或固禱皆可',
      icon: markRaw(MeetingSvg)
    },
    {
      title: '禱告',
      id: 'pray',
      subtitle: '1 分 / 每 5 分鐘',
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

  const confirmSubmit = (payload: { category: number; minutes?: number }) => {
    console.log('confirmSubmit', payload)
    isConfirmModalShow.value = false
  }
</script>

<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="!currentStep">
        <h2 class="text-white text-xl text-center mb-2 sacramento">2025</h2>
        <img src="@/assets/images/love-word.png" alt="love-word" class="w-50 md:w-60 mx-auto mb-4" />
        <h1
          class="text-white text-3xl sm:text-4xl md:text-5xl text-center mb-10 wen-kai-mono title py-6 px-10 whitespace-nowrap"
        >
          傳道 <span>777</span> 榮耀神
        </h1>
        <div class="flex flex-col items-center space-y-4 max-w-[400px] mx-auto">
          <InputText :class="{ 'bg-red-400/80': isNameFalse }" v-model="userInformation.name" />
          <DepartmentSelect :class="{ 'bg-red-400/80': isDepartmentFalse }" v-model="userInformation.department" />
          <ToggleSwitch v-model="userInformation.gender">
            <template #left-text> <FemaleSvg class="w-4 h-4" />姐妹 </template>
            <template #right-text> <MaleSvg class="w-4 h-4" />弟兄 </template>
          </ToggleSwitch>
        </div>
        <div class="flex flex-col justify-center items-center mt-8">
          <Button :fn="joinEvent">參加積分</Button>
          <NuxtLink to="/result" class="text-white text-center text-sm underline mt-4">查看結果</NuxtLink>
        </div>
      </div>
      <div v-else>
        <h3 class="text-white text-xl sm:text-2xl md:text-3xl text-center mb-5 wen-kai-mono whitespace-nowrap">
          榮耀神項目
        </h3>
        <main class="flex flex-col items-center space-y-4 max-w-[500px] mx-auto">
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
  .title {
    -webkit-filter: contrast(2);
    background: linear-gradient(
      90deg,
      rgba(#42e8e0, 0) 0%,
      rgba(#42e8e0, 0.2) 45%,
      rgba(#42e8e0, 0.2) 55%,
      rgba(#42e8e0, 0) 100%
    );
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
