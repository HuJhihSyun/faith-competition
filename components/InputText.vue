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
    class="atomic-input relative max-h-12 flex w-full mx-auto rounded-full px-5 py-3 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300/60 transition-all duration-300"
  >
    <input
      v-model="modelValue"
      class="text-center grow tracking-wide align-middle placeholder:text-gray-400 text-gray-500 border-none outline-0"
      type="text"
      :placeholder="notice"
    />
    <button
      v-if="buttonName"
      class="absolute input-button right-1.5 top-1/2 -translate-y-1/2 h-9 text-sm md:text-base px-4 md:px-6 py-2 flex justify-center items-center bg-gradient-to-br from-gray-200 to-gray-200/20 hover:from-gray-100 hover:to-gray-300 active:from-gray-200 active:to-gray-400 text-gray-500 active:text-gray-700 rounded-full cursor-pointer"
      @click="fn"
    >
      {{ buttonName }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
  .atomic-input {
    box-shadow:
      -4px -4px 8px rgba(#fff, 0.6),
      inset 8px 8px 12px rgba(163, 177, 198, 0.3);
  }

  .input-button {
    box-shadow:
      2px 2px 3px rgba(163, 177, 198, 0.4),
      -2px -2px 2px rgba(#fff, 0.6);
  }
</style>
