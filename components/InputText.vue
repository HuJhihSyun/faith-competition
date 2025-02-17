<script setup lang="ts">
import { useVModel } from '@vueuse/core'

interface InputTextProps {
  modelValue: string
}

interface InputTextEmits {
  (event: 'update:modelValue', value: InputTextProps['modelValue']): void
}

const props = withDefaults(defineProps<InputTextProps>(), {
  modelValue: ''
})

const emit = defineEmits<InputTextEmits>()

const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <div class="relative flex w-full mx-auto rounded-full px-5 py-3 overflow-hidden bg-gradient-to-t from-sky-700/50 to-sky-800/50 transition-all duration-300">
    <input v-model="modelValue" class="text-center grow tracking-wide align-middle placeholder:text-sky-200 text-white border-none outline-0" type="email" placeholder="請輸入您的暱稱"></input>
  </div>
</template>
