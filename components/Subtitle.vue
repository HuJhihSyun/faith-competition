<template>
  <div>
    <h1
      class="text-[#D97F17] text-3xl md:text-4xl text-center wen-kai-mono py-3 lg:py-6 px-10 tracking-widest whitespace-nowrap"
    >
      <slot name="title">無限榮耀神</slot>
    </h1>
    <h2
      class="relative text-[#D97F17] font-bold text-xl sm:text-2xl md:text-3xl text-center wen-kai-mono mb-4 md:mb-10 before:content-[''] before:w-full before:h-[1px] before:bg-[#D97F17] before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0"
    >
      <span class="inline-block backdrop-blur-sm px-4 md:px-6 tracking-widest">
        <slot name="subtitle">基本資料填寫</slot>
      </span>
    </h2>
  </div>
</template>
