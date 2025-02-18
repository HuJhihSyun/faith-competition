<script setup lang="ts">
  useSeoMeta({
    title: '2025 傳道777榮耀神',
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

  const searchName = ref<string>('')

  onMounted(() => {
    searchName.value = localStorage.getItem('loveWordsEventUserInfo')
      ? JSON.parse(localStorage.getItem('loveWordsEventUserInfo') as string).name
      : ''
  })

  const isNameFalse = ref<boolean>(false)

  const searchSubmit = () => {
    if (!searchName.value) {
      isNameFalse.value = true

      setTimeout(() => {
        isNameFalse.value = false
      }, 500)
      return
    }

    console.log('searchName:', searchName.value)
  }

  type InformationCard = {
    id: string
    name: string
    department: string
    gender: number
    score: number
  }

  const informationCardArray: InformationCard[] = [
    {
      id: '0002',
      name: 'cj654vmp',
      department: '青年部',
      gender: 1,
      score: 150
    },
    {
      id: '0003',
      name: 'cj654vmp',
      department: 'Campus',
      gender: 0,
      score: 28
    },
    {
      id: '0004',
      name: 'cj654vmp',
      department: 'Campus',
      gender: 1,
      score: 0
    },
    {
      id: '0019',
      name: 'cj654vmp',
      department: 'Campus',
      gender: 0,
      score: 135
    }
  ]
</script>

<template>
  <div>
    <h3 class="text-white text-xl sm:text-2xl md:text-3xl text-center mb-5 wen-kai-mono whitespace-nowrap">查詢成績</h3>
    <div class="max-w-[500px] mx-auto">
      <InputText
        v-model="searchName"
        :class="{ 'bg-red-400/80': isNameFalse }"
        :notice="'請輸入搜尋名稱'"
        :buttonName="'搜尋'"
        :fn="searchSubmit"
      />
    </div>
    <main
      class="flex flex-col items-center space-y-2 max-w-[500px] mt-6 p-2 bg-gradient-to-t from-sky-700/50 to-sky-800/50 rounded-2xl max-h-[600px] overflow-y-auto mx-auto"
    >
      <template v-for="item in informationCardArray" :key="item.id">
        <InformationCard :name="item.name" :department="item.department" :gender="item.gender" :score="item.score" />
      </template>
    </main>
  </div>
</template>

<style scoped></style>
