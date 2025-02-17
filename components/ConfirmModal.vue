<script setup lang="ts">
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

  const closeModal = () => {
    emit('closeModal')
  }

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

  const confirmSubmit = () => {
    if (props.taskOption.id === 'pray') {
      confirmPayload.minutes = prayMinutes.value
    }
    emit('confirmSubmit', confirmPayload)
  }
</script>

<template>
  <Teleport to="#default-layout">
    <aside class="fixed w-full h-full bg-black/70 flex justify-center items-center z-50">
      <div class="bg-gradient-to-t from-white to-sky-100 w-11/12 max-w-[500px] py-5 px-5 rounded-xl">
        <div class="relative flex flex-col justify-center items-center pt-7">
          <div
            class="absolute top-0 left-1/2 -translate-y-3/4 -translate-x-1/2 bg-gradient-to-b from-sky-500 to-sky-700 shadow rounded-full p-4 text-white"
          >
            <component :is="props.taskOption.icon" class="w-8 h-8" />
          </div>
          <h4 class="text-2xl text-sky-800 font-bold mb-2 flex justify-center items-center whitespace-nowrap">
            {{ props.taskOption.title }}
            <div v-if="props.taskOption.id === 'pray'" class="flex justify-center items-center w-full">
              <input
                v-model="prayMinutes"
                type="text"
                class="w-12 p-2 mx-2 text-sm text-slate-600 border border-slate-200 rounded-md text-center"
              />
              <span>分鐘</span>
            </div>
          </h4>
          <h6 class="w-full text-sm md:text-base text-slate-600 text-center">
            {{ props.taskOption.content }}
          </h6>
          <div class="flex flex-col md:flex-row justify-between w-full space-y-2 md:space-y-0 md:space-x-3 mt-4">
            <button
              class="w-full md:w-1/2 py-2 text-sm text-white bg-sky-700 hover:bg-sky-800 rounded-md cursor-pointer transition-all duration-200"
              @click="closeModal"
            >
              取消
            </button>
            <button
              class="w-full md:w-1/2 py-2 text-sm text-white bg-sky-700 hover:bg-sky-800 rounded-md cursor-pointer transition-all duration-200"
              @click="confirmSubmit"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </aside>
  </Teleport>
</template>
