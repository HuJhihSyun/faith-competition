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
    class="relative max-h-12 flex w-full mx-auto rounded-full px-5 py-3 overflow-hidden bg-gradient-to-t from-sky-700/50 to-sky-800/50 transition-all duration-300"
  >
    <input
      v-model="modelValue"
      class="text-center grow tracking-wide align-middle placeholder:text-sky-100 text-sky-100 border-none outline-0"
      type="text"
      :placeholder="notice"
    />
    <button
      v-if="buttonName"
      class="absolute right-2 top-1/2 -translate-y-1/2 h-9 text-sm md:text-base px-4 md:px-6 py-2 flex justify-center items-center bg-gradient-to-t from-white to-sky-200 hover:from-sky-100 hover:to-sky-300 active:from-sky-200 active:to-sky-400 text-sky-700 active:text-sky-900 rounded-full cursor-pointer"
      @click="fn"
    >
      {{ buttonName }}
    </button>
  </div>
</template>
