<script setup lang="ts">
  import PencilSvg from '@/assets/images/pencil-line.svg?skipsvgo'
  import ChartSvg from '@/assets/images/chart.svg?skipsvgo'
  import SearchSvg from '@/assets/images/search.svg?skipsvgo'
</script>

<template>
  <div class="fixed container left-2 top-10 flex justify-start items-center border">
    <input type="checkbox" id="toggle" checked />
    <label
      class="button absolute bg-[#222222] z-10 px-6 w-[320px] h-[65px] rounded-2xl cursor-pointer flex justify-start items-center transition-all duration-300 overflow-hidden before:absolute before:content-[''] before:w-5 before:h-0.5 before:bg-sky-300 before:transform-[rotate(225deg)] before:transition-all before:duration-400 after:absolute after:content-[''] after:w-5 after:h-0.5 after:bg-sky-300 after:transform-[rotate(135deg)] after:transition-all after:duration-400"
      for="toggle"
    >
      <nav
        class="nav opacity-100 bg-[#222222] transition-all duration-400 ease-in-out w-full rounded-sm p-2.5 translate-x-[10%]"
      >
        <ul class="p-0 m-0 flex flex-row">
          <li class="opacity-0 list-none">
            <a
              class="text-[#eeff00] text-xl w-[52px] h-[52px] flex justify-center items-center rounded-2xl transition-all duration-500"
              href="#0"
            >
              <PencilSvg />
            </a>
          </li>
          <li>
            <a
              class="text-[#eeff00] text-xl w-[52px] h-[52px] flex justify-center items-center rounded-2xl transition-all duration-500"
              href="#0"
            >
              <ChartSvg />
            </a>
          </li>
          <li>
            <a
              class="text-[#eeff00] hover:text-white hover:bg-[#1c1c1c] text-xl mr-2 w-[52px] h-[52px] flex justify-center items-center rounded-2xl transition-all duration-500"
              href="#0"
            >
              <SearchSvg />
            </a>
          </li>
        </ul>
      </nav>
    </label>
  </div>
</template>

<style lang="scss" scoped>
  $darkbg: #1c1c1c;
  $icons: #eeff00;
  $branco: #fff;

  .container {
    display: flex;
  }

  #toggle {
    -webkit-appearance: none;
  }

  .nav {
    li {
      &:nth-child(1) {
        transform-origin: bottom;
        animation: itop 300ms 300ms linear forwards;
      }
      &:nth-child(2) {
        transform-origin: bottom;
        animation: itop 300ms 400ms linear forwards;
      }
      &:nth-child(3) {
        transform-origin: bottom;
        animation: itop 300ms 500ms linear forwards;
      }
      &:nth-child(4) {
        transform-origin: bottom;
        animation: itop 300ms 600ms linear forwards;
      }
    }
    a {
      text-decoration: none;

      &:hover {
        background: $darkbg;
        border-radius: 15px;
      }
    }
  }

  #toggle:checked ~ label .nav {
    display: none;
    opacity: 0;
    transform: translateX(0);
  }

  #toggle:checked ~ .button:before {
    transform: rotate(90deg);
  }

  #toggle:checked ~ .button:after {
    transform: rotate(0deg);
  }

  #toggle:checked ~ .button {
    width: 70px;
    transition: all 0.1s linear;
  }

  @media (max-width: 640px) {
    .container {
      width: 100%;
    }
  }

  @keyframes itop {
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
