<script setup lang="ts">
  const isLoading = ref<boolean>(true)

  onMounted(() => {
    isLoading.value = false
  })
</script>

<template>
  <div
    id="default-layout"
    class="relative bg-[url(@/assets/images/background-vertical.webp)] md:bg-[url(@/assets/images/background-horizon.webp)] bg-cover bg-no-repeat w-full h-screen flex items-center justify-center overflow-hidden"
  >
    <div class="relative w-5/6 sm:w-4/5 md:w-3/5 lg:w-1/2 mx-auto z-40">
      <slot />
    </div>
    <transition name="fade">
      <aside
        v-if="isLoading"
        class="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-[#f47c0e]/30 to-[#d1760f]/70 z-[60] flex flex-col items-center justify-center"
      >
        <LoadingWave class="w-10 md:w-20 h-10 md:h-20" />
        <p class="text-white sacramento text-2xl mt-4">Loading...</p>
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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
