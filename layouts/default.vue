<script setup lang="ts">
  const isLoading = ref<boolean>(true)

  onMounted(() => {
    isLoading.value = false
  })
</script>

<template>
  <div
    id="default-layout"
    class="relative bg-gray-200 w-full h-screen flex items-center justify-center overflow-hidden"
  >
    <div class="relative w-11/12 sm:w-4/5 md:w-3/5 xl:w-1/2 max-w-[1680px] mx-auto z-40">
      <slot />
    </div>
    <transition name="fade">
      <aside
        v-if="isLoading"
        class="fixed top-0 left-0 w-full h-full bg-gradient-to-t from-sky-500/90 to-sky-900/90 z-[60] flex flex-col items-center justify-center"
      >
        <LoadingWave class="w-10 md:w-20 h-10 md:h-20" />
        <p class="text-sky-200 sacramento text-xl mt-4">Loading...</p>
      </aside>
    </transition>
    <MenuDesktop class="hidden sm:block" />
    <MenuMobile class="flex sm:hidden" />
  </div>
</template>

<style lang="scss">
  @use 'sass:math';

  @import url('https://fonts.googleapis.com/css2?family=LXGW+WenKai+Mono+TC&family=Sacramento&display=swap');

  .sacramento {
    font-family: 'Sacramento', sans-serif;
  }

  .wen-kai-mono {
    font-family: 'LXGW WenKai Mono TC', '微軟正黑體', sans-serif;
  }

  body,
  html {
    margin: 0;
    padding: 0;
  }

  .cloud1 {
    animation: moving 30s infinite alternate linear both;
  }

  .cloud2 {
    animation: moving 20s -5s infinite alternate linear both;
  }

  @keyframes flash {
    0% {
      opacity: 0;
      box-shadow: 0px 0px 5px rgba(#42ffff, 0);
    }
    50% {
      opacity: 1;
      box-shadow: 0px 0px 5px rgba(#42ffff, 1);
    }
    100% {
      opacity: 0;
      box-shadow: 0px 0px 5px rgba(#42ffff, 0);
    }
  }

  @keyframes moving {
    0% {
      transform: translateX(-20%);
    }
    100% {
      transform: translateX(20%);
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
