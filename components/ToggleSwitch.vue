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
      class="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-sky-700/50 to-sky-800/50 duration-500 rounded-full before:rounded-full before:absolute before:content-[''] before:w-1/2 before:h-10 before:left-1 before:bottom-1 before:bg-sky-200/10 before:duration-500"
    >
      <div
        class="absolute flex justify-center items-center gap-x-2 left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/3 text-sky-100"
      >
        <slot name="left-text" />
      </div>
      <div
        class="absolute flex justify-center items-center gap-x-2 right-1/4 top-1/2 -translate-y-1/2 translate-x-1/3 text-sky-100"
      >
        <slot name="right-text" />
      </div>
    </span>
  </label>
</template>

<style lang="scss" scoped>
  .switch {
    input {
      &:focus + .slider {
        box-shadow: 0 0 2px rgba(#000, 0.2);
      }

      &:checked + .slider:before {
        transform: translateX(calc(100% - 8px));
      }
    }

    .slider {
      &:before {
        box-shadow: 1px 1px 3px rgba(#000, 0.5);
      }
    }
  }
</style>
