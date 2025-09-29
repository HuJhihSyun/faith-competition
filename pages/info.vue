<script setup lang="ts">
  const { getLotteryList, getLottery } = useLineApi()

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

  type InformationCard = {
    id: string
    name: string
    department: string | number
    gender: boolean
    taskType?: string
    type?: string
  }

  enum DEPARTMENT {
    GALAXY = 1,
    SHINING_STAR = 2,
    CAMPUS = 3,
    YOUTH = 4,
    FAMILY = 5,
    OLDER = 6
  }

  type DepartmentType = {
    id: number
    name: string
  }

  const Department: DepartmentType[] = [
    { id: DEPARTMENT.GALAXY, name: '銀河水' },
    { id: DEPARTMENT.SHINING_STAR, name: 'SS' },
    { id: DEPARTMENT.CAMPUS, name: 'Campus' },
    { id: DEPARTMENT.YOUTH, name: '青年部' },
    { id: DEPARTMENT.FAMILY, name: '家庭局' },
    { id: DEPARTMENT.OLDER, name: '長年部' }
  ]

  const informationCardArray = reactive<InformationCard[]>([])

  const fetchLotteryList = async () => {
    const result = (await getLotteryList(1, 19)) as InformationCard[]
    // informationCardArray.push(
    //   ...Object.entries(result)
    //     .map(([_, value]) => value)
    //     .flat()
    //     .map((item) => ({
    //       id: crypto.randomUUID(),
    //       name: item.name,
    //       department: `${Number(item.department) > 0 && Number(item.department) < 4 ? (item.gender ? '弟兄' : '姐妹') : ''}${Department.find((dept) => dept.id === Number(item.department))?.name || '未知部門'}`,
    //       gender: item.gender,
    //       taskType: item.taskType
    //     }))
    // )
    console.log(informationCardArray)
  }

  const fetchLottery = async () => {
    const result = (await getLottery()) as InformationCard[]
    informationCardArray.push(
      ...result.map((item) => ({
        id: crypto.randomUUID(),
        name: item.name,
        department: `${Number(item.department) > 0 && Number(item.department) < 4 ? (item.gender ? '弟兄' : '姐妹') : ''}${Department.find((dept) => dept.id === Number(item.department))?.name || '未知部門'}`,
        gender: item.gender,
        taskType: item.type
      }))
    )
  }

  onMounted(() => {
    fetchLotteryList()
    fetchLottery()
  })
</script>

<template>
  <div>
    <Subtitle>
      <template #title>無限榮耀神</template>
      <template #subtitle>得獎名單查詢</template>
    </Subtitle>
    <main
      class="flex flex-col items-center max-w-[500px] mt-6 pt-2 px-2 border border-b-2 border-r-2 border-[#D97F17] backdrop-blur-xs rounded-md max-h-[70vh] overflow-y-auto mx-auto"
    >
      <template v-if="informationCardArray.length">
        <InformationCard
          v-for="item in informationCardArray"
          :key="item.id"
          class="mb-2"
          :name="item.name"
          :department="item.department"
          :gender="item.gender"
          :taskType="item.taskType"
        />
      </template>
      <template v-else>
        <h6 class="text-center text-[#d1760f] wen-kai-mono my-6">目前尚無任何中獎名單</h6>
      </template>
    </main>
  </div>
</template>

<style scoped></style>
