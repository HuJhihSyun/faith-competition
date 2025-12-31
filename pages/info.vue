<script setup lang="ts">
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

  const searchName = ref<string>('')

  onMounted(() => {
    searchName.value = localStorage.getItem('loveWordsEventUserInfo')
      ? JSON.parse(localStorage.getItem('loveWordsEventUserInfo') as string).name
      : ''

    if (searchName.value) {
      searchUsers()
        .then((res) => {
          const result = JSON.parse(res as string)

          if (Object.keys(result).includes('message')) return

          if (Object.keys(result).includes('data')) {
            informationCardArray.splice(0, informationCardArray.length, ...result.data)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  })

  const isNameFalse = ref<boolean>(false)

  type InformationCard = {
    id: number
    name: string
    church: string
    gender: boolean
    score: number
  }

  const informationCardArray = reactive<InformationCard[]>([])
  const showAlert = ref<boolean>(false)

  // API
  const { getUsers } = useLineApi()

  const searchUsers = async () => {
    const users = await getUsers(searchName.value)
    return users
  }

  const searchSubmit = () => {
    if (!searchName.value) {
      isNameFalse.value = true

      setTimeout(() => {
        isNameFalse.value = false
      }, 500)
      return
    }

    // API
    searchUsers()
      .then((res) => {
        const result = JSON.parse(res as string)

        if (Object.keys(result).includes('message')) {
          informationCardArray.splice(0, informationCardArray.length)
          showAlert.value = true
          return
        } else if (Object.keys(result).includes('data')) {
          informationCardArray.splice(0, informationCardArray.length, ...result.data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  watch(searchName, (newVal: string, oldVal: string) => {
    if (newVal !== oldVal) {
      showAlert.value = false
    }
  })
</script>

<template>
  <div>
    <h3 class="text-white text-shadow text-2xl md:text-3xl text-center mb-5 wen-kai-mono whitespace-nowrap">
      查詢成績
    </h3>
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
      v-if="informationCardArray.length"
      class="flex flex-col items-center max-w-[500px] mt-6 pt-2 px-2 border border-b-2 border-r-2 border-white input-shadow backdrop-blur-xs rounded-md max-h-[70vh] overflow-y-auto mx-auto"
    >
      <InformationCard
        v-for="item in informationCardArray"
        :key="item.id"
        class="mb-2"
        :name="item.name"
        :church="item.church"
        :gender="item.gender"
        :score="item.score"
      />
    </main>
    <h6 v-if="!informationCardArray.length && showAlert" class="text-center text-white text-shadow wen-kai-mono mt-6">
      未查詢到名稱為 {{ searchName }} 的成績
    </h6>
  </div>
</template>

<style scoped></style>
