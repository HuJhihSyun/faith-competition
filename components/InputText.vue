<script setup lang="ts">
  import { useVModel } from '@vueuse/core'

  interface InputTextProps {
    modelValue: string
    notice?: string
    buttonName?: string
    fn?: () => void
  }

  interface InputTextEmits {
    (event: 'update:modelValue', value: InputTextProps['modelValue']): void
  }

  const props = withDefaults(defineProps<InputTextProps>(), {
    modelValue: '',
    notice: '請輸入您的暱稱',
    hasButton: '',
    fn: () => {}
  })

  const emit = defineEmits<InputTextEmits>()

  const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <div
    class="relative max-h-12 flex w-full mx-auto px-5 py-3 overflow-hidden border backdrop-blur-md rounded-md border-b-2 border-r-2 border-white input-shadow transition-all duration-300"
  >
    <input
      v-model="modelValue"
      class="text-center grow tracking-wide align-middle placeholder:text-orange-100 text-white text-shadow wen-kai-mono font-bold border-none outline-0"
      type="text"
      :placeholder="notice"
    />
    <button
      v-if="buttonName"
      class="absolute right-1 top-1/2 -translate-y-1/2 h-9 text-sm md:text-base px-4 md:px-6 py-2 flex justify-center items-center bg-gradient-to-br from-white/10 to-white/50 hover:from-white/30 hover:to-white/70 active:from-white/50 active:to-white/80 text-white hover:text-amber-100 rounded cursor-pointer wen-kai-mono"
      @click="fn"
    >
      {{ buttonName }}
    </button>
  </div>
</template>
