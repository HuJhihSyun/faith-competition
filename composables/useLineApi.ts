import { useAuthStore } from '@/stores/auth'

export function useLineApi() {
  const baseUrl = 'https://media.lawch.org/line'

  const getUserInfo = async (token: string) => {
    return await $fetch(`${baseUrl}/getUserInfo`, {
      method: 'POST',
      body: { token: token }
    })
  }

  const userUpdate = async (data: Record<string, any>) => {
    return await $fetch(`${baseUrl}/userUpdate`, {
      method: 'POST',
      body: data
    })
  }

  const getResult = async () => {
    return await $fetch(`${baseUrl}/scores/department`, {
      method: 'GET'
    })
  }

  const getTask = async (userId: string, day: number) => {
    return await $fetch(`${baseUrl}/task/${userId}/${day}`, {
      method: 'GET'
    })
  }

  const getAllTaskScores = async (userId: string) => {
    return await $fetch(`${baseUrl}/scores/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${useAuthStore().jwt}`
      }
    })
  }

  const postTask = async (data: Record<string, any>) => {
    return await $fetch(`${baseUrl}/task`, {
      method: 'POST',
      body: data
    })
  }

  // 登入
  const postLogin = async (data: Record<string, any>) => {
    return await $fetch(`${baseUrl}/login`, {
      method: 'POST',
      body: data
    })
  }

  // 抽獎名單
  const getLotteryList = async (start: number, end: number) => {
    return await $fetch(`${baseUrl}/task/getLotteryList?start=${start}&end=${end}`, {
      method: 'GET'
    })
  }

  // 中獎名單
  const getLottery = async () => {
    return await $fetch(`${baseUrl}/lottery`, {
      method: 'GET'
    })
  }

  return {
    getUserInfo,
    userUpdate,
    getResult,
    getTask,
    getAllTaskScores,
    postTask,
    postLogin,
    getLotteryList,
    getLottery
  }
}
