<script setup lang="ts">
  import ClickSvg from '@/assets/images/click.svg?skipsvgo'
  import ThumbSvg from '@/assets/images/thumb.svg?skipsvgo'
  import ShareSvg from '@/assets/images/share.svg?skipsvgo'
  import MessageSvg from '@/assets/images/message.svg?skipsvgo'
  import { useLineApi } from '@/composables/useLineApi'

  useSeoMeta({
    title: '全國青年部榮耀神15天｜查詢成績',
    author: '© 2026 Love and Word Church All rights reserved.',
    keywords: '教會,傳道,空提,信仰,榮耀神',
    description:
      '在奔跑之年，想用最簡單的方式參與宣教嗎？現在，只要動動你的手指，就能成為福音的推手！本次活動「限定 YouTube 平台」，讓我們集中火力，把見證推向百萬點閱！我們的影片充滿正能量，與你分享：職場浴火重生見證、轉職恩典、激勵人心的生命故事！',
    ogTitle: '全國青年部榮耀神15天｜查詢成績',
    ogDescription:
      '在奔跑之年，想用最簡單的方式參與宣教嗎？現在，只要動動你的手指，就能成為福音的推手！本次活動「限定 YouTube 平台」，讓我們集中火力，把見證推向百萬點閱！我們的影片充滿正能量，與你分享：職場浴火重生見證、轉職恩典、激勵人心的生命故事！',
    ogUrl: 'https://www.loveandword.tw/',
    ogImage: 'images/evangelism-cover.png'
  })

  const point = ref<number>(0)
  const percentage = ref<number>(0)
  const goal = ref<number>(30000)

  type TaskProgress = {
    title: string
    id: string
    point: number
    times: number
    icon: Component
  }

  const TaskProgresses = reactive<TaskProgress[]>([
    {
      title: '點閱',
      id: 'like',
      point: 0,
      times: 0,
      icon: markRaw(ClickSvg)
    },
    {
      title: '按讚',
      id: 'muster',
      point: 0,
      times: 0,
      icon: markRaw(ThumbSvg)
    },
    {
      title: '分享',
      id: 'share',
      point: 0,
      times: 0,
      icon: markRaw(ShareSvg)
    },
    {
      title: '留言',
      id: 'message',
      point: 0,
      times: 0,
      icon: markRaw(MessageSvg)
    }
  ])

  // API
  const { getLineResult } = useLineApi()

  const fetchResult = async () => {
    const res: any = await getLineResult()
    const result = JSON.parse(res)
    console.log('result', result)

    TaskProgresses.forEach((taskProgress: { point: any; id: string; times: any }) => {
      taskProgress.point = result.score[taskProgress.id]
      taskProgress.times = result.times[`${taskProgress.id}-times`]
    })

    point.value = result.score.summary
    percentage.value = Math.floor((point.value / goal.value) * 100)
  }

  fetchResult()
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h3 class="text-white text-shadow font-bold text-2xl mb-2 text-center sacramento">2026</h3>
    <h2
      class="relative text-white text-shadow font-bold text-xl sm:text-2xl md:text-3xl text-center wen-kai-mono mb-2 flex justify-center items-center before:content-[''] before:w-10 md:before:w-20 before:h-[1px] before:bg-white after:content-[''] after:w-10 md:after:w-20 after:h-[1px] after:bg-white"
    >
      <span class="inline-block px-4">百萬金手指</span>
    </h2>
    <Progress class="mt-4 md:mt-6" :percentage="percentage" />
    <h3 class="mt-4 md:mt-6 text-xl md:text-2xl font-bold inline-block text-white text-shadow">
      <span class="wen-kai-mono">全體的總積分</span> <span class="sacramento">{{ point }}</span>
    </h3>
    <div class="mt-4 md:mt-8 w-full grid gap-2 grid-cols-2 xl:grid-cols-3">
      <TaskProgress
        v-for="TaskProgress in TaskProgresses"
        :key="TaskProgress.id"
        :summary="point"
        :point="TaskProgress.point"
        :times="TaskProgress.times"
        :id="TaskProgress.id"
      >
        <template #title>{{ TaskProgress.title }}</template>
        <template #icon><component :is="TaskProgress.icon" class="w-3 h-3 md:w-4 md:h-4 mr-1" /></template>
      </TaskProgress>
    </div>
  </div>
</template>

<style scoped></style>
