<script setup>
  const props = defineProps({
    percentage: {
      type: Number,
      default: 0
    }
  })

  const borderColor = computed(() => {
    if (props.percentage < 35) {
      return 'border-yellow-500'
    } else if (props.percentage < 75) {
      return 'border-amber-500'
    } else if (props.percentage >= 75) {
      return 'border-orange-500'
    } else {
      return 'border-[#d1760f]'
    }
  })

  const shadowColor = computed(() => {
    if (props.percentage < 35) {
      return 'shadow-yellow-500'
    } else if (props.percentage < 75) {
      return 'shadow-amber-500'
    } else if (props.percentage >= 75) {
      return 'shadow-orange-400'
    } else {
      return 'shadow-[#d1760f]'
    }
  })

  const waterColor = computed(() => {
    if (props.percentage < 35) {
      return 'bg-yellow-500/80'
    } else if (props.percentage < 75) {
      return 'bg-amber-500/80'
    } else if (props.percentage >= 75) {
      return 'bg-orange-400'
    } else {
      return 'bg-[#d1760f]/80'
    }
  })

  const waterShadowColor = computed(() => {
    if (props.percentage < 35) {
      return 'shadow-yellow-500'
    } else if (props.percentage < 75) {
      return 'shadow-amber-500'
    } else if (props.percentage >= 75) {
      return 'shadow-orange-400'
    } else {
      return 'shadow-[#d1760f]'
    }
  })

  const textColor = computed(() => {
    if (props.percentage < 35) {
      return 'bg-gradient-to-b from-yellow-500 to-yellow-100 inline-block text-transparent bg-clip-text'
    } else if (props.percentage < 75) {
      return 'bg-gradient-to-b from-amber-400 to-amber-100 inline-block text-transparent bg-clip-text'
    } else if (props.percentage >= 75) {
      return 'bg-gradient-to-b from-orange-300 to-orange-100 inline-block text-transparent bg-clip-text'
    } else {
      return 'text-[#d1760f]'
    }
  })
</script>

<template>
  <div>
    <div
      class="progress relative rounded-full w-[250px] h-[250px] border-4 shadow-[0_0_2px_rgba(0,0,0,0.2)] transition-all duration-1000 ease-in-out"
      :class="[borderColor, shadowColor]"
    >
      <div
        class="absolute left-1/2 top-1/2 -translate-1/2 overflow-hidden z-30 rounded-full w-[calc(100%-6px)] h-[calc(100%-6px)] border-4 border-transparent transition-all duration-1000 ease-in-out"
      >
        <div
          class="absolute top-0 left-0 w-full h-full font-bold text-center leading-[240px] text-8xl drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-1000 ease-in-out z-50"
          :class="textColor"
        >
          <span
            class="montserrat"
            :class="{ 'tracking-tighter': percentage < 100, 'tracking-[-5px]': percentage >= 100 }"
            >{{ percentage }}</span
          ><span class="montserrat text-5xl ml-2">%</span>
        </div>
        <div
          class="water animate-spin absolute z-20 w-[200%] h-[200%] -left-1/2 transition-all duration-1000 ease-in-out shadow-[0_0_2px_rgba(0,0,0,0.2)]"
          :class="[waterColor, waterShadowColor]"
          :style="{ top: 100 - percentage + '%' }"
        ></div>
        <div
          class="absolute bg-black/5 -top-[120%] -left-[120%] z-30 w-[200%] h-[200%] rotate-45 rounded-full transition-all duration-1000 ease-in-out"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .progress {
    .water {
      border-radius: 40%;
      -webkit-animation-duration: 10s;
      animation-duration: 10s;
    }
  }
</style>
