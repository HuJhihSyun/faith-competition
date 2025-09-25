<script setup lang="ts">
  interface InputTextProps {
    name: string
    department: string | number
    gender: boolean
    taskType: string
  }

  withDefaults(defineProps<InputTextProps>(), {
    name: '',
    department: '',
    gender: false,
    taskType: ''
  })

  const taskTypeMap: Record<string, string> = {
    morning: '晨更',
    bible: '讀經',
    praise: '讚美',
    pray: '禱告',
    contact: '連結',
    lesson: '聽課',
    presentation: '講義'
  }
</script>

<template>
  <div
    class="relative w-full border border-b-2 border-r-2 border-[#D97F17] py-4 px-5 rounded before:content-[''] before:w-full before:h-full before:bg-[#D97F17]/10 hover:before:bg-[#D97F17]/15 before:absolute before:top-0 before:-translate-y-[5px] before:left-0 before:-translate-x-[5px] before:rounded before:-z-10"
  >
    <div class="flex justify-between items-center">
      <div class="flex justify-center items-center gap-2">
        <h4 class="text-base text-[#d1760f] font-bold wen-kai-mono">
          {{ name }}
          <span class="text-sm text-[#d1760f]/90 font-normal wen-kai-mono">{{ gender ? '弟兄' : '姐妹' }}</span>
        </h4>
        <h6 class="text-xs sm:text-sm text-[#d1760f] wen-kai-mono">({{ department }})</h6>
      </div>
      <h6 class="text-xs sm:text-sm text-[#d1760f] wen-kai-mono"><span>項目：</span>{{ taskTypeMap[taskType] }}</h6>
    </div>
  </div>
</template>
