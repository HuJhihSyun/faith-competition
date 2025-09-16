<script setup lang="ts">
  import ContactSvg from '@/assets/images/contact-round.svg?skipsvgo'
  import PresentationSvg from '@/assets/images/presentation.svg?skipsvgo'
  import LessonSvg from '@/assets/images/book-open-check.svg?skipsvgo'
  import MeetingSvg from '@/assets/images/handshake.svg?skipsvgo'
  import PraySvg from '@/assets/images/message-circle-heart.svg?skipsvgo'
  import { useLineApi } from '@/composables/useLineApi'

  const { getResult } = useLineApi()

  useSeoMeta({
    title: '無限榮耀神 | 查詢成績',
    author: '© 2025 Love and Word Church All rights reserved.',
    keywords: '教會,傳道,空提,信仰,榮耀神',
    description:
      '主給了老師到首爾前的叮嚀：「就像這樣，一旦你出去傳福音，靈撒但就會使用人惡劣地攻擊並阻擋你。然而，你若傳福音，許多人聽了那話語就會被傳道進來。傳福音時即使撒但妨礙，你也得勝牠們並傳福音吧！下定決心傳福音來展開　神的歷史，如此覺悟並帥氣地做吧！在這裡為了個人、民族、世界禱告吧！」',
    ogTitle: '無限榮耀神 | 查詢成績',
    ogDescription:
      '主給了老師到首爾前的叮嚀：「就像這樣，一旦你出去傳福音，靈撒但就會使用人惡劣地攻擊並阻擋你。然而，你若傳福音，許多人聽了那話語就會被傳道進來。傳福音時即使撒但妨礙，你也得勝牠們並傳福音吧！下定決心傳福音來展開　神的歷史，如此覺悟並帥氣地做吧！在這裡為了個人、民族、世界禱告吧！」',
    ogUrl: 'https://www.loveandword.tw/',
    ogImage: 'images/evangelism-cover.jpg'
  })

  const point = ref<number>(0)
  const percentage = ref<number>(0)
  const goal = ref<number>(1978)

  type DepartmentProgress = {
    department: string
    id: string
    point: number
    icon: Component
  }

  const departmentProgresses = reactive<DepartmentProgress[]>([
    {
      department: '家庭局',
      id: 'family',
      point: 0,
      icon: markRaw(ContactSvg)
    },
    {
      department: '長年部',
      id: 'older',
      point: 0,
      icon: markRaw(PresentationSvg)
    },
    {
      department: '男生青年部',
      id: 'youth-male',
      point: 0,
      icon: markRaw(LessonSvg)
    },
    {
      department: '女生青年部',
      id: 'youth-female',
      point: 0,
      icon: markRaw(MeetingSvg)
    },
    {
      department: '男生大學部',
      id: 'campus-male',
      point: 0,
      icon: markRaw(PraySvg)
    },
    {
      department: '女生大學部',
      id: 'campus-female',
      point: 0,
      icon: markRaw(PraySvg)
    },
    {
      department: '男生 SS',
      id: 'ss-male',
      point: 0,
      icon: markRaw(PraySvg)
    },
    {
      department: '女生 SS',
      id: 'ss-female',
      point: 0,
      icon: markRaw(PraySvg)
    },
    {
      department: '銀河水',
      id: 'galaxy',
      point: 0,
      icon: markRaw(PraySvg)
    }
  ])

  onMounted(async () => {
    try {
      const result = await getResult()
      if (result && Array.isArray(result)) {
        departmentProgresses.forEach((dept: any) => {
          const deptScore = result.find((item: any) => item.department === dept.id)
          dept.point = deptScore ? deptScore.point || 0 : 0
        })
      }
    } catch (error) {
      console.error('Error fetching scores:', error)
    }
  })
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <Progress class="mt-4 md:mt-6" :percentage="percentage" />
    <h3
      class="mt-4 md:mt-6 text-xl md:text-2xl font-bold bg-gradient-to-br from-[#d1760f] to-[#f47c0e] inline-block text-transparent bg-clip-text montserrat"
    >
      {{ point }} / {{ goal }}
    </h3>
    <div class="mt-4 md:mt-8 w-full flex flex-col justify-center items-center gap-1 lg:px-12 xl:px-28">
      <div
        v-for="department in departmentProgresses"
        :key="department.id"
        class="flex justify-between items-center w-full"
      >
        <h5 class="text-sm md:text-base text-[#d1760f] font-bold wen-kai-mono whitespace-nowrap min-w-20 md:min-w-24">
          {{ department.department }}
        </h5>
        <div class="progress relative w-full h-4.5 bg-[#D97F17]/10 rounded overflow-hidden">
          <div
            class="progress-bar absolute left-0.5 top-1/2 -translate-y-1/2 h-3 bg-gradient-to-bl from-[#f47d0d]/60 to-[#D97F17] rounded-xs"
            :style="{ width: `${department.point}%` }"
          ></div>
        </div>
        <h6 class="text-xs md:text-sm text-[#d1760f] wen-kai-mono whitespace-nowrap min-w-24 md:min-w-28 text-right">
          累積分數：<span class="montserrat">{{ department.point }}</span>
        </h6>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
