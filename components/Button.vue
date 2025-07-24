<script setup>
  const props = defineProps({
    link: {
      type: String,
      default: ''
    },
    fn: {
      type: Function,
      default: () => {}
    }
  })
</script>

<template>
  <button
    v-if="!link"
    class="atomic-button bg-gray-200 hover:bg-gradient-to-b flex justify-center items-center px-10 py-3 text-gray-500 rounded-full transition-all duration-200 tracking-wider cursor-pointer whitespace-nowrap"
    style=""
    @click="fn"
  >
    <slot></slot>
  </button>
  <a v-else :href="link" target="_blank" class="atomic-button">
    <slot></slot>
  </a>
</template>

<style lang="scss" scoped>
  .atomic-button {
    box-shadow:
      3px 3px 12px rgba(163, 177, 198, 0.4),
      -4px -4px 8px rgba(#fff, 0.6);
  }
</style>
