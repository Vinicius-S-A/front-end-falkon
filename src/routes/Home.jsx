import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import apiFetch from "../hooks/ApiFetch"
import "./Home.css"

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

  console.log(userOrders)

  const purchased = userOrders.map(order => products.find(product => product.id === order.produtoId)).filter(Boolean)

  return (
    <div className="home-container">
      <div className="header">
        <h1>Minhas Compras</h1>
        <div className="wallet-container">
          <div className="wallet-label">Saldo da Carteira</div>
          <div className="wallet-amount">{user ? `R$ ${Number(user.carteira_saldo).toFixed(2)}` : 'Carregando...'}</div>
        </div>
      </div>

      {purchased.length === 0 ? (
        <p>Você não possui compras registradas! Realize uma compra para começar a avaliar produtos.</p>
      ) : (
        <div className="products-grid">
          {purchased.map(prod => (
            <div key={prod.id} className="product-card">
              <h3>{prod.nome}</h3>
              <p className="product-description">{prod.descricao}</p>
              <div className="product-footer">
                <h3>Nota média: {prod.nota ?? 'Carregando...'}</h3>
                <Link to={`/produto/${prod.id}`} className="evaluate-link">Avaliar</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home