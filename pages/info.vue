<script setup lang="ts">
  import { useLineApi } from '@/composables/useLineApi'

  useSeoMeta({
    title: '光輝十月 | 查詢成績',
    author: '© 2025 Love and Word Church All rights reserved.',
    keywords: '教會,傳道,空提,信仰,榮耀神',
    description:
      '攝理人尊稱為「老師」的鄭明析牧師，領受了神交付的使命，帶著二十一年當中在山上修道磨練而向主學習來的時代福音，就在那一天，在神指定的地點，呼喊起新時代話語，宣告了成約攝理歷史的開始。',
    ogTitle: '光輝十月 | 查詢成績',
    ogDescription:
      '攝理人尊稱為「老師」的鄭明析牧師，領受了神交付的使命，帶著二十一年當中在山上修道磨練而向主學習來的時代福音，就在那一天，在神指定的地點，呼喊起新時代話語，宣告了成約攝理歷史的開始。',
    ogUrl: 'https://www.loveandword.tw/',
    ogImage: 'images/evangelism-cover.jpg'
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
    department: string
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
    <h3 class="text-[#D97F17] text-2xl md:text-3xl text-center mb-5 wen-kai-mono whitespace-nowrap">查詢成績</h3>
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
      class="flex flex-col items-center max-w-[500px] mt-6 pt-2 px-2 border border-b-2 border-r-2 border-[#D97F17] backdrop-blur-xs rounded-md max-h-[70vh] overflow-y-auto mx-auto"
    >
      <template v-for="item in informationCardArray" :key="item.id">
        <InformationCard
          class="mb-2"
          :name="item.name"
          :department="item.department"
          :gender="item.gender"
          :score="item.score"
        />
      </template>
    </main>
    <h6 v-if="!informationCardArray.length && showAlert" class="text-center text-[#d1760f] wen-kai-mono mt-6">
      未查詢到名稱為 {{ searchName }} 的成績
    </h6>
  </div>
</template>

<style scoped></style>
