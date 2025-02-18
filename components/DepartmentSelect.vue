<script setup lang="ts">
  import { useVModel } from '@vueuse/core'

  enum DEPARTMENT {
    GALAXY = 0,
    SHINING_STAR = 1,
    CAMPUS = 2,
    YOUTH = 3,
    FAMILY = 4,
    OLDER = 5
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
  <select
    name="department"
    id="department"
    v-model="modelValue"
    class="relative flex w-full mx-auto rounded-full px-5 py-3 overflow-hidden bg-gradient-to-t from-sky-700/50 to-sky-800/50 text-center tracking-wide align-middle placeholder:text-sky-200 text-sky-200 border-none outline-0 transition-all duration-300"
    placeholder="請選擇部門"
  >
    <option :value="0" disabled selected>請選擇部門</option>
    <template v-for="item in Department">
      <option :value="item.id">{{ item.name }}</option>
    </template>
  </select>
</template>
