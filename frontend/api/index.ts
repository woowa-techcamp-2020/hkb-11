import store from '../model/store'
function addToken() {
  if (store.id) {
    return {
      Authorization: `Bearer ${store.token}`,
    }
  }
  return {}
}
function setContentType() {
  return {
    'content-type': 'application/json',
  }
}
const apiUrlBase = '/api'
const METHOD = {
  GET() {
    return {
      method: 'GET',
      headers: {
        ...addToken(),
      },
    }
  },
  POST(data) {
    return {
      method: 'POST',
      headers: {
        ...setContentType(),
        ...addToken(),
      },
      body: JSON.stringify(data),
    }
  },
  PUT(data) {
    return {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        ...setContentType(),
      },
    }
  },
  DELETE(data) {
    return {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        ...setContentType(),
      },
    }
  },
}
const api = {
  request: async (url, config) => {
    const response = await fetch(url, config)
    return response
  },
  requestForData: async (url, config) => {
    const response = await fetch(url, config)
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      return response.status
    }
  },
  requestForToken: async (url, config) => {
    const response = await fetch(url, config)
    if (response.ok) {
      const data = await response.json()
      if (data.token) {
        const { id } = JSON.parse(data.token)
        store.login(id, data.token)
      }
      return data
    } else {
      return response.status
    }
  },
}

export async function signup({ id, password }) {
  return await api.requestForToken(
    `${apiUrlBase}/signup`,
    METHOD.POST({ id, password })
  )
}

export async function login({ id, password }) {
  return await api.requestForToken(
    `${apiUrlBase}/login`,
    METHOD.POST({ id, password })
  )
}

export async function fetchInvoices(year, month) {
  return await api.requestForData(
    `${apiUrlBase}/invoice?year=${year}&month=${month}`,
    METHOD.GET()
  )
}
