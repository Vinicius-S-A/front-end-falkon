import apiFetch from "./ApiFetch"

async function getProductById(productId) {
  try {
    const product = await apiFetch(`produtos/${productId}`)
    return product
  } catch (error) {
    throw new Error(`Erro ao buscar produto: ${error.message}`)
  }
}

export default getProductById