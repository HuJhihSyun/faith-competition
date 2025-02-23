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

  return {
    postLine,
    getLineResult,
    getUsers
  }
}
