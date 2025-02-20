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
</script>

<template>
  <nav
    class="navbar fixed top-1/2 left-2 -translate-y-1/2 bg-gradient-to-t from-sky-700/60 to-sky-800/70 rounded-xl shadow-lg py-2 px-0 z-50"
  >
    <ul class="navbar__menu relative">
      <li
        v-for="item in NavbarLinkItems"
        :key="item.path"
        class="navbar__item last:before:content-[''] last:before:absolute last:before:opacity-0 last:before:z-[-1] last:before:top-0 last:before:left-2 last:before:w-10 last:before:h-10 last:before:lg:w-12 last:before:lg:h-12 last:before:bg-gradient-to-t last:before:from-sky-200 last:before:to-white last:before:rounded-xl last:before:transition-all last:before:duration-300"
      >
        <NuxtLink
          :to="{ name: item.path }"
          class="navbar__link group w-14 lg:w-16 h-10 lg:h-12 relative flex items-center justify-center transition-all duration-300 ease-in-out"
        >
          <component
            :is="item.icon"
            class="w-5 h-5 text-sky-300 group-hover:text-sky-700"
            :class="{ 'text-white': isActive(item.path) }"
          />
          <span
            class="absolute left-full ml-2 py-1.5 px-3 rounded-full text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 pointer-events-none bg-gradient-to-b from-white to-sky-100 text-sky-800 transition-all duration-300 ease-in-out"
            >{{ item.title }}</span
          >
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
  @mixin gooeyEffect($i) {
    @keyframes gooeyEffect-#{$i} {
      0% {
        transform: scale(1, 1);
      }
      50% {
        transform: scale(0.5, 1.5);
      }
      100% {
        transform: scale(1, 1);
      }
    }
  }

  .navbar {
    &__item {
      @for $i from 1 to 12 {
        &:first-child:nth-last-child(#{$i}),
        &:first-child:nth-last-child(#{$i}) ~ li {
          &:hover {
            ~ li:last-child:before {
              opacity: 1;
            }
          }
          &:last-child:hover:before {
            opacity: 1;
          }
          @for $j from 1 to $i {
            &:nth-child(#{$j}):hover {
              ~ li:last-child:before {
                @include gooeyEffect($j);
                top: (100% / $i) * ($j - 1);
                animation: gooeyEffect-#{$j} 300ms 1;
              }
            }
          }
          &:last-child:hover:before {
            @include gooeyEffect($i);
            top: (100% / $i) * ($i - 1);
            animation: gooeyEffect-#{$i} 300ms 1;
          }
        }
      }
    }
  }
</style>
