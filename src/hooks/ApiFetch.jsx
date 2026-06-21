async function apiFetch(endpoint, options = {}) {
  let { method, body } = options

  if (!method) {
    method = "GET"
  }

  const fetchOptions = {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: body
  }

  const response = await fetch(`http://localhost:3000/${endpoint}`, fetchOptions)
  const jsonResponse = await response.json()

  return jsonResponse
}

export default apiFetch