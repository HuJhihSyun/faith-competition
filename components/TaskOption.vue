<template>
  <button
    class="relative flex justify-between items-center w-full mx-auto rounded-full px-3 py-2 overflow-hidden bg-gradient-to-t from-white/80 to-sky-200/50 transition-all duration-300 tracking-wider cursor-pointer group hover:from-white hover:to-sky-200"
  >
    <div class="bg-gradient-to-t from-white to-sky-200 shadow rounded-full p-2 mr-4 text-sky-700">
      <slot name="icon"></slot>
    </div>
    <div class="w-full flex flex-col items-center justify-center">
      <div class="w-full flex justify-between items-center">
        <h4 class="text-lg text-sky-800 font-bold">
          <slot name="title"></slot>
        </h4>
        <h5 class="text-xs text-sky-700 font-bold">
          <slot name="subtitle"></slot>
        </h5>
      </div>
      <h6 class="w-full text-xs md:text-sm text-slate-600 text-left">
        <slot name="content"></slot>
      </h6>
    </div>
  </button>
</template>
