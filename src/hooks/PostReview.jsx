import { apiFetch } from "../services/api"

function useReviews() {
    async function createReview(review) {
        return apiFetch("avaliacoes", {
            method: "POST",
            body: JSON.stringify(review)
        })
    }

    return {
        createReview
    }
}

export default useReviews