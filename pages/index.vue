<script setup lang="ts">
  import ChevronSvg from '@/assets/images/chevron-down.svg?skipsvgo'
  import AwardSvg from '@/assets/images/award.svg?skipsvgo'
  import { useAuthStore } from '@/stores/auth'

  const { getAllTaskScores } = useLineApi()
  const authStore = useAuthStore()
  const router = useRouter()

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

  const headerTextArray = ref<string[]>(['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'])

  type DayInfo = {
    label: number
    totalScore: number
  }

  const dayInfoArray = ref<DayInfo[]>(
    Array.from({ length: 31 }, (_, i) => ({
      label: i + 1,
      totalScore: 0
    }))
  )

  const now = ref<Date>(new Date())
  const today = ref<number>(now.value.getDate())
  const thisWeek = ref<number>(Math.ceil((today.value + 3) / 7))
  const selectedWeek = ref<number>(Math.ceil((today.value + 3) / 7))

  const routeToPage = (day: number) => {
    router.push(`/day/${day}`)
  }

  onMounted(async () => {
    if (!authStore.userInformation.id) return
    await getAllScores(authStore.userInformation.id)
  })

  watch(
    () => authStore.userInformation.id,
    async (newId: string) => {
      if (!newId) return
      await getAllScores(newId)
    }
  )

  const getAllScores = async (id: string) => {
    const allTasks = await getAllTaskScores(id)
    if (!allTasks || !Array.isArray(allTasks)) return

    allTasks.forEach((task: any) => {
      const day = dayInfoArray.value.find((d: { label: any }) => Number(d.label) === Number(task.dayOfMonth))
      if (day) day.totalScore = task.totalScore
    })
  }
</script>

<template>
  <div>
    <h3 class="text-[#D97F17] font-bold text-2xl text-center montserrat">2025</h3>
    <h1
      class="text-[#D97F17] text-3xl sm:text-4xl md:text-5xl text-center wen-kai-mono py-3 lg:py-4 px-10 tracking-wider whitespace-nowrap"
    >
      光輝十月
    </h1>
    <h2
      class="relative text-[#D97F17] font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-center wen-kai-mono mb-4 md:mb-6 before:content-[''] before:w-full before:h-[1px] before:bg-[#D97F17] before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0"
    >
      <span class="inline-block backdrop-blur-sm px-4 md:px-6 tracking-widest">無限榮耀神</span>
    </h2>
    <section class="hidden sm:flex flex-col items-center md:px-10 lg:px-12 xl:px-32 2xl:px-36 mx-auto">
      <header class="w-full">
        <ul class="flex justify-center items-center w-full">
          <li
            v-for="(text, index) in headerTextArray"
            :key="index"
            class="w-full inline-block text-center text-xs text-[#D97F17] montserrat py-2"
          >
            {{ text }}
          </li>
        </ul>
      </header>
      <div class="grid grid-cols-7 gap-1 w-full">
        <div
          v-for="space in 3"
          :key="space"
          class="relative flex flex-col items-center justify-center border border-[#D97F17]/30 text-[#D97F17]/30 h-16 xl:h-20 rounded-md"
        >
          <span class="absolute left-1.5 top-3 text-sm leading-0 montserrat">{{ space + 27 }}</span>
        </div>
        <button
          v-for="day in dayInfoArray"
          :key="day.label"
          class="relative flex flex-col items-center justify-center border border-[#D97F17] text-[#D97F17] h-16 xl:h-20 rounded-md transition-all duration-100"
          :class="[
            { 'bg-[#D97F17] text-white hover:bg-[#d27914]': day.label === today && day.label >= 6 && day.label <= 19 },
            { 'hover:border-b-2 hover:border-r-2 hover:bg-[#D97F17]/10': day.label !== today },
            { 'border-[#D97F17]/30 text-[#D97F17]/30 pointer-events-none': day.label < 6 || day.label > 19 },
            today >= day.label ? 'cursor-pointer' : 'pointer-events-none'
          ]"
          @click="routeToPage(day.label)"
        >
          <span class="absolute left-1.5 top-3 text-sm leading-0 montserrat">{{ day.label }}</span>
          <div
            v-show="today >= day.label && day.label >= 6 && day.label <= 19"
            class="flex flex-col items-center justify-center mt-2"
          >
            <h6 class="text-xs font-bold wen-kai-mono">總分</h6>
            <h5 class="text-base font-bold montserrat">{{ day.totalScore }}</h5>
          </div>
        </button>
        <div
          class="relative flex flex-col items-center justify-center border border-[#D97F17]/30 text-[#D97F17]/30 h-16 xl:h-20 rounded-md"
        >
          <span class="absolute left-1.5 top-3 text-sm leading-0 montserrat">1</span>
        </div>
      </div>
    </section>
    <section class="flex sm:hidden flex-col items-center gap-1 mx-auto">
      <div v-for="week in 2" :key="week" class="w-full">
        <div
          class="mobile-header text-white text-center text-sm w-full py-1 rounded-md wen-kai-mono"
          :class="[
            selectedWeek === week ? 'bg-[#D97F17] pointer-events-none mb-1.5' : 'bg-[#D97F17]/70',
            thisWeek >= week ? 'cursor-pointer hover:bg-[#D97F17]/80' : 'pointer-events-none'
          ]"
          @click="selectedWeek = week"
        >
          <span class="montserrat">10 / {{ week * 6 }} ~ 10 / {{ week * 6 + 7 }}</span>
          <ChevronSvg class="text-white inline-block w-4 h-4 ml-1" :class="selectedWeek === week ? 'rotate-180' : ''" />
        </div>
        <div
          class="flex flex-col items-center justify-center gap-1 overflow-hidden transition-all duration-300"
          :class="selectedWeek === week ? 'max-h-80 mb-0.5' : 'max-h-0'"
        >
          <button
            v-for="(day, index) in dayInfoArray.slice(Math.max(week * 7 - 2, 0), Math.max((week + 1) * 7 - 2, 0))"
            :key="day.label"
            class="mobile-button border border-[#D97F17] text-[#D97F17] text-sm w-full py-1.5 px-3 rounded-md"
            :class="[
              { 'border-b-2 border-r-2 bg-[#D97F17]/10': day.label === today },
              { 'hover:bg-[#D97F17]/10': day.label !== today },
              today >= day.label ? 'cursor-pointer' : 'pointer-events-none'
            ]"
            @click="routeToPage(day.label)"
          >
            <div class="flex items-center justify-between wen-kai-mono montserrat">
              <h5>
                <span class="montserrat">10</span> 月 <span class="montserrat">{{ day.label }}</span> 日
                <span class="montserrat">{{ headerTextArray[(index + 1) % 7] }}</span>
              </h5>
              <h6>總分：{{ today >= day.label ? day.totalScore : '-' }}</h6>
            </div>
          </button>
        </div>
      </div>
    </section>
    <div class="md:px-10 lg:px-12 xl:px-32 2xl:px-36 mx-auto">
      <aside
        class="mt-8 py-2 px-4 border border-b-2 border-r-2 border-[#d1760f] rounded-lg backdrop-blur-xs md:backdrop-blur-none"
      >
        <h5 class="text-[#d1760f] text-base sm:text-lg wen-kai-mono">活動說明</h5>
        <ul class="text-[#d1760f] text-xs sm:text-sm wen-kai-mono my-1">
          <li class="flex items-center">• 活動時間 10／6～10／19</li>
          <li class="flex items-center">• 基本信仰各項每天都完成者可進入抽獎</li>
          <li class="flex items-center">• 傳道.聽課.講義按各自完成次數分別進行抽獎</li>
          <li class="flex items-center">• 每週抽獎一次，各項抽出一人</li>
          <li class="flex items-center">• 可獲得精美手提袋乙個</li>
        </ul>
      </aside>
    </div>
  </div>
</template>
