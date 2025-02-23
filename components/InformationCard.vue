<script setup lang="ts">
  interface InputTextProps {
    name: string
    department: string
    gender: boolean
    score: number
  }

  const props = withDefaults(defineProps<InputTextProps>(), {
    name: '',
    department: '',
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
</script>

<template>
  <div class="w-full bg-gradient-to-t from-white to-sky-100/90 py-4 px-5 rounded-xl">
    <div class="flex justify-between items-center">
      <h4 class="text-base text-sky-700 font-bold">
        {{ name }}
        <span class="text-sm text-slate-400 font-normal">{{ gender ? '弟兄' : '姐妹' }}</span>
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
      <h6 class="text-xs sm:text-sm text-slate-600">
        <span>所屬部門：</span>
        {{ department }}
      </h6>
      <h6 class="text-xs sm:text-sm text-slate-600">
        <span>累積分數：</span>
        {{ score }}
      </h6>
    </div>
  </div>
</template>
