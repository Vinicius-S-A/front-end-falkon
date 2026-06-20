import { useEffect, useState } from "react"
import apiFetch from "./ApiFetch"

function getProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    apiFetch(`produtos`)
      .then(setProducts)
      .catch(console.error)
  }, [] )

  return products 
}

export default getProducts