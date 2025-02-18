<script setup>
  const props = defineProps({
    summary: {
      type: Number,
      default: 0
    },
    point: {
      type: Number,
      default: 0
    }
  })

  const percentage = computed(() => {
    return Math.floor((props.point / props.summary) * 100)
  })
</script>

<template>
  <div
    class="relative flex justify-between items-center w-full mx-auto rounded-lg px-3 py-2 overflow-hidden bg-gradient-to-t from-sky-700/50 to-sky-800/50 transition-all duration-300"
  >
    <div class="w-full flex flex-col items-center justify-center">
      <div class="w-full flex justify-between items-center">
        <h4 class="flex justify-center items-center text-xs md:text-sm text-sky-200">
          <slot name="icon"></slot>
          <slot name="title"></slot>
        </h4>
        <h5 class="text-xs md:text-sm text-sky-200 tracking-tighter">
          <span class="hidden md:inline-block">目前累積：</span>{{ point }} 分
        </h5>
      </div>
      <div class="flex justify-center items-center w-full mt-0.5 md:mt-1">
        <div
          class="progress relative w-full h-2.5 bg-gradient-to-t from-sky-700/50 to-sky-800/50 rounded-2xl overflow-hidden"
        >
          <div
            class="progress-bar absolute left-0.5 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-bl from-yellow-300 to-yellow-600 rounded-2xl"
            :style="{ width: `${percentage}%` }"
          ></div>
        </div>
        <h6 class="ml-2 text-xs md:text-sm text-sky-200 whitespace-nowrap">{{ percentage }}%</h6>
      </div>
    </div>
  </div>
</template>
