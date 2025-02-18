<script setup>
  const props = defineProps({
    percentage: {
      type: Number,
      default: 0
    }
  })

  const borderColor = computed(() => {
    if (props.percentage < 15) {
      return 'border-cyan-200'
    } else if (props.percentage < 30) {
      return 'border-teal-200'
    } else if (props.percentage < 45) {
      return 'border-emerald-100'
    } else if (props.percentage < 60) {
      return 'border-green-200'
    } else if (props.percentage < 75) {
      return 'border-lime-100'
    } else if (props.percentage < 90) {
      return 'border-yellow-100'
    } else if (props.percentage >= 90) {
      return 'border-yellow-200'
    } else {
      return 'border-white'
    }
  })

  const shadowColor = computed(() => {
    if (props.percentage < 15) {
      return 'shadow-cyan-200'
    } else if (props.percentage < 30) {
      return 'shadow-teal-200'
    } else if (props.percentage < 45) {
      return 'shadow-emerald-200'
    } else if (props.percentage < 60) {
      return 'shadow-green-200'
    } else if (props.percentage < 75) {
      return 'shadow-lime-300'
    } else if (props.percentage < 90) {
      return 'shadow-yellow-300'
    } else if (props.percentage >= 90) {
      return 'shadow-yellow-400'
    } else {
      return 'shadow-white'
    }
  })

  const waterColor = computed(() => {
    if (props.percentage < 15) {
      return 'bg-cyan-300/90'
    } else if (props.percentage < 30) {
      return 'bg-teal-300/90'
    } else if (props.percentage < 45) {
      return 'bg-emerald-300/90'
    } else if (props.percentage < 60) {
      return 'bg-green-300'
    } else if (props.percentage < 75) {
      return 'bg-lime-300'
    } else if (props.percentage < 90) {
      return 'bg-yellow-300/90'
    } else if (props.percentage >= 90) {
      return 'bg-yellow-300'
    } else {
      return 'bg-white'
    }
  })

  const waterShadowColor = computed(() => {
    if (props.percentage < 15) {
      return 'shadow-cyan-400'
    } else if (props.percentage < 30) {
      return 'shadow-teal-400'
    } else if (props.percentage < 45) {
      return 'shadow-emerald-400'
    } else if (props.percentage < 60) {
      return 'shadow-green-400'
    } else if (props.percentage < 75) {
      return 'shadow-lime-400'
    } else if (props.percentage < 90) {
      return 'shadow-yellow-400'
    } else if (props.percentage >= 90) {
      return 'shadow-orange-400'
    } else {
      return 'shadow-white'
    }
  })

  const textColor = computed(() => {
    if (props.percentage < 15) {
      return 'bg-gradient-to-b from-cyan-300 to-white inline-block text-transparent bg-clip-text'
    } else if (props.percentage < 30) {
      return 'bg-gradient-to-b from-teal-300 to-white inline-block text-transparent bg-clip-text'
    } else if (props.percentage < 45) {
      return 'bg-gradient-to-b from-emerald-300 to-white inline-block text-transparent bg-clip-text'
    } else if (props.percentage < 60) {
      return 'bg-gradient-to-b from-green-300 to-white inline-block text-transparent bg-clip-text'
    } else if (props.percentage < 75) {
      return 'bg-gradient-to-b from-lime-200 to-white inline-block text-transparent bg-clip-text'
    } else if (props.percentage < 90) {
      return 'bg-gradient-to-b from-yellow-100 to-white inline-block text-transparent bg-clip-text'
    } else if (props.percentage >= 90) {
      return 'bg-gradient-to-b from-yellow-100 to-white inline-block text-transparent bg-clip-text'
    } else {
      return 'text-white'
    }
  })
</script>

<template>
  <div>
    <div
      class="progress relative rounded-full w-[250px] h-[250px] border-4 shadow-[0_0_15px_rgba(0,0,0,0.25)] transition-all duration-1000 ease-in-out"
      :class="[borderColor, shadowColor]"
    >
      <div
        class="absolute left-1/2 top-1/2 -translate-1/2 overflow-hidden z-30 rounded-full w-[calc(100%-6px)] h-[calc(100%-6px)] border-4 border-transparent transition-all duration-1000 ease-in-out"
      >
        <div
          class="absolute top-0 left-0 w-full h-full font-bold text-center leading-[240px] text-8xl drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-1000 ease-in-out z-50"
          :class="textColor"
        >
          <span class="tracking-tighter">{{ percentage }}</span
          ><span class="text-5xl ml-2">%</span>
        </div>
        <div
          class="water animate-spin absolute z-20 w-[200%] h-[200%] -left-1/2 transition-all duration-1000 ease-in-out shadow-[0_0_5px_rgba(0,0,0,0.25)]"
          :class="[waterColor, waterShadowColor]"
          :style="{ top: 100 - percentage + '%' }"
        ></div>
        <div
          class="absolute bg-black/10 -top-[120%] -left-[120%] z-30 w-[200%] h-[200%] rotate-45 rounded-full transition-all duration-1000 ease-in-out"
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
