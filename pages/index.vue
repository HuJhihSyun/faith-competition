<script setup lang="ts">
  import { useLocalStorage } from '@vueuse/core'
  import MaleSvg from '@/assets/images/male.svg?skipsvgo'
  import FemaleSvg from '@/assets/images/female.svg?skipsvgo'
  import ClickSvg from '@/assets/images/click.svg?skipsvgo'
  import ThumbSvg from '@/assets/images/thumb.svg?skipsvgo'
  import ShareSvg from '@/assets/images/share.svg?skipsvgo'
  import MessageSvg from '@/assets/images/message.svg?skipsvgo'
  import { useLineApi } from '@/composables/useLineApi'

  const router = useRouter()

  useSeoMeta({
    title: '全國青年部榮耀神15天｜百萬金手指',
    author: '© 2026 Love and Word Church All rights reserved.',
    keywords: '教會,傳道,空提,信仰,榮耀神',
    description:
      '在奔跑之年，想用最簡單的方式參與宣教嗎？現在，只要動動你的手指，就能成為福音的推手！本次活動「限定 YouTube 平台」，讓我們集中火力，把見證推向百萬點閱！我們的影片充滿正能量，與你分享：職場浴火重生見證、轉職恩典、激勵人心的生命故事！',
    ogTitle: '全國青年部榮耀神15天｜百萬金手指',
    ogDescription:
      '在奔跑之年，想用最簡單的方式參與宣教嗎？現在，只要動動你的手指，就能成為福音的推手！本次活動「限定 YouTube 平台」，讓我們集中火力，把見證推向百萬點閱！我們的影片充滿正能量，與你分享：職場浴火重生見證、轉職恩典、激勵人心的生命故事！',
    ogUrl: 'https://www.loveandword.tw/',
    ogImage: 'images/evangelism-cover.png'
  })

  type UserInformation = {
    name: string
    church: number
    gender: boolean
  }

  const userInformation = useLocalStorage<UserInformation>('loveWordsEventUserInfo', {
    name: '',
    church: 0,
    gender: false
  })

  // 錯誤提示
  const isNameFalse = ref<boolean>(false)
  const isChurchFalse = ref<boolean>(false)

  // 當前步驟
  const currentStep = ref<number>(0)

  const joinEvent = () => {
    if (!userInformation.value.name || !userInformation.value.church) {
      if (!userInformation.value.name) {
        isNameFalse.value = true

        setTimeout(() => {
          isNameFalse.value = false
        }, 500)
      }
      if (!userInformation.value.church) {
        isChurchFalse.value = true

        setTimeout(() => {
          isChurchFalse.value = false
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
      title: '點閱',
      id: 'click',
      subtitle: '10 分 / 集',
      content: '點開 youtube(podcast) 連結：一集得 10 分 (只要點開超過 3 秒，不用收聽)',
      icon: markRaw(ClickSvg)
    },
    {
      title: '按攢',
      id: 'thumb',
      subtitle: '50 分 / 個',
      content: '點個讚支持好內容得 50 分',
      icon: markRaw(ThumbSvg)
    },
    {
      title: '分享',
      id: 'share',
      subtitle: '50 分 / 人',
      content: '傳給親友或新朋友得 50 分',
      icon: markRaw(ShareSvg)
    },
    {
      title: '留言',
      id: 'message',
      subtitle: '100 分 / 集',
      content: '回饋ㄧ集內容得 100 分',
      icon: markRaw(MessageSvg)
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
        <h3 class="text-white text-shadow font-bold text-2xl text-center sacramento">2026</h3>
        <h3 class="text-white text-shadow font-bold text-xl sm:text-2xl md:text-3xl text-center wen-kai-mono">
          奔跑吧
        </h3>
        <h1
          class="text-white text-shadow text-3xl sm:text-4xl md:text-5xl text-center wen-kai-mono py-3 lg:py-6 sm:px-4 md:px-8 lg:px-10"
        >
          全國青年部榮耀神<span class="inline-block mx-1 tracking-tight">15</span>天
        </h1>
        <h2
          class="relative text-white text-shadow font-bold text-xl sm:text-2xl md:text-3xl text-center wen-kai-mono mb-10 flex justify-center items-center before:content-[''] before:w-10 md:before:w-20 before:h-[1px] before:bg-white after:content-[''] after:w-10 md:after:w-20 after:h-[1px] after:bg-white"
        >
          <span class="inline-block px-4">Podcast 百萬金手指</span>
        </h2>
        <div class="flex flex-col items-center mx-auto">
          <InputText :class="{ 'bg-red-400/80': isNameFalse }" v-model="userInformation.name" />
          <DepartmentSelect class="mt-4" :class="{ 'bg-red-400/80': isChurchFalse }" v-model="userInformation.church" />
          <ToggleSwitch v-model="userInformation.gender" class="mt-4">
            <template #left-text> <FemaleSvg class="w-4 h-4" />姐妹 </template>
            <template #right-text> <MaleSvg class="w-4 h-4" />弟兄 </template>
          </ToggleSwitch>
        </div>
        <div class="flex flex-col justify-center items-center mt-8">
          <Button :fn="joinEvent">廣傳福音積分</Button>
        </div>
      </div>
      <div v-else>
        <h3 class="text-white text-shadow text-2xl md:text-3xl text-center mb-4 wen-kai-mono whitespace-nowrap">
          榮耀神項目
        </h3>
        <main class="flex flex-col items-center mx-auto gap-3">
          <TaskOption v-for="taskOption in taskOptions" :key="taskOption.id" @click="showConfirmModal(taskOption.id)">
            <template #title>{{ taskOption.title }}</template>
            <template #subtitle>{{ taskOption.subtitle }}</template>
            <template #content>{{ taskOption.content }}</template>
            <template #icon><component :is="taskOption.icon" /></template>
          </TaskOption>
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

<style lang="scss">
  .text-shadow {
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  }

  .input-shadow {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
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
