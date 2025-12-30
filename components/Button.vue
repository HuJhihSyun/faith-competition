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
    class="relative border border-l-2 border-b-2 hover:border-l-3 hover:border-b-3 border-white input-shadow flex justify-center items-center px-10 py-3 text-white text-shadow wen-kai-mono font-bold rounded transition-all duration-200 tracking-wider cursor-pointer whitespace-nowrap before:content-[''] before:w-full before:h-full before:bg-white/15 hover:before:bg-white/20 before:absolute before:top-1/2 before:-translate-y-[62%] hover:before:-translate-y-[64%] before:left-1/2 before:-translate-x-[46%] hover:before:-translate-x-[44%] before:rounded"
    @click="fn"
  >
    <slot></slot>
  </button>
  <a v-else :href="link" target="_blank" class="atomic-button">
    <slot></slot>
  </a>
</template>
