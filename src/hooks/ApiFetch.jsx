// CONFERIR
// Utilizar useEffect para chamar a
// API apenas quando necessário

async function apiFetch(endpoint, body) {
  const response = await fetch(`http://localhost:3000/${endpoint}`, {
    headers: {
      "Content-Type": "application/json"
    },
    body: body | []
  })

  return response.json()
}

export default apiFetch