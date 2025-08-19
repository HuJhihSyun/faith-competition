<script setup lang="ts">
  import ContactSvg from '@/assets/images/contact-round.svg?skipsvgo'
  import PresentationSvg from '@/assets/images/presentation.svg?skipsvgo'
  import LessonSvg from '@/assets/images/book-open-check.svg?skipsvgo'
  import MeetingSvg from '@/assets/images/handshake.svg?skipsvgo'
  import PraySvg from '@/assets/images/message-circle-heart.svg?skipsvgo'
  import { useLineApi } from '@/composables/useLineApi'

  useSeoMeta({
    title: '光輝十月 | 查詢成績',
    author: '© 2025 Love and Word Church All rights reserved.',
    keywords: '教會,傳道,空提,信仰,榮耀神',
    description:
      '主給了老師到首爾前的叮嚀：「就像這樣，一旦你出去傳福音，靈撒但就會使用人惡劣地攻擊並阻擋你。然而，你若傳福音，許多人聽了那話語就會被傳道進來。傳福音時即使撒但妨礙，你也得勝牠們並傳福音吧！下定決心傳福音來展開　神的歷史，如此覺悟並帥氣地做吧！在這裡為了個人、民族、世界禱告吧！」',
    ogTitle: '光輝十月 | 查詢成績',
    ogDescription:
      '主給了老師到首爾前的叮嚀：「就像這樣，一旦你出去傳福音，靈撒但就會使用人惡劣地攻擊並阻擋你。然而，你若傳福音，許多人聽了那話語就會被傳道進來。傳福音時即使撒但妨礙，你也得勝牠們並傳福音吧！下定決心傳福音來展開　神的歷史，如此覺悟並帥氣地做吧！在這裡為了個人、民族、世界禱告吧！」',
    ogUrl: 'https://www.loveandword.tw/',
    ogImage: 'images/evangelism-cover.jpg'
  })

  const point = ref<number>(0)
  const percentage = ref<number>(0)
  const goal = ref<number>(1978)

  type TaskProgress = {
    title: string
    id: string
    point: number
    times: number
    icon: Component
  }

  const TaskProgresses = reactive<TaskProgress[]>([
    {
      title: '傳道',
      id: 'contact',
      point: 0,
      times: 0,
      icon: markRaw(ContactSvg)
    },
    {
      title: '講義',
      id: 'presentation',
      point: 0,
      times: 0,
      icon: markRaw(PresentationSvg)
    },
    {
      title: '聽課',
      id: 'lesson',
      point: 0,
      times: 0,
      icon: markRaw(LessonSvg)
    },
    {
      title: '見面',
      id: 'meeting',
      point: 0,
      times: 0,
      icon: markRaw(MeetingSvg)
    },
    {
      title: '禱告',
      id: 'pray',
      point: 0,
      times: 0,
      icon: markRaw(PraySvg)
    }
  ])

  // API
  const { getLineResult } = useLineApi()

  const fetchResult = async () => {
    const res: any = await getLineResult()
    const result = JSON.parse(res)

    TaskProgresses.forEach((taskProgress: { point: any; id: string; times: any }) => {
      taskProgress.point = result.score[taskProgress.id]
      taskProgress.times =
        taskProgress.id === 'pray'
          ? result.times[`${taskProgress.id}-minutes`]
          : result.times[`${taskProgress.id}-times`]
    })

    point.value = result.score.summary
    percentage.value = Math.floor((point.value / goal.value) * 100)
  }

  fetchResult()
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h3 class="text-[#D97F17] font-bold text-2xl text-center mb-1 montserrat">2025</h3>
    <h2
      class="relative text-[#D97F17] font-normal text-lg sm:text-xl md:text-2xl text-center wen-kai-mono w-2/3 before:content-[''] before:w-full before:h-[1px] before:bg-[#D97F17] before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0"
    >
      <span class="inline-block backdrop-blur-sm px-4 md:px-6">1978 再出發</span>
    </h2>
    <Progress class="mt-4 md:mt-6" :percentage="percentage" />
    <h3
      class="mt-4 md:mt-6 text-xl md:text-2xl font-bold bg-gradient-to-br from-[#d1760f] to-[#f47c0e] inline-block text-transparent bg-clip-text montserrat"
    >
      {{ point }} / {{ goal }}
    </h3>
    <div class="mt-4 md:mt-8 w-full grid gap-2 grid-cols-2 xl:grid-cols-3">
      <template v-for="TaskProgress in TaskProgresses" :key="TaskProgress.id">
        <TaskProgress :summary="point" :point="TaskProgress.point" :times="TaskProgress.times" :id="TaskProgress.id">
          <template #title>{{ TaskProgress.title }}</template>
          <template #icon><component :is="TaskProgress.icon" class="w-3 h-3 md:w-4 md:h-4 mr-1" /></template>
        </TaskProgress>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
