import { useEffect, useState } from "react"
import { apiFetch } from "./ApiFetch"

function useProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    apiFetch(`produtos`)
      .then(setProducts)
      .catch(console.error)
  }, [] )

  return { 
    products 
  }
}

export default useProducts