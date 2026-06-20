import apiFetch from "./ApiFetch"
import updateProductScore from "./UpdateProductScore"

async function postReview(review) {
    const created = await apiFetch("avaliacoes", {
        method: "POST",
        body: JSON.stringify(review)
    })

    try {
        const user = await apiFetch(`usuarios/${review.usuarioId}`)
        const currentMoney = user.carteira_saldo
        await apiFetch(`usuarios/${review.usuarioId}`, {
            method: "PUT",
            body: JSON.stringify({ carteira_saldo: Number((currentMoney + 5).toFixed(2)) })
        })

        const orders = await apiFetch(`pedidos?usuarioId=${review.usuarioId}&produtoId=${review.produtoId}`)
        const orderToUpdate = orders[0]
        const body = { ...orderToUpdate, avaliado: true }
        if (orderToUpdate) {
            await apiFetch(`pedidos/${orderToUpdate.id}`, {
                method: "PUT",
                body: JSON.stringify(body)
            })
        }

        await updateProductScore(review)

        return body
    } catch (err) {
        return false
    }
}

export default postReview