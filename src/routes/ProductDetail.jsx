import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import apiFetch from "../hooks/ApiFetch"
import ReviewForm from "../components/ReviewForm"
import getProductById from "../hooks/GetProductsById"
import "./ProductDetail.css"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const [product, setProduct] = useState(null)

  async function fetchProduct() {
    try {
      const productData = await getProductById(id)
      setProduct(productData)
    } catch (error) {
      console.error("Erro ao buscar produto:", error)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  function handleReviewSuccess(msg) {
    setMessage(msg)
    fetchProduct()
  }

  if (!product) {
    return <div className="loading">Carregando produto....</div>
  }

  return (
    <div className="product-detail-container">
      <button className="return-button" onClick={() => navigate(-1)}>Voltar</button>

      {message && <div className="success-message">{message}</div>}

      <div className="product-content">
        <div className="product-image-section">
          <img src={product.imagem} alt={product.nome} className="product-image" />
        </div>

        <div className="product-info-section">
          <div className="category">{(product.categoria).toUpperCase()}</div>
          <h1>{product.nome}</h1>

          <div className="price-info">
            <div className="price-item">
              <span className="price-label">Valor Pago</span>
              <span className="price-value">R$ {Number(product.preco).toFixed(2)}</span>
            </div>
          </div>

          <div className="description-section">
            <h3>Descrição do Produto</h3>
            <p>{product.descricao}</p>
            <p className="rating"><strong>Nota atual:</strong> {product.nota} ⭐</p>
          </div>
        </div>
      </div>
      
      <div className="review-section">
        <h3>Sua avaliação</h3>
        <ReviewForm produtoId={product.id} onSuccess={(msg) => handleReviewSuccess(msg)} />
      </div>
    </div>
  )
}

export default ProductDetail