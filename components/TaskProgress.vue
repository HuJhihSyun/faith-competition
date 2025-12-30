<script setup>
  const props = defineProps({
    summary: {
      type: Number,
      default: 0
    },
    point: {
      type: Number,
      default: 0
    },
    times: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      default: ''
    }
  })

  const percentage = computed(() => {
    return Math.floor((props.point / props.summary) * 100) || 0
  })

  const floorPoint = computed(() => {
    return Math.floor(props.point)
  })
</script>

<template>
  <div
    class="relative flex justify-between items-center w-full mx-auto rounded-sm px-2 sm:px-3 py-2 overflow-hidden border border-b-2 border-r-3 border-white input-shadow backdrop-blur-xs transition-all duration-300"
  >
    <div class="w-full flex flex-col items-center justify-center">
      <div class="w-full flex justify-between items-center">
        <h4
          class="flex justify-center items-center text-xs md:text-sm text-white text-shadow whitespace-nowrap tracking-tight"
        >
          <slot name="icon"></slot>
          <slot name="title"></slot>
          {{ times }} {{ id === 'pray' ? '分' : '次' }}
        </h4>
        <h5 class="text-xs md:text-sm text-white text-shadow tracking-tighter">
          <span class="hidden md:inline-block whitespace-nowrap">累積：</span>{{ floorPoint }} 分
        </h5>
      </div>
      <div class="flex justify-center items-center w-full mt-0.5 md:mt-1">
        <div
          class="progress relative w-full h-3.5 border border-b-2 border-r-3 border-white input-shadow rounded-xs overflow-hidden"
        >
          <div
            class="progress-bar absolute left-0.5 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-bl from-yellow-200 to-white input-shadow"
            :style="{ width: `${percentage}%` }"
          ></div>
        </div>
        <h6 class="ml-2 text-xs md:text-sm text-white text-shadow whitespace-nowrap">{{ percentage }}%</h6>
      </div>
    </div>
  </div>
</template>
