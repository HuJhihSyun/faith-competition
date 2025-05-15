<template>
  <button
    class="group relative flex justify-between items-center w-full mx-auto rounded-md px-2 py-1 overflow-hidden border border-b-2 border-r-3 border-[#D97F17] hover:border-b-3 hover:border-r-4 backdrop-blur-xs transition-all duration-200 tracking-wider cursor-pointer group hover:from-white hover:to-sky-200"
  >
    <div
      class="border border-l-2 border-t-2 border-[#D97F17] group-hover:border-l-3 group-hover:border-t-2 rounded p-2 mr-4 text-[#d1760f] transition-all duration-200"
    >
      <slot name="icon"></slot>
    </div>
    <div class="w-full flex flex-col items-center justify-center">
      <div class="w-full flex justify-between items-center">
        <h4 class="text-lg text-[#d1760f] font-bold">
          <slot name="title"></slot>
        </h4>
        <h5 class="text-xs text-[#d1760f] font-bold">
          <slot name="subtitle"></slot>
        </h5>
      </div>
      <h6 class="w-full text-xs md:text-sm text-[#d1760f]/90 tracking-tight text-left line-clamp-1">
        <slot name="content"></slot>
      </h6>
    </div>
  </button>
</template>
