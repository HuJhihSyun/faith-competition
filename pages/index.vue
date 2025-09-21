<script setup lang="ts">
  import { useLocalStorage } from '@vueuse/core'
  import MaleSvg from '@/assets/images/male.svg?skipsvgo'
  import FemaleSvg from '@/assets/images/female.svg?skipsvgo'
  import ContactSvg from '@/assets/images/contact-round.svg?skipsvgo'
  import PresentationSvg from '@/assets/images/presentation.svg?skipsvgo'
  import LessonSvg from '@/assets/images/book-open-check.svg?skipsvgo'
  import PraySvg from '@/assets/images/message-circle-heart.svg?skipsvgo'
  import SunMoonSvg from '@/assets/images/sun-moon.svg?skipsvgo'
  import BookOpenSvg from '@/assets/images/book-open.svg?skipsvgo'
  import MusicSvg from '@/assets/images/music.svg?skipsvgo'
  import { useLineApi } from '@/composables/useLineApi'

  const router = useRouter()

  useSeoMeta({
    title: '光輝十月 | 無限榮耀神',
    author: '© 2025 Love and Word Church All rights reserved.',
    keywords: '教會,傳道,空提,信仰,榮耀神',
    description:
      '神說：「我是阿拉法，我是俄梅戛，是昔在、今在、以後永在的全能者。」講到阿拉法，主角就是神。而攝理，廣義來說，就是神的歷史，在舊約時代，神展開舊約層級的攝理歷史；在新約時代，神展開新約層級的攝理歷史；在現今，神則展開完成級的成約攝理歷史。如此，若要講到攝理的起點，其實就等於是在講神的起點。然而，神昔在、今在、永在，這起點，實在沒辦法說是哪一天，真要說，也只能說，那就是「初」。',
    ogTitle: '光輝十月 | 無限榮耀神',
    ogDescription:
      '神說：「我是阿拉法，我是俄梅戛，是昔在、今在、以後永在的全能者。」講到阿拉法，主角就是神。而攝理，廣義來說，就是神的歷史，在舊約時代，神展開舊約層級的攝理歷史；在新約時代，神展開新約層級的攝理歷史；在現今，神則展開完成級的成約攝理歷史。如此，若要講到攝理的起點，其實就等於是在講神的起點。然而，神昔在、今在、永在，這起點，實在沒辦法說是哪一天，真要說，也只能說，那就是「初」。',
    ogUrl: 'https://www.loveandword.tw/',
    ogImage: 'images/evangelism-cover.jpg'
  })

  type UserInformation = {
    name: string
    department: number
    gender: boolean
  }

  const userInformation = useLocalStorage<UserInformation>('loveWordsEventUserInfo', {
    name: '',
    department: 0,
    gender: false
  })

  // 錯誤提示
  const isNameFalse = ref<boolean>(false)
  const isDepartmentFalse = ref<boolean>(false)

  // 當前步驟
  const currentStep = ref<number>(0)

  const joinEvent = () => {
    if (!userInformation.value.name || !userInformation.value.department) {
      if (!userInformation.value.name) {
        isNameFalse.value = true

        setTimeout(() => {
          isNameFalse.value = false
        }, 500)
      }
      if (!userInformation.value.department) {
        isDepartmentFalse.value = true

        setTimeout(() => {
          isDepartmentFalse.value = false
        }, 500)
      }
      return
    }

    currentStep.value += 1
  }

  // Step 2
  const now = ref<Date>(new Date())
  const today = ref<number>(now.value.getDate())
  const monthId = ref<number>(now.value.getMonth() + 1)
  const dayId = ref<string>(today.value.toString())

  type TaskOptions = {
    title: string
    id: string
    subtitle: string
    icon: Component
    isChecked: boolean
    quantity?: number | undefined | null
    unit?: string
  }

  const basicTaskOptions = reactive<TaskOptions[]>([
    {
      title: '晨更',
      id: 'morning',
      subtitle: '1次3分',
      icon: markRaw(SunMoonSvg),
      isChecked: false
    },
    {
      title: '讀經',
      id: 'bible',
      subtitle: '4章2分',
      icon: markRaw(BookOpenSvg),
      isChecked: false
    },
    {
      title: '讚美',
      id: 'praise',
      subtitle: '2首1分',
      icon: markRaw(MusicSvg),
      isChecked: false
    },
    {
      title: '禱告',
      id: 'pray',
      subtitle: '5分鐘1分',
      icon: markRaw(PraySvg),
      isChecked: false,
      unit: '10分鐘'
    }
  ])

  const gospelTaskOptions = reactive<TaskOptions[]>([
    {
      title: '連結',
      id: 'contact',
      subtitle: '1人1分',
      icon: markRaw(ContactSvg),
      isChecked: false,
      quantity: 0,
      unit: '人'
    },
    {
      title: '聽課',
      id: 'lesson',
      subtitle: '1次1分',
      icon: markRaw(LessonSvg),
      isChecked: false,
      quantity: 0,
      unit: '次'
    },
    {
      title: '講義',
      id: 'presentation',
      subtitle: '1次1分',
      icon: markRaw(PresentationSvg),
      isChecked: false,
      quantity: 0,
      unit: '次'
    }
  ])

  // TODO: props isFocused
  const isFocused = ref<boolean>(false)

  const saveData = async () => {
    const basicTaskPayload = basicTaskOptions.reduce(
      (acc: { [x: string]: any }, option: { id: string | number; isChecked: any }) => {
        acc[option.id] = option.isChecked
        return acc
      },
      {} as Record<string, boolean>
    )

    const gospelTaskPayload = gospelTaskOptions.reduce(
      (
        acc: { [x: string]: any },
        option: { id: string | number; isChecked: any; quantity?: number | undefined | null }
      ) => {
        acc[option.id] = 0
        if (option.isChecked && option.quantity !== null && option.quantity !== undefined) {
          acc[option.id] = Number(option.quantity)
        }
        return acc
      },
      {} as Record<string, boolean | number>
    )

    const payload = {
      dayOfMonth: Number(dayId),
      // userId: authStore.userInformation.id,
      ...basicTaskPayload,
      ...gospelTaskPayload
      // ...(taskId.value ? { id: taskId.value } : {})
    }

    try {
      // await postTask(payload)
      alert('儲存成功')
      router.push(`/`)
    } catch (error) {
      console.error('Error saving task data:', error)
      alert('儲存失敗，請稍後再試')
    }
  }

  // const showConfirmModal = (id: string) => {
  //   currentTaskOption.value = taskOptions.find((taskOption) => taskOption.id === id)
  //   isConfirmModalShow.value = true
  // }

  // const closeModal = () => {
  //   isConfirmModalShow.value = false
  // }

  // API
  const { postLine } = useLineApi()

  const submitData = async (payloadData: Record<string, any>) => {
    const response = await postLine(payloadData)
  }

  const confirmSubmit = (payload: { category: number; minutes?: number }) => {
    const payloadData = {
      ...userInformation.value,
      ...payload
    }
    // API
    submitData(payloadData)
      .then(() => {
        // isConfirmModalShow.value = false
        router.push('/result')
      })
      .catch((error) => {
        console.error(error)
      })
  }
</script>

<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="!currentStep">
        <h3 class="text-[#D97F17] font-bold text-2xl text-center sacramento">2025</h3>
        <h1
          class="text-[#D97F17] text-3xl sm:text-4xl md:text-5xl text-center wen-kai-mono py-3 lg:py-4 px-10 tracking-wider whitespace-nowrap"
        >
          光輝十月
        </h1>
        <h2
          class="relative text-[#D97F17] font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-center wen-kai-mono mb-6 md:mb-10 before:content-[''] before:w-full before:h-[1px] before:bg-[#D97F17] before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0"
        >
          <span class="inline-block backdrop-blur-sm px-4 md:px-6 tracking-widest">無限榮耀神</span>
        </h2>
        <div class="flex flex-col items-center mx-auto">
          <InputText :class="{ 'bg-red-400/80': isNameFalse }" v-model="userInformation.name" />
          <DepartmentSelect
            class="mt-4"
            :class="{ 'bg-red-400/80': isDepartmentFalse }"
            v-model="userInformation.department"
          />
          <ToggleSwitch v-model="userInformation.gender" class="mt-4">
            <template #left-text> <FemaleSvg class="w-4 h-4" />姐妹 </template>
            <template #right-text> <MaleSvg class="w-4 h-4" />弟兄 </template>
          </ToggleSwitch>
        </div>
        <div class="flex flex-col justify-center items-center mt-8">
          <Button :fn="joinEvent">參與積分</Button>
        </div>
      </div>
      <div v-else>
        <Subtitle>
          <template #title>無限榮耀神</template>
          <template #subtitle>
            <span class="sacramento">2025</span>年<span class="sacramento">{{ monthId }}</span
            >月<span class="sacramento">{{ dayId }}</span
            >日
          </template>
        </Subtitle>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 mx-auto">
          <section>
            <h3 class="relative text-[#D97F17] font-bold text-xl md:text-2xl wen-kai-mono mb-2 md:mb-4 tracking-widest">
              基本信仰
            </h3>
            <div class="flex flex-col gap-3 md:gap-4">
              <div
                v-for="taskOption in basicTaskOptions"
                :key="taskOption.id"
                class="w-full flex justify-start items-center gap-2 tracking-wider"
              >
                <BasicCheckbox class="w-5 h-5" v-model="taskOption.isChecked" />
                <div class="text-[#d1760f]">
                  <component :is="taskOption.icon" class="w-5 h-5" />
                </div>
                <h4 class="text-base md:text-lg wen-kai-mono text-[#d1760f] font-bold">
                  <span>{{ taskOption.title }}</span>
                  <span class="text-sm wen-kai-mono text-[#d1760f]">{{ taskOption.unit }}</span>
                </h4>
                <h5 class="text-sm wen-kai-mono text-[#d1760f]">({{ taskOption.subtitle }})</h5>
              </div>
            </div>
          </section>
          <section>
            <h3 class="relative text-[#D97F17] font-bold text-xl md:text-2xl wen-kai-mono mb-2 md:mb-4 tracking-widest">
              傳道管理
            </h3>
            <div class="flex flex-col gap-3 md:gap-4">
              <div
                v-for="taskOption in gospelTaskOptions"
                :key="taskOption.id"
                class="w-full flex justify-start items-center gap-2 tracking-wider"
              >
                <BasicCheckbox class="w-5 h-5" v-model="taskOption.isChecked" />
                <div class="text-[#d1760f]">
                  <component :is="taskOption.icon" class="w-5 h-5" />
                </div>
                <h4 class="text-base md:text-lg wen-kai-mono text-[#d1760f] font-bold">
                  <span>{{ taskOption.title }}</span>
                  <input
                    v-if="taskOption.quantity !== null && taskOption.quantity !== undefined"
                    :ref="`${taskOption.id}inputRef`"
                    v-model="taskOption.quantity"
                    type="text"
                    class="w-10 lg:w-12 px-1 lg:px-2 py-0.5 mx-2 text-sm text-[#d1760f] sacramento border border-[#D97F17] outline-0 focus:border-b-2 focus:border-r-2 rounded text-center"
                    :class="{
                      'border-red-500 text-red-500': isFocused,
                      'pointer-events-none bg-[#d1760f]/10 text-[#d1760f]/50': !taskOption.isChecked
                    }"
                  />
                  <span class="text-sm wen-kai-mono text-[#d1760f]">{{ taskOption.unit }}</span>
                </h4>
                <h5 class="text-sm wen-kai-mono text-[#d1760f]">({{ taskOption.subtitle }})</h5>
              </div>
            </div>
          </section>
        </div>
        <div class="flex justify-center items-center mt-8">
          <Button :disabled="Number(dayId) !== today" :fn="saveData">儲存</Button>
        </div>
        <aside class="mt-8 py-2 px-4 border border-b-2 border-r-2 border-[#d1760f] rounded-lg">
          <h5 class="text-[#d1760f] text-base sm:text-lg wen-kai-mono">活動說明</h5>
          <ul class="text-[#d1760f] text-xs sm:text-sm wen-kai-mono my-1">
            <li class="flex items-center">• 活動時間 10／6～10／19</li>
            <li class="flex items-center">• 基本信仰各項每天都完成者可進入抽獎</li>
            <li class="flex items-center">• 傳道.聽課.講義按各自完成次數分別進行抽獎</li>
            <li class="flex items-center">• 每週抽獎一次，各項抽出一人</li>
            <li class="flex items-center">• 可獲得精美手提袋乙個</li>
          </ul>
        </aside>
      </div>
    </transition>
    <!-- <ConfirmModal
      v-if="isConfirmModalShow"
      :taskOption="currentTaskOption"
      @close-modal="closeModal"
      @confirm-submit="confirmSubmit"
    /> -->
  </div>
</template>

<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
