<script setup lang="ts">
  import ContactSvg from '@/assets/images/contact-round.svg?skipsvgo'
  import PresentationSvg from '@/assets/images/presentation.svg?skipsvgo'
  import LessonSvg from '@/assets/images/book-open-check.svg?skipsvgo'
  import MeetingSvg from '@/assets/images/handshake.svg?skipsvgo'
  import PraySvg from '@/assets/images/message-circle-heart.svg?skipsvgo'
  import { useLineApi } from '@/composables/useLineApi'

  useSeoMeta({
    title: '傳道 777 榮耀神 | 查詢成績',
    author: '© 2025 Love and Word Church All rights reserved.',
    keywords: '教會,傳道,空提,信仰,榮耀神',
    description:
      '秉持著聖經真理的教導，效法主愛人如己的精神，讓不同年齡、背景與特質的人，相聚一起學習成長，致力於讓 神所打造的天國理想世界，能夠實現在這地上。',
    ogTitle: '2025 傳道777榮耀神',
    ogDescription:
      '秉持著聖經真理的教導，效法主愛人如己的精神，讓不同年齡、背景與特質的人，相聚一起學習成長，致力於讓 神所打造的天國理想世界，能夠實現在這地上。',
    ogUrl: 'https://www.loveandword.tw/',
    ogImage: 'https://www.loveandword.tw/resource/images/img.jpg'
  })

  const point = ref<number>(0)
  const percentage = ref<number>(0)
  const goal = ref<number>(777)

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

    TaskProgresses.forEach((taskProgress) => {
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
    <h2 class="text-white text-xl text-center mb-2 sacramento">2025</h2>
    <img src="@/assets/images/love-word.png" alt="love-word" class="w-50 md:w-60 mx-auto mb-4" />
    <Progress class="mt-4 md:mt-6" :percentage="percentage" />
    <h3
      class="mt-4 md:mt-6 text-xl md:text-2xl font-bold bg-gradient-to-t from-cyan-200 to-white inline-block text-transparent bg-clip-text"
    >
      {{ point }} / {{ goal }}
    </h3>
    <div class="mt-6 md:mt-10 w-full grid gap-2 grid-cols-2 lg:grid-cols-3">
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
