import apiFetch from "./ApiFetch"

async function updateProductScore(review) {
    const allReviews = await apiFetch(`avaliacoes?produtoId=${review.produtoId}`)
    const reviewsArray = allReviews
    let averageScore = 0
    for (let i = 0; i < reviewsArray.length; i++) {
        averageScore += reviewsArray[i].nota
    }
    averageScore /= reviewsArray.length
    averageScore = Number(averageScore.toFixed(2))

    const product = await apiFetch(`produtos/${review.produtoId}`)
    await apiFetch(`produtos/${review.produtoId}`, {
        method: "PUT",
        body: JSON.stringify({ ...product, nota: averageScore })
    })
}

export default updateProductScore