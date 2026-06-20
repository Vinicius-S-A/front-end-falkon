import { Link } from "react-router-dom"
import "./ErrorPage.css"

const ErrorPage = () => {  
  return (
    <div className="error-page">
      <div className="error-card">
        <div className="error-text">404</div>
        <div className="error-body">
          <h1>Página não encontrada</h1>
          <p>Não foi possível carregar a página.</p>
          <div>
            <Link to="/" className="button">
              Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage