<script lang="ts" setup>
  import { useVModel } from '@vueuse/core'

  interface ToggleSwitchProps {
    modelValue: boolean
  }

  interface ToggleSwitchEmits {
    (event: 'update:modelValue', value: ToggleSwitchProps['modelValue']): void
  }

  const props = withDefaults(defineProps<ToggleSwitchProps>(), {
    modelValue: false
  })

  const emit = defineEmits<ToggleSwitchEmits>()

  const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <label class="switch relative inline-block w-full h-13">
    <input class="opacity-0 w-0 h-0" type="checkbox" v-model="modelValue" />
    <span
      class="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 duration-500 rounded bg-[#D97F17]/5 before:rounded before:absolute before:content-[''] before:w-1/2 before:h-12 before:left-0 before:bottom-0.5 before:border before:border-r-2 before:border-b-2 before:border-[#D97F17] before:duration-500 before:backdrop-blur-md"
    >
      <div
        class="absolute flex justify-center items-center gap-x-2 left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2 text-[#d1760f] wen-kai-mono"
      >
        <slot name="left-text" />
      </div>
      <div
        class="absolute flex justify-center items-center gap-x-2 right-1/4 top-1/2 -translate-y-1/2 translate-x-1/2 text-[#d1760f] wen-kai-mono"
      >
        <slot name="right-text" />
      </div>
    </span>
  </label>
</template>

<style lang="scss" scoped>
  .switch {
    input {
      &:checked + .slider:before {
        transform: translateX(calc(100%));
      }
    }
  }
</style>
