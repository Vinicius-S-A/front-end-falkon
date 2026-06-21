import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import apiFetch from "../hooks/ApiFetch"
import "./Home.css"

import starIcon from "../assets/star.svg"
import starSolidIcon from "../assets/starsolid.svg"

// hooks para endpoints
import getProducts from "../hooks/GetProducts"
import getOrders from "../hooks/GetUserOrders"

// usamos usuário 2 pois é o que tem mais pedidos no db
const userId = "2"

const Home = () => {
  const products = getProducts()
  const [user, setUser] = useState(null)
  const userOrders = getOrders(userId)

  useEffect(() => {
    apiFetch(`usuarios/${userId}`)
      .then(setUser)
      .catch(console.error)
  }, [])

  const purchased = []

  // filtrar pedidos do usuario
  for (const order of userOrders) {
    const product = products.find(product => product.id === order.produtoId)

    if (product) {
      purchased.push({
        ...product,
        avaliado: order.avaliado,
        dataCompra: order.data,
        precoCompra: order.valor_pago
      })
    }
  }

  //simples filtragem para mostrar os produtos não avaliados primeiro
  for (let i = 0; i < purchased.length - 1; i++) {
    for (let j = i + 1; j < purchased.length; j++) {
      if (purchased[i].avaliado && !purchased[j].avaliado) {
        const temp = purchased[i]
        purchased[i] = purchased[j]
        purchased[j] = temp
      }
    }
  }

  return (
    <div className="home-container">
      <div className="header">
        <div>
          <h1>Produtos Comprados</h1>
          <p className="subtitle">Veja o que você comprou e deixe sua avaliação.</p>
        </div>
        <div className="carteira-container">
          <div className="carteira-label">Saldo da Carteira</div>
          <div className="carteira-amount">{user ? `R$ ${Number(user.carteira_saldo).toFixed(2)}` : 'Carregando...'}</div>
        </div>
      </div>

      {purchased.length === 0 ? (
        <p className="sem-produtos-warning">Você não possui compras registradas! Realize uma compra para começar a avaliar produtos.</p>
      ) : (
        <div className="products-grid">
          {purchased.map(prod => (
            <div key={prod.id} className="product-card">
              <div className="product-card-image">
                <img className="product-image" src={prod.imagem} />
              </div>

              <div className="product-card-info">
                <div className="product-card-top">
                  <h3>{prod.nome}</h3>
                  <span className="product-category">{prod.categoria?.toUpperCase()}</span>
                </div>

                <p className="product-description">{prod.descricao}</p>

                <div className="product-meta-row">
                  <span>Comprado em {prod.dataCompra}</span>
                  <span className="product-price">R$ {Number(prod.precoCompra).toFixed(2)}</span>
                </div>

                <div className="product-rating-row">
                  <span className="rating-value">{(prod.nota).toFixed(1) ?? 'Sem nota'}</span>
                  <span className="rating-scale">/ 5.0</span>
                  {[...Array(Math.round(prod.nota))].map(() => (
                    <img src={starSolidIcon} className="rating-star" />
                  ))}
                  {[...Array(5 - Math.round(prod.nota))].map(() => (
                    <img src={starIcon} className="rating-star" />
                  ))}
                </div>

                <Link
                  to={`/produto/${prod.id}`}
                  className={prod.avaliado ? 'reviewed-button' : 'review-button'}
                >
                  {prod.avaliado ? 'Ver Avaliação' : 'Avaliar Produto'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home