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

  const route = useRoute()
  const dayId = route.params.id

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
    quantity?: number
  }

  const basicTaskOptions: TaskOptions[] = [
    {
      title: '晨更',
      id: 'morning',
      subtitle: '1 次 4 分',
      icon: markRaw(SunMoonSvg),
      isChecked: false
    },
    {
      title: '讀經',
      id: 'bible',
      subtitle: '4章2分',
      icon: markRaw(BookOpenSvg),
      isChecked: false,
      quantity: 0
    },
    {
      title: '讚美',
      id: 'praise',
      subtitle: '2首1分',
      icon: markRaw(MusicSvg),
      isChecked: false,
      quantity: 0
    },
    {
      title: '運動',
      id: 'exercise',
      subtitle: '30分鐘1分',
      icon: markRaw(DumbbellSvg),
      isChecked: false,
      quantity: 0
    },
    {
      title: '禱告',
      id: 'pray',
      subtitle: '10分鐘1分',
      icon: markRaw(PraySvg),
      isChecked: false,
      quantity: 0
    }
  ]

  const gospelTaskOptions: TaskOptions[] = [
    {
      title: '連結',
      id: 'contact',
      subtitle: '1人1分',
      icon: markRaw(ContactSvg),
      isChecked: false,
      quantity: 0
    },
    {
      title: '聽課',
      id: 'lesson',
      subtitle: '1次1分',
      icon: markRaw(LessonSvg),
      isChecked: false,
      quantity: 0
    },
    {
      title: '講義',
      id: 'presentation',
      subtitle: '1次1分',
      icon: markRaw(PresentationSvg),
      isChecked: false,
      quantity: 0
    },
    {
      title: '感謝老師',
      id: 'appreciate',
      subtitle: '1日1分',
      icon: markRaw(MeetingSvg),
      isChecked: false
    }
  ]
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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto"></div>
  </div>
</template>
