<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core'

  type TaskOption = {
    title: string
    id: string
    subtitle: string
    content: string
    icon: Component
  }

  interface ConfirmModalProps {
    taskOption: TaskOption
  }

  const props = withDefaults(defineProps<ConfirmModalProps>(), {
    taskOption: {
      title: '',
      id: '',
      subtitle: '',
      content: '',
      icon: null
    }
  })

  interface ConfirmModalEmits {
    (event: 'closeModal'): void
    (event: 'confirmSubmit', value: any): void
  }

  const emit = defineEmits<ConfirmModalEmits>()

  const popupRef = ref<HTMLElement | null>(null)

  const closeModal = () => {
    emit('closeModal')
  }

  onClickOutside(popupRef, () => {
    closeModal()
  })

  enum TaskOptionId {
    contact = 0,
    presentation = 1,
    lesson = 2,
    meeting = 3,
    pray = 4
  }

  type ConfirmPayloadType = {
    category: number
    minutes?: number
  }

  const confirmPayload = reactive<ConfirmPayloadType>({
    category: TaskOptionId[props.taskOption.id as keyof typeof TaskOptionId]
  })

  const prayMinutes = ref<number>(0)
  const prayMinutesRef = ref<HTMLInputElement | null>(null)
  const isFocused = ref<boolean>(false)

  const confirmSubmit = () => {
    if (props.taskOption.id === 'pray') {
      if (!prayMinutes.value) {
        prayMinutesRef.value?.focus()
        isFocused.value = true
        return
      }

      if (prayMinutes.value > 999 || prayMinutes.value < 1 || prayMinutes.value % 1 !== 0) {
        alert('請輸入正常人的禱告時間')
        prayMinutesRef.value?.focus()
        isFocused.value = true
        return
      }

      confirmPayload.minutes = prayMinutes.value
    }
    emit('confirmSubmit', confirmPayload)
  }
</script>

<template>
  <Teleport to="#default-layout">
    <aside class="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-center z-50">
      <div
        ref="popupRef"
        class="bg-gradient-to-t from-white/50 to-white/30 border border-b-2 border-r-2 border-[#D97F17] backdrop-blur-xs w-11/12 max-w-[500px] py-5 px-5 rounded-md"
      >
        <div class="relative flex flex-col justify-center items-center pt-7">
          <div
            class="absolute top-0 left-1/2 -translate-y-3/4 -translate-x-1/2 border border-b-3 border-r-3 border-[#D97F17] bg-white rounded-full p-4 text-[#d1760f] wen-kai-mono backdrop-blur-sm"
          >
            <component :is="props.taskOption.icon" class="w-8 h-8" />
          </div>
          <h4
            class="text-2xl text-[#d1760f] wen-kai-mono font-bold mb-2 flex justify-center items-center whitespace-nowrap"
          >
            {{ props.taskOption.id === 'pray' ? '我禱告了' : props.taskOption.title }}
            <div v-if="props.taskOption.id === 'pray'" class="flex justify-center items-center w-full">
              <input
                ref="prayMinutesRef"
                v-model="prayMinutes"
                type="text"
                class="w-14 px-2 py-1.5 mx-2 text-sm text-slate-600 border border-sky-600 rounded-md text-center"
                :class="{ 'outline-red-500': isFocused }"
              />
              <span>分鐘</span>
            </div>
          </h4>
          <h6 class="w-full text-base md:text-base text-[#d1760f]/90 wen-kai-mono text-center">
            {{ props.taskOption.content }}
          </h6>
          <div class="flex flex-col md:flex-row justify-between w-full space-y-2 md:space-y-0 mt-4">
            <button
              class="w-full mt-2 md:mt-0 order-2 md:order-1 md:w-1/2 py-3 mr-2 text-sm text-white wen-kai-mono bg-slate-500 hover:bg-slate-600 rounded-md cursor-pointer transition-all duration-200"
              @click="closeModal"
            >
              取消
            </button>
            <button
              class="w-full order-1 md:order-2 md:w-1/2 py-3 text-sm text-white bg-sky-700 wen-kai-mono hover:bg-sky-800 rounded-md cursor-pointer transition-all duration-200"
              @click="confirmSubmit"
            >
              送出加分
            </button>
          </div>
        </div>
      </div>
    </aside>
  </Teleport>
</template>
