<script lang="ts" setup>
  import type { Component, FunctionalComponent } from 'vue'
  import PencilSvg from '@/assets/images/pencil-line.svg?skipsvgo'
  import ChartSvg from '@/assets/images/chart.svg?skipsvgo'
  import SearchSvg from '@/assets/images/search.svg?skipsvgo'

  interface ButtonItem {
    label?: string
    id?: string
    icon?: FunctionalComponent | Component
    active?: boolean
    onClick: () => void
  }

  interface ButtonsGroupProps {
    content?: ButtonItem[]
  }

  const props = withDefaults(defineProps<ButtonsGroupProps>(), {
    content: () => [
      {
        label: 'Pencil',
        id: 'edit',
        icon: PencilSvg,
        onClick: () => {}
      },
      {
        label: 'Chart',
        id: 'result',
        icon: ChartSvg,
        onClick: () => {}
      },
      {
        label: 'Search',
        id: 'search',
        icon: SearchSvg,
        onClick: () => {}
      }
    ]
  })
</script>

<template>
  <div>
    <div class="multi-button flex justify-between items-center rounded-full">
      <button
        class="flex justify-center items-center gap-1 border-none py-3 px-4 text-xs text-gray-500 hover:text-gray-600 min-w-20 cursor-pointer bg-gray-200 active:bg-gray-300 transition-all duration-200 ease-in-out first:rounded-l-full last:rounded-r-full"
        v-for="(item, index) in props.content"
        :key="index"
        :class="{ 'active text-gray-600': item.active }"
        @click="item.onClick"
      >
        <component v-if="item.icon" :is="item.icon" class="w-4 h-4" />
        <span v-if="item.label">{{ item.label }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .multi-button {
    box-shadow:
      3px 3px 6px rgba(163, 177, 198, 0.4),
      -4px -4px 8px rgba(#fff, 0.6);

    button {
      &.active {
        box-shadow: inset 4px 4px 8px rgba(163, 177, 198, 0.3);
      }

      + button {
        box-shadow: -4px -4px 8px rgba(#fff, 0.6);
      }
    }
  }
</style>
