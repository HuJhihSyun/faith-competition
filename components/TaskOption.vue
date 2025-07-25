<template>
  <button
    class="task-option relative mt-2.5 flex justify-between items-center w-full mx-auto rounded-full pl-3 pr-4 py-2 overflow-hidden bg-gray-200 transition-all duration-300 tracking-wider cursor-pointer group hover:from-white hover:to-sky-200"
  >
    <div class="task-option bg-gradient-to-t from-gray-100 to-gray-200 shadow rounded-full p-2 mr-4 text-gray-400">
      <slot name="icon"></slot>
    </div>
    <div class="w-full flex flex-col items-center justify-center">
      <div class="w-full flex justify-between items-center">
        <h4 class="text-lg text-gray-600 font-bold">
          <slot name="title"></slot>
        </h4>
        <h5 class="text-xs text-gray-500 font-bold">
          <slot name="subtitle"></slot>
        </h5>
      </div>
      <h6 class="w-full text-xs md:text-sm text-gray-400 line-clamp-1 text-left">
        <slot name="content"></slot>
      </h6>
    </div>
  </button>
</template>

<style lang="scss" scoped>
  .task-option {
    box-shadow:
      3px 3px 4px rgba(163, 177, 198, 0.4),
      -2px -2px 4px rgba(#fff, 0.6);
  }
</style>
