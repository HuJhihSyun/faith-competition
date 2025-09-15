export function useLineApi() {
  const baseUrl = 'https://media.lawch.org/line'

  const postLine = async (data: Record<string, any>) => {
    return await $fetch(baseUrl, {
      method: 'POST',
      body: data
    })
  }

  const getLineResult = async () => {
    return await $fetch(`${baseUrl}/result`, {
      method: 'GET'
    })
  }

  const getUsers = async (name: string) => {
    return await $fetch(`${baseUrl}/getUsers?name=${name}`, {
      method: 'GET'
    })
  }

  // 十月榮耀神
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

  return {
    postLine,
    getLineResult,
    getUsers,
    getUserInfo,
    userUpdate
  }
}
