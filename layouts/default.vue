<script setup lang="ts">
  const isLoading = ref<boolean>(true)

  onMounted(() => {
    isLoading.value = false
  })
</script>

<template>
  <div
    id="default-layout"
    class="relative bg-[url(@/assets/images/bg-flower.webp)] bg-cover bg-no-repeat w-full h-screen flex items-center justify-center overflow-hidden"
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
        <p class="text-white montserrat text-2xl mt-4">Loading...</p>
      </aside>
    </transition>
    <div
      class="absolute w-full h-full bg-[url(@/assets/images/back-cloud.png)] bg-cover bg-no-repeat opacity-5 pointer-events-none z-0"
    ></div>
    <div class="sparkCover absolute w-full h-full left-0 top-0 pointer-events-none z-20">
      <div class="spark1"></div>
      <div class="spark2"></div>
      <div class="spark3"></div>
      <div class="spark4"></div>
      <div class="spark5"></div>
      <div class="spark6"></div>
      <div class="spark7"></div>
      <div class="spark8"></div>
      <div class="spark9"></div>
      <div class="spark10"></div>
      <div class="spark11"></div>
      <div class="spark12"></div>
      <div class="spark13"></div>
      <div class="spark14"></div>
      <div class="spark15"></div>
      <div class="spark16"></div>
      <div class="spark17"></div>
      <div class="spark18"></div>
      <div class="spark19"></div>
      <div class="spark20"></div>
    </div>
    <MenuDesktop class="hidden sm:block" />
    <MenuMobile class="flex sm:hidden" />
  </div>
</template>

<style lang="scss">
  @use 'sass:math';

  @import url('https://fonts.googleapis.com/css2?family=LXGW+WenKai+Mono+TC&family=Montserrat&display=swap');

  .montserrat {
    font-family: 'Montserrat', sans-serif;
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

  .sparkCover {
    [class^='spark'] {
      animation: flash linear 3s infinite;
      background: linear-gradient(45deg, #fff, #fff);
      clip-path: polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%);
    }

    @for $i from 1 through 20 {
      .spark#{$i} {
        $size: math.random(20) + 10;
        position: absolute;
        left: math.random() * 100%;
        top: math.random() * 100%;
        animation-delay: $i * -0.2s;
        width: #{$size}px;
        height: #{$size}px;
      }
    }
  }

  @keyframes flash {
    0% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.3);
    }
    100% {
      opacity: 0;
      transform: scale(1);
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
