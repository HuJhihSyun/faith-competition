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

  type DepartmentType = {
    id: number
    name: string
  }

  const Department: DepartmentType[] = [
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
      class="atomic-input relative flex w-full mx-auto rounded-full px-5 py-3 appearance-none overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300/60 text-center text-gray-500 tracking-wide align-middle border-none outline-0 transition-all duration-300"
      placeholder="請選擇部門"
    >
      <option :value="0" disabled selected>請選擇部門</option>
      <template v-for="item in Department">
        <option :value="item.id">{{ item.name }}</option>
      </template>
    </select>
    <ChevronSvg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
  </div>
</template>

<style lang="scss" scoped>
  .atomic-input {
    box-shadow:
      -4px -4px 8px rgba(#fff, 0.6),
      inset 8px 8px 12px rgba(163, 177, 198, 0.3);
  }
</style>
