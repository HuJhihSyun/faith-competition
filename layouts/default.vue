<script setup lang="ts">
  import type { Component, FunctionalComponent } from 'vue'
  import PencilSvg from '@/assets/images/pencil-line.svg?skipsvgo'
  import ChartSvg from '@/assets/images/chart.svg?skipsvgo'
  import SearchSvg from '@/assets/images/search.svg?skipsvgo'
  const isLoading = ref<boolean>(true)

  const router = useRouter()

  onMounted(() => {
    isLoading.value = false
  })

  type ButtonItem = {
    label: string
    id: string
    icon?: FunctionalComponent | Component
    active?: boolean
    onClick: () => void
  }

  const buttonsGroup = reactive<ButtonItem[]>([
    {
      label: '編輯',
      id: 'index',
      icon: markRaw(PencilSvg),
      active: true,
      onClick: () => {
        routeToPage('index')
      }
    },
    {
      label: '結果',
      id: 'result',
      icon: markRaw(ChartSvg),
      active: false,
      onClick: () => {
        routeToPage('result')
      }
    },
    {
      label: '查詢',
      id: 'info',
      icon: markRaw(SearchSvg),
      active: false,
      onClick: () => {
        routeToPage('info')
      }
    }
  ])

  const routeToPage = (page: string) => {
    router.push({ name: page })
  }

  watch(
    () => router.currentRoute.value.name,
    (newPage: string | any) => {
      buttonsGroup.forEach((button: ButtonItem) => {
        button.active = button.id.toLowerCase() === newPage?.toString().toLowerCase()
      })
    },
    { immediate: true }
  )
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
        <p class="text-sky-200 ubuntu text-xl mt-4">Loading...</p>
      </aside>
    </transition>
    <ButtonsGroup :content="buttonsGroup" class="hidden md:block fixed top-5 right-5" />
    <MenuMobile class="flex sm:hidden" />
  </div>
</template>

<style lang="scss">
  @use 'sass:math';

  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

  .ubuntu {
    font-family: 'Ubuntu', sans-serif;
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
