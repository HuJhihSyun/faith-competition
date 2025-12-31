<script setup lang="ts">
  interface InputTextProps {
    name: string
    church: string
    gender: boolean
    score: number
  }

  const props = withDefaults(defineProps<InputTextProps>(), {
    name: '',
    church: '',
    gender: false,
    score: 0
  })

  const rank = computed(() => {
    const scoreFormat = Math.floor(props.score / 20)
    return scoreFormat > 5 ? 5 : scoreFormat
  })

  const empty = computed(() => {
    return 5 - rank.value
  })

  const formatScore = computed(() => {
    return Math.floor(props.score)
  })
</script>

<template>
  <div
    class="relative w-full border border-b-2 border-r-2 border-[#D97F17] py-4 px-5 rounded before:content-[''] before:w-full before:h-full before:bg-[#D97F17]/10 hover:before:bg-[#D97F17]/15 before:absolute before:top-0 before:-translate-y-[5px] before:left-0 before:-translate-x-[5px] before:rounded before:-z-10"
  >
    <div class="flex justify-between items-center">
      <h4 class="text-base text-[#d1760f] font-bold wen-kai-mono">
        {{ name }}
        <span class="text-sm text-[#d1760f]/90 font-normal wen-kai-mono">{{ gender ? '弟兄' : '姐妹' }}</span>
      </h4>
      <ClientOnly>
        <div class="flex justify-between items-center">
          <img
            v-for="(item, index) in rank"
            :key="index"
            src="@/assets/images/star-solid.png"
            class="w-4 sm:w-5 h-4 sm:h-5"
            alt="star-solid"
          />
          <img
            v-for="(item, index) in empty"
            :key="index"
            src="@/assets/images/star-empty.png"
            class="w-4 sm:w-5 h-4 sm:h-5 invert opacity-50"
            alt="star-empty"
          />
        </div>
      </ClientOnly>
    </div>
    <div class="flex justify-between items-center mt-1">
      <h6 class="text-xs sm:text-sm text-[#d1760f] wen-kai-mono">
        <span>所屬部門：</span>
        {{ church }}
      </h6>
      <h6 class="text-xs sm:text-sm text-[#d1760f] wen-kai-mono">
        <span>累積分數：</span>
        {{ formatScore }}
      </h6>
    </div>
  </div>
</template>
