<script setup lang="ts">
  import AwardSvg from '@/assets/images/award.svg?skipsvgo'
  import CalendarSvg from '@/assets/images/calendar.svg?skipsvgo'
  import UserEditSvg from '@/assets/images/user-edit.svg?skipsvgo'

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
      title: '我的日曆',
      path: 'index',
      icon: CalendarSvg
    },
    {
      title: '抽獎名單',
      path: 'info',
      icon: AwardSvg
    },
    {
      title: '資料填寫',
      path: 'setting',
      icon: UserEditSvg
    }
  ]
</script>

<template>
  <nav
    class="navbar fixed top-1/2 left-2 -translate-y-1/2 border border-b-2 border-r-2 border-[#D97F17] backdrop-blur-xs rounded-md shadow-lg py-2 px-0 z-50"
  >
    <ul class="navbar__menu relative">
      <li
        v-for="item in NavbarLinkItems"
        :key="item.path"
        class="navbar__item last:before:content-[''] last:before:absolute last:before:opacity-0 last:before:z-[-1] last:before:top-0 last:before:bg-gradient-to-t last:before:from-[#d1760f]/10 last:before:to-[#d1760f]/50 last:before:rounded last:before:transition-all last:before:duration-300"
      >
        <NuxtLink
          :to="{ name: item.path }"
          class="navbar__link group w-14 lg:w-16 h-10 lg:h-12 relative flex items-center justify-center transition-all duration-300 ease-in-out"
        >
          <component
            :is="item.icon"
            class="w-5 h-5 group-hover:text-[#8e6c3d]"
            :class="{ 'text-[#8e6c3d]': isActive(item.path), 'text-[#d1760f]': !isActive(item.path) }"
          />
          <span
            class="absolute left-full ml-2 py-1 px-2 rounded text-xs text-[#d1760f] whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 pointer-events-none bg-gradient-to-br from-[#d1760f]/10 to-[#d1760f]/50 transition-all duration-300 ease-in-out"
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
      &:last-child {
        &:before {
          top: 0;
          left: 8px;
          width: 48px;
          height: 48px;

          @media (max-width: 1024px) {
            width: 40px;
            height: 40px;
          }
        }
      }

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

                & {
                  top: calc(100% / $i) * ($j - 1);
                  animation: gooeyEffect-#{$j} 300ms 1;
                }
              }
            }
          }
          &:last-child:hover:before {
            @include gooeyEffect($i);

            & {
              top: calc(100% / $i) * ($i - 1);
              animation: gooeyEffect-#{$i} 300ms 1;
            }
          }
        }
      }
    }
  }
</style>
