<script setup lang="ts">
  import { useVModel } from '@vueuse/core'
  import ChevronSvg from '@/assets/images/chevron-down.svg?skipsvgo'

  enum DEPARTMENT {
    GALAXY = 1,
    SHINING_STAR = 2,
    CAMPUS = 3,
    YOUTH = 4,
    FAMILY = 5,
    OLDER = 6
  }

  const Department: Object[] = [
    { id: DEPARTMENT.GALAXY, name: '銀河水' },
    { id: DEPARTMENT.SHINING_STAR, name: 'SS' },
    { id: DEPARTMENT.CAMPUS, name: 'Campus' },
    { id: DEPARTMENT.YOUTH, name: '青年部' },
    { id: DEPARTMENT.FAMILY, name: '家庭局' },
    { id: DEPARTMENT.OLDER, name: '長年部' }
  ]

  interface DepartmentSelectProps {
    modelValue: number
  }

  interface DepartmentSelectEmits {
    (event: 'update:modelValue', value: DepartmentSelectProps['modelValue']): void
  }

  const props = withDefaults(defineProps<DepartmentSelectProps>(), {
    modelValue: 0
  })

  const emit = defineEmits<DepartmentSelectEmits>()

  const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <div class="relative w-full">
    <select
      name="department"
      id="department"
      v-model="modelValue"
      class="relative flex w-full mx-auto rounded-full px-5 py-3 appearance-none overflow-hidden bg-gradient-to-t from-sky-700/50 to-sky-800/50 text-center text-sky-100 tracking-wide align-middle border-none outline-0 transition-all duration-300"
      placeholder="請選擇部門"
    >
      <option :value="0" disabled selected>請選擇部門</option>
      <template v-for="item in Department">
        <option :value="item.id">{{ item.name }}</option>
      </template>
    </select>
    <ChevronSvg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-100 pointer-events-none" />
  </div>
</template>
