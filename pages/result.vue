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

  const goal = ref<number>(100)
  const summary = ref<number>(0)

  type DepartmentProgress = {
    label: string
    department: number
    gender?: boolean
    id: string
    point: number
    icon: Component
  }

  const departmentProgresses = reactive<DepartmentProgress[]>([
    {
      label: '家庭局',
      department: 5,
      id: 'family',
      point: 0,
      icon: markRaw(ContactSvg)
    },
    {
      label: '長年部',
      department: 6,
      id: 'older',
      point: 0,
      icon: markRaw(PresentationSvg)
    },
    {
      label: '男生青年部',
      department: 4,
      gender: true,
      id: 'youth-male',
      point: 0,
      icon: markRaw(LessonSvg)
    },
    {
      label: '女生青年部',
      department: 4,
      gender: false,
      id: 'youth-female',
      point: 0,
      icon: markRaw(MeetingSvg)
    },
    {
      label: '男生大學部',
      department: 3,
      gender: true,
      id: 'campus-male',
      point: 0,
      icon: markRaw(PraySvg)
    },
    {
      label: '女生大學部',
      department: 3,
      gender: false,
      id: 'campus-female',
      point: 0,
      icon: markRaw(PraySvg)
    },
    {
      label: '男生 SS',
      department: 2,
      gender: true,
      id: 'ss-male',
      point: 0,
      icon: markRaw(PraySvg)
    },
    {
      label: '女生 SS',
      department: 2,
      gender: false,
      id: 'ss-female',
      point: 0,
      icon: markRaw(PraySvg)
    },
    {
      label: '銀河水',
      department: 1,
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
          const matched = result.find(
            (item: any) =>
              Number(item.department) === Number(dept.department) &&
              (item.gender === dept.gender || dept.gender === undefined)
          )
          dept.point = matched ? Number(matched.totalScore) : 0
        })
      }
      summary.value = departmentProgresses.reduce((acc: number, dept: { point: number }) => acc + dept.point, 0)
    } catch (error) {
      console.error('Error fetching scores:', error)
    }
  })
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h3
      class="mt-4 md:mt-6 text-xl md:text-2xl font-bold bg-gradient-to-br from-[#d1760f] to-[#f47c0e] inline-block text-transparent bg-clip-text montserrat"
    >
      <span class="wen-kai-mono text-lg md:text-xl">總積分：</span>{{ summary
      }}<span class="wen-kai-mono ml-1 text-lg md:text-xl">分</span>
    </h3>
    <div class="mt-4 md:mt-8 w-full flex flex-col justify-center items-center gap-1 lg:px-12 xl:px-28">
      <div
        v-for="department in departmentProgresses"
        :key="department.id"
        class="flex justify-between items-center w-full"
      >
        <h5 class="text-sm md:text-base text-[#d1760f] font-bold wen-kai-mono whitespace-nowrap min-w-20 md:min-w-24">
          {{ department.label }}
        </h5>
        <div class="progress relative w-full h-4.5 bg-[#D97F17]/10 rounded overflow-hidden">
          <div
            class="progress-bar absolute left-0.5 top-1/2 -translate-y-1/2 h-3 bg-gradient-to-bl from-[#f47d0d]/60 to-[#D97F17] rounded-xs"
            :style="{ width: `${(department.point / goal) * 100}%` }"
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
