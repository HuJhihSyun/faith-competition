<script setup lang="ts">
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

  watch(searchName, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      showAlert.value = false
    }
  })
</script>

<template>
  <div>
    <h3
      class="text-gray-500 text-xl sm:text-2xl md:text-3xl text-center pb-5 mb-10 whitespace-nowrap tracking-wider shadow-[0px_15px_20px_-20px_rgba(0,0,0,0.3)]"
    >
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
      class="info-search flex flex-col items-center max-w-[500px] mt-6 pt-2 pl-2 pr-1 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl max-h-[500px] overflow-y-auto mx-auto"
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
    <h6 v-if="!informationCardArray.length && showAlert" class="text-center text-gray-500 mt-6">
      未查詢到名稱為 {{ searchName }} 的成績
    </h6>
  </div>
</template>

<style lang="scss" scoped>
  .info-search {
    box-shadow:
      -4px -4px 8px rgba(#fff, 0.6),
      2px 1px 0px rgba(163, 177, 198, 0.3),
      inset 8px 6px 8px rgba(163, 177, 198, 0.3);
  }
</style>
