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
    class="bg-gradient-to-bl from-yellow-400 to-yellow-700 hover:bg-gradient-to-b flex justify-center items-center px-10 py-3 text-white rounded-full transition-all duration-200 tracking-wider cursor-pointer"
    @click="fn"
  >
    <slot></slot>
  </button>
  <a v-else :href="link" target="_blank" class="atomic-button">
    <slot></slot>
  </a>
</template>
