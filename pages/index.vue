<script setup lang="ts">
  import { ref } from 'vue'
  import MaleSvg from '@/assets/images/male.svg?skipsvgo'
  import FemaleSvg from '@/assets/images/female.svg?skipsvgo'

  const gender = ref<Boolean>(false)

  type UserInformation = {
    name: string
    department: number
    gender: boolean
  }

  const userInformation = reactive<UserInformation>({
    name: '',
    department: 0,
    gender: false
  })

  // 錯誤提示
  const isNameFalse = ref<boolean>(false)
  const isDepartmentFalse = ref<boolean>(false)

  // 當前步驟
  const currentStep = ref<number>(0)

  const joinEvent = () => {
    if (!userInformation.name || !userInformation.department) {
      if (!userInformation.name) {
        isNameFalse.value = true

        setTimeout(() => {
          isNameFalse.value = false
        }, 500)
      }
      if (!userInformation.department) {
        isDepartmentFalse.value = true

        setTimeout(() => {
          isDepartmentFalse.value = false
        }, 500)
      }
      return
    }

    currentStep.value += 1
  }
</script>

<template>
  <div>
    <template v-if="!currentStep">
      <h2 class="text-white text-xl text-center mb-2 sacramento">2025</h2>
      <img src="@/assets/images/love-word.png" alt="love-word" class="w-50 md:w-60 mx-auto mb-4" />
      <h1
        class="text-white text-3xl sm:text-4xl md:text-5xl text-center mb-10 wen-kai-mono title py-6 px-10 whitespace-nowrap"
      >
        傳道 <span>777</span> 榮耀神
      </h1>
      <div class="flex flex-col items-center space-y-4 max-w-[400px] mx-auto">
        <InputText :class="{ 'bg-red-400/80': isNameFalse }" v-model="userInformation.name" />
        <DepartmentSelect :class="{ 'bg-red-400/80': isDepartmentFalse }" v-model="userInformation.department" />
        <ToggleSwitch v-model="userInformation.gender">
          <template #left-text> <FemaleSvg class="w-4 h-4" />姐妹 </template>
          <template #right-text> <MaleSvg class="w-4 h-4" />弟兄 </template>
        </ToggleSwitch>
      </div>
      <div class="flex justify-center items-center mt-8">
        <Button :fn="joinEvent" :shadow="true">參加積分</Button>
      </div>
    </template>
    <template v-else>
      <h3
        class="text-white text-2xl sm:text-3xl md:text-4xl text-center mb-10 wen-kai-mono py-6 px-10 whitespace-nowrap"
      >
        做了什麼？
      </h3>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .title {
    text-align: center;
    -webkit-filter: contrast(2);
    background: linear-gradient(
      90deg,
      rgba(#42e8e0, 0) 0%,
      rgba(#42e8e0, 0.2) 45%,
      rgba(#42e8e0, 0.2) 55%,
      rgba(#42e8e0, 0) 100%
    );
  }
</style>
