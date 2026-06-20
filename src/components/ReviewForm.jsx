import { useState, useEffect } from "react"
import postReview from "../hooks/PostReview"
import "./ReviewForm.css"
import apiFetch from "../hooks/ApiFetch"

// usamos usuário 2 pois tem mais pedidos
const userId = "2"

export default function ReviewForm({ produtoId, onSuccess }) {
  const [nota, setNota] = useState(5)
  const [comentario, setComentario] = useState("")
  const [loading, setLoading] = useState(false)
  const [reviewedForm, setReviewedForm] = useState(false)

  async function checkIfReviewed() {
    try {
      const reviews = await apiFetch(`avaliacoes?usuarioId=${userId}&produtoId=${produtoId}`)
      const reviewToCheck = reviews[0]
      if (reviewToCheck) {
        setReviewedForm(reviewToCheck)
      } else {
        setReviewedForm(false)
      }
    } catch (err) {
      setReviewedForm(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const todaysDate = new Date()
      const formattedDate = todaysDate.getFullYear() + "-" + (todaysDate.getMonth() + 1) + "-" + todaysDate.getDate()

      const reviewBody = {
        usuarioId: userId,
        produtoId: produtoId,
        nota: Number(nota),
        comentario,
        data: formattedDate
      }

      const response = await postReview(reviewBody)      
      if (response != false) {        
        setReviewedForm(reviewBody)
        onSuccess && onSuccess("Avaliação enviada! R$5,00 creditados na sua carteira!")
      } else {
        onSuccess && onSuccess("Erro ao enviar avaliação")
      }
    } catch (err) {
      onSuccess && onSuccess("Erro ao enviar avaliação")
    }

    setLoading(false)
  }

  useEffect(() => {
    checkIfReviewed()
  }, [produtoId])

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="review-header">
        <div>
          <h2>{reviewedForm ? "Obrigado pela sua avaliação" : "Avalie este produto"}</h2>
          <p className="review-subtitle">
            {reviewedForm
              ? "Sua avaliação já foi registrada e não pode ser alterada."
              : "Escolha uma nota e conte como foi sua experiência com o produto."}
          </p>
        </div>
      </div>

      {reviewedForm && (
        <div className="review-summary">
          <div className="review-summary-title">Avaliação enviada</div>
          <div className="review-summary-item">
            <strong>Nota:</strong> {reviewedForm.nota}
          </div>
          <div className="review-summary-item">
            <strong>Comentário:</strong> {reviewedForm.comentario || "Sem comentário"}
          </div>
        </div>
      )}

      <label className="review-field">
        <span>Nota (1 a 5)</span>
        <select
          value={reviewedForm ? reviewedForm.nota : nota}
          onChange={e => setNota(e.target.value)}
          disabled={Boolean(reviewedForm)}
        >
          <option value={5}>5</option>
          <option value={4}>4</option>
          <option value={3}>3</option>
          <option value={2}>2</option>
          <option value={1}>1</option>
        </select>
      </label>

      <label className="review-field">
        <span>Comentário técnico</span>
        <textarea
          disabled={Boolean(reviewedForm)}
          value={reviewedForm ? reviewedForm.comentario : comentario}
          onChange={e => setComentario(e.target.value)}
          rows={5}
          placeholder={!reviewedForm ? "Descreva sua experiência com o produto, qualidade e pontos positivos ou negativos..." : ""}
        />
      </label>

      <button type="submit" disabled={loading || Boolean(reviewedForm)}>
        {loading ? "Enviando..." : reviewedForm ? "Avaliação registrada" : "Enviar avaliação e Ganhar R$ 5,00"}
      </button>
    </form>
  )
}
