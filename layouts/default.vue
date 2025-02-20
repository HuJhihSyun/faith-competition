<script setup lang="ts">
  import Cloud1Svg from '@/assets/images/cloud1.svg?skipsvgo'
  import Cloud4Svg from '@/assets/images/cloud4.svg?skipsvgo'

  const isLoading = ref<boolean>(true)

  onMounted(() => {
    isLoading.value = false
  })
</script>

<template>
  <div
    id="default-layout"
    class="relative bg-gradient-to-t from-sky-300 to-sky-800 w-full h-screen flex items-center justify-center overflow-hidden"
  >
    <div class="relative w-11/12 sm:w-4/5 md:w-3/5 xl:w-1/2 max-w-[1680px] mx-auto z-40">
      <slot />
    </div>
    <transition name="fade">
      <aside
        v-if="isLoading"
        class="fixed top-0 left-0 w-full h-full bg-gradient-to-t from-sky-500/90 to-sky-900/90 z-50 flex flex-col items-center justify-center"
      >
        <LoadingWave class="w-10 md:w-20 h-10 md:h-20" />
        <p class="text-sky-200 sacramento text-xl mt-4">Loading...</p>
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
    <Cloud1Svg class="absolute top-10 md:top-20 right-10 md:left-20 w-30 cloud1" />
    <Cloud4Svg class="absolute bottom-10 md:bottom-20 right-5 md:right-20 w-40 md:w-50 cloud2" />
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

  .sparkCover {
    [class^='spark'] {
      background: radial-gradient(ellipse at center, rgba(#42ffff, 1) 0%, rgba(#2525a5, 0) 100%);
      border-radius: 50%;
      animation: flash 10s infinite;
    }

    @for $i from 1 through 20 {
      .spark#{$i} {
        $size: math.random(10) + 5;
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
