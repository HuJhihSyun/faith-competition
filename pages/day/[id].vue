<script setup lang="ts">
  import ContactSvg from '@/assets/images/contact-round.svg?skipsvgo'
  import PresentationSvg from '@/assets/images/presentation.svg?skipsvgo'
  import LessonSvg from '@/assets/images/book-open-check.svg?skipsvgo'
  import MeetingSvg from '@/assets/images/handshake.svg?skipsvgo'
  import PraySvg from '@/assets/images/message-circle-heart.svg?skipsvgo'
  import SunMoonSvg from '@/assets/images/sun-moon.svg?skipsvgo'
  import BookOpenSvg from '@/assets/images/book-open.svg?skipsvgo'
  import MusicSvg from '@/assets/images/music.svg?skipsvgo'
  import DumbbellSvg from '@/assets/images/dumbbell.svg?skipsvgo'
  import AwardSvg from '@/assets/images/award.svg?skipsvgo'
  import ChevronLeftSvg from '@/assets/images/chevron-left.svg?skipsvgo'
  import ChevronRightSvg from '@/assets/images/chevron-right.svg?skipsvgo'

  const route = useRoute()
  const router = useRouter()
  const dayId = route.params.id

  const now = ref<Date>(new Date())
  const today = ref<number>(now.value.getDate())
  const disabled = ref<boolean>(today.value !== Number(dayId))

  useSeoMeta({
    title: `無限榮耀神 | 2025年10月${dayId}日`,
    author: '© 2025 Love and Word Church All rights reserved.',
    keywords: '教會,傳道,空提,信仰,榮耀神',
    description:
      '神說：「我是阿拉法，我是俄梅戛，是昔在、今在、以後永在的全能者。」講到阿拉法，主角就是神。而攝理，廣義來說，就是神的歷史，在舊約時代，神展開舊約層級的攝理歷史；在新約時代，神展開新約層級的攝理歷史；在現今，神則展開完成級的成約攝理歷史。如此，若要講到攝理的起點，其實就等於是在講神的起點。然而，神昔在、今在、永在，這起點，實在沒辦法說是哪一天，真要說，也只能說，那就是「初」。',
    ogTitle: `無限榮耀神 | 2025年10月${dayId}日`,
    ogDescription:
      '神說：「我是阿拉法，我是俄梅戛，是昔在、今在、以後永在的全能者。」講到阿拉法，主角就是神。而攝理，廣義來說，就是神的歷史，在舊約時代，神展開舊約層級的攝理歷史；在新約時代，神展開新約層級的攝理歷史；在現今，神則展開完成級的成約攝理歷史。如此，若要講到攝理的起點，其實就等於是在講神的起點。然而，神昔在、今在、永在，這起點，實在沒辦法說是哪一天，真要說，也只能說，那就是「初」。',
    ogUrl: 'https://www.loveandword.tw/',
    ogImage: 'images/evangelism-cover.jpg'
  })

  type TaskOptions = {
    title: string
    id: string
    subtitle: string
    icon: Component
    isChecked: boolean
    quantity?: number | undefined | null
    unit?: string
  }

  const basicTaskOptions = reactive<TaskOptions[]>([
    {
      title: '晨更',
      id: 'morning',
      subtitle: '1次3分',
      icon: markRaw(SunMoonSvg),
      isChecked: false
    },
    {
      title: '讀經',
      id: 'bible',
      subtitle: '4章2分',
      icon: markRaw(BookOpenSvg),
      isChecked: false
    },
    {
      title: '讚美',
      id: 'praise',
      subtitle: '2首1分',
      icon: markRaw(MusicSvg),
      isChecked: false
    },
    {
      title: '禱告',
      id: 'pray',
      subtitle: '5分鐘1分',
      icon: markRaw(PraySvg),
      isChecked: false,
      unit: '10分鐘'
    }
  ])

  const gospelTaskOptions = reactive<TaskOptions[]>([
    {
      title: '連結',
      id: 'contact',
      subtitle: '1人1分',
      icon: markRaw(ContactSvg),
      isChecked: false,
      quantity: 0,
      unit: '人'
    },
    {
      title: '聽課',
      id: 'lesson',
      subtitle: '1次1分',
      icon: markRaw(LessonSvg),
      isChecked: false,
      quantity: 0,
      unit: '次'
    },
    {
      title: '講義',
      id: 'presentation',
      subtitle: '1次1分',
      icon: markRaw(PresentationSvg),
      isChecked: false,
      quantity: 0,
      unit: '次'
    }
  ])

  // TODO: props isFocused
  const isFocused = ref<boolean>(false)

  const saveData = () => {
    // TODO: Save data logic here
  }

  const goYesterday = () => {
    if (Number(dayId) <= 1) return
    router.push(`/day/${Number(dayId) - 1}`)
  }

  const goTomorrow = () => {
    if (Number(dayId) >= 31 || Number(dayId) >= today.value) return
    router.push(`/day/${Number(dayId) + 1}`)
  }
</script>

<template>
  <div>
    <Subtitle>
      <template #title>無限榮耀神</template>
      <template #subtitle>
        <span class="montserrat">2025</span>年<span class="montserrat">10</span>月<span class="montserrat">{{
          dayId
        }}</span
        >日
      </template>
    </Subtitle>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 mx-auto">
      <section>
        <h3 class="relative text-[#D97F17] font-bold text-xl md:text-2xl wen-kai-mono mb-2 md:mb-4 tracking-widest">
          基本信仰
        </h3>
        <div class="flex flex-col gap-3 md:gap-4">
          <div
            v-for="taskOption in basicTaskOptions"
            :key="taskOption.id"
            class="w-full flex justify-start items-center gap-2 tracking-wider"
          >
            <BasicCheckbox class="w-5 h-5" v-model="taskOption.isChecked" :disabled="disabled" />
            <div class="text-[#d1760f]">
              <component :is="taskOption.icon" class="w-5 h-5" />
            </div>
            <h4 class="text-base md:text-lg wen-kai-mono text-[#d1760f] font-bold">
              <span>{{ taskOption.title }}</span>
              <input
                v-if="taskOption.quantity !== null && taskOption.quantity !== undefined"
                :ref="`${taskOption.id}inputRef`"
                v-model="taskOption.quantity"
                type="text"
                class="w-10 lg:w-12 px-1 lg:px-2 py-0.5 mx-2 text-sm text-[#d1760f] montserrat border border-[#D97F17] outline-0 focus:border-b-2 focus:border-r-2 rounded text-center"
                :class="{
                  'border-red-500 text-red-500': isFocused && !disabled,
                  'pointer-events-none bg-[#d1760f]/10 text-[#d1760f]/50': disabled
                }"
              />
              <span class="text-sm wen-kai-mono text-[#d1760f]">{{ taskOption.unit }}</span>
            </h4>
            <!-- <h5 class="text-sm wen-kai-mono text-[#d1760f]">({{ taskOption.subtitle }})</h5> -->
          </div>
        </div>
      </section>
      <section>
        <h3 class="relative text-[#D97F17] font-bold text-xl md:text-2xl wen-kai-mono mb-2 md:mb-4 tracking-widest">
          傳道管理
        </h3>
        <div class="flex flex-col gap-3 md:gap-4">
          <div
            v-for="taskOption in gospelTaskOptions"
            :key="taskOption.id"
            class="w-full flex justify-start items-center gap-2 tracking-wider"
          >
            <BasicCheckbox class="w-5 h-5" v-model="taskOption.isChecked" :disabled="disabled" />
            <div class="text-[#d1760f]">
              <component :is="taskOption.icon" class="w-5 h-5" />
            </div>
            <h4 class="text-base md:text-lg wen-kai-mono text-[#d1760f] font-bold">
              <span>{{ taskOption.title }}</span>
              <input
                v-if="taskOption.quantity !== null && taskOption.quantity !== undefined"
                :ref="`${taskOption.id}inputRef`"
                v-model="taskOption.quantity"
                type="text"
                class="w-10 lg:w-12 px-1 lg:px-2 py-0.5 mx-2 text-sm text-[#d1760f] montserrat border border-[#D97F17] outline-0 focus:border-b-2 focus:border-r-2 rounded text-center"
                :class="{
                  'border-red-500 text-red-500': isFocused && !disabled,
                  'pointer-events-none bg-[#d1760f]/10 text-[#d1760f]/50': disabled
                }"
              />
              <span class="text-sm wen-kai-mono text-[#d1760f]">{{ taskOption.unit }}</span>
            </h4>
            <!-- <h5 class="text-sm wen-kai-mono text-[#d1760f]">({{ taskOption.subtitle }})</h5> -->
          </div>
        </div>
      </section>
    </div>
    <div class="flex justify-between items-center mt-8">
      <button
        @click="goYesterday"
        class="flex items-center py-1 px-1 md:px-2 rounded text-[#d1760f] bg-[#d1760f]/10 hover:bg-[#d1760f] hover:text-white transition-all duration-100 cursor-pointer"
        :class="{ 'opacity-50 pointer-events-none': Number(dayId) <= 1 }"
      >
        <ChevronLeftSvg class="w-4 h-4" />
        <span class="hidden md:block text-xs wen-kai-mono whitespace-nowrap">昨日</span>
      </button>
      <Button :fn="saveData">儲存</Button>
      <button
        @click="goTomorrow"
        class="flex items-center py-1 px-1 md:px-2 rounded text-[#d1760f] bg-[#d1760f]/10 hover:bg-[#d1760f] hover:text-white transition-all duration-100 cursor-pointer"
        :class="{ 'opacity-50 pointer-events-none': Number(dayId) >= 31 || Number(dayId) >= today }"
      >
        <span class="hidden md:block text-xs wen-kai-mono whitespace-nowrap">明日</span>
        <ChevronRightSvg class="w-4 h-4" />
      </button>
    </div>
    <aside class="mt-8 py-2 px-4 border border-b-2 border-r-2 border-[#d1760f] rounded-lg">
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
</template>
