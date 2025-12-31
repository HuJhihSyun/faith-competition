<script setup lang="ts">
  import { useVModel } from '@vueuse/core'
  import ChevronSvg from '@/assets/images/chevron-down.svg?skipsvgo'

  enum CHURCH {
    VICTORY = 1, // 主勝利
    SHIN_YONG = 2, // 信榮
    YONG_MING = 3, // 永明
    YI_LAN_WORDS = 4, // 宜蘭主話語
    LORD_LOVE = 5, // 主愛
    LORD_MING = 6, // 主大明
    FAITH_LORD = 7, // 信主
    LOVE_AND_WORD = 8, // 愛與話語
    TAIPEI_WORDS = 9, // 台北主話語
    HEAVEN_RESIDENTS = 10, // 天民
    LORD_HOPE_LIGHT = 11, // 主盼望光
    LORD_HAPPINESS = 12, // 主幸福
    LORD_PEACE_LIGHT = 13, // 主和睦光
    HOLY_SPIRIT = 14, // 聖靈
    LORD_LIFE = 15, // 主生命
    LORD_EXPECTATION = 16, // 主盼望
    LORD_ROCK = 17, // 主磐石
    LORD_YONG = 18, // 主大永
    PRACTICE = 19 // 實踐
  }

  type ChurchType = {
    id: number
    name: string
  }

  const Church: ChurchType[] = [
    { id: CHURCH.VICTORY, name: '主勝利' },
    { id: CHURCH.SHIN_YONG, name: '信榮' },
    { id: CHURCH.YONG_MING, name: '永明' },
    { id: CHURCH.YI_LAN_WORDS, name: '宜蘭主話語' },
    { id: CHURCH.LORD_LOVE, name: '主愛' },
    { id: CHURCH.LORD_MING, name: '主大明' },
    { id: CHURCH.FAITH_LORD, name: '信主' },
    { id: CHURCH.LOVE_AND_WORD, name: '愛與話語' },
    { id: CHURCH.TAIPEI_WORDS, name: '台北主話語' },
    { id: CHURCH.HEAVEN_RESIDENTS, name: '天民' },
    { id: CHURCH.LORD_HOPE_LIGHT, name: '主盼望光' },
    { id: CHURCH.LORD_HAPPINESS, name: '主幸福' },
    { id: CHURCH.LORD_PEACE_LIGHT, name: '主和睦光' },
    { id: CHURCH.HOLY_SPIRIT, name: '聖靈' },
    { id: CHURCH.LORD_LIFE, name: '主生命' },
    { id: CHURCH.LORD_EXPECTATION, name: '主盼望' },
    { id: CHURCH.LORD_ROCK, name: '主磐石' },
    { id: CHURCH.LORD_YONG, name: '主大永' },
    { id: CHURCH.PRACTICE, name: '實踐' }
  ]

  interface ChurchSelectProps {
    modelValue: number
  }

  interface ChurchSelectEmits {
    (event: 'update:modelValue', value: ChurchSelectProps['modelValue']): void
  }

  const props = withDefaults(defineProps<ChurchSelectProps>(), {
    modelValue: 0
  })

  const emit = defineEmits<ChurchSelectEmits>()
  const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <div class="relative w-full">
    <select
      name="church"
      id="church"
      v-model="modelValue"
      class="relative flex w-full mx-auto px-5 py-3 appearance-none overflow-hidden rounded-md backdrop-blur-md border border-b-2 border-r-2 border-white input-shadow text-center text-white text-shadow wen-kai-mono font-bold tracking-wide align-middle outline-0 transition-all duration-300 leading-[1.3]"
      placeholder="請選擇部門"
    >
      <option :value="0" disabled selected>請選擇教會</option>
      <option v-for="item in Church" :key="item.id" :value="item.id">{{ item.name }}</option>
    </select>
    <ChevronSvg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white text-shadow pointer-events-none" />
  </div>
</template>
