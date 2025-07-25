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
  <label class="switch relative inline-block w-full h-12">
    <input class="opacity-0 w-0 h-0" type="checkbox" v-model="modelValue" />
    <span
      class="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-gray-200 to-gray-300/60 duration-500 rounded-full before:rounded-full before:absolute before:content-[''] before:w-1/2 before:h-9 before:left-1 before:bottom-[5px] before:bg-gradient-to-br before:from-gray-200 before:to-gray-200/20 before:duration-500"
    >
      <div
        class="absolute flex justify-center items-center gap-x-2 left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/3 text-gray-500"
      >
        <slot name="left-text" />
      </div>
      <div
        class="absolute flex justify-center items-center gap-x-2 right-1/4 top-1/2 -translate-y-1/2 translate-x-1/3 text-gray-500"
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
        transform: translateX(calc(100% - 8px));
      }
    }

    .slider {
      box-shadow:
        -4px -4px 8px rgba(#fff, 0.6),
        inset 8px 8px 12px rgba(163, 177, 198, 0.3);

      &:before {
        box-shadow:
          2px 2px 6px rgba(163, 177, 198, 0.4),
          -2px -3px 3px rgba(#fff, 0.6);
      }
    }
  }
</style>
