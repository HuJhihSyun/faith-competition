<script setup lang="ts">
  import PencilSvg from '@/assets/images/pencil-line.svg?skipsvgo'
  import ChartSvg from '@/assets/images/chart.svg?skipsvgo'
  import SearchSvg from '@/assets/images/search.svg?skipsvgo'

  const route = useRoute()

  const isActive = (path: string) => {
    return route.name === path
  }

  type NavbarLinkItem = {
    title: string
    path: string
    icon: Component
  }

  const NavbarLinkItems: NavbarLinkItem[] = [
    {
      title: '填寫',
      path: 'index',
      icon: PencilSvg
    },
    {
      title: '查看總分',
      path: 'result',
      icon: ChartSvg
    },
    {
      title: '查詢成績',
      path: 'info',
      icon: SearchSvg
    }
  ]

  const toggleInput = ref<HTMLInputElement | null>(null)

  const handleToggle = () => {
    if (toggleInput.value) {
      toggleInput.value.checked = !toggleInput.value.checked
    }
  }
</script>

<template>
  <div class="fixed group container w-0 left-2 top-10 justify-start items-center z-50">
    <input ref="toggleInput" type="checkbox" id="toggle" class="appearance-none" checked />
    <label
      class="button absolute bg-gradient-to-t from-sky-800/90 to-sky-900/90 z-10 px-4 w-[176px] h-13.5 rounded-xl cursor-pointer flex justify-start items-center transition-all duration-300 overflow-hidden before:absolute before:content-[''] before:w-5 before:h-0.5 before:bg-sky-200 before:rotate-225 before:transition-all before:duration-400 after:absolute after:content-[''] after:w-5 after:h-0.5 after:bg-sky-200 after:rotate-135 after:transition-all after:duration-400 group-[:has(input:checked)]:before:rotate-90 group-[:has(input:checked)]:after:rotate-0 group-[:has(input:checked)]:transition-all group-[:has(input:checked)]:duration-200 group-[:has(input:checked)]:w-13"
      for="toggle"
    >
      <nav
        class="nav opacity-100 ml-2 bg-gradient-to-t from-sky-800/90 to-sky-900/90 transition-all duration-400 ease-in-out w-full rounded-sm p-2.5 translate-x-[10%] group-[:has(input:checked)]:opacity-0 group-[:has(input:checked)]:translate-x-0 group-[:has(input:checked)]:hidden"
      >
        <ul class="p-0 m-0 flex flex-row">
          <li
            v-for="(item, index) in NavbarLinkItems"
            :key="item.path"
            class="opacity-0 list-none origin-bottom"
            :style="{ animationDelay: `${300 + 100 * index}ms` }"
          >
            <NuxtLink
              :to="{ name: item.path }"
              class="text-sky-200 text-xl w-10 h-10 flex justify-center items-center rounded-md transition-all duration-500 no-underline"
              :class="{ 'text-sky-800 bg-gradient-to-b from-white to-sky-100': isActive(item.path) }"
              @click="handleToggle"
            >
              <component :is="item.icon" class="w-5 h-5" />
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </label>
  </div>
</template>

<style lang="scss" scoped>
  .nav li {
    animation-duration: 300ms;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
    animation-name: float;
  }

  @keyframes float {
    0% {
      opacity: 0;
      transform: translateY(60px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
