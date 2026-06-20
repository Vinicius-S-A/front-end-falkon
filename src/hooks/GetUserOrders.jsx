import { useEffect, useState } from "react"
import apiFetch from "./ApiFetch"

function getOrders(userId) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    apiFetch(`pedidos?usuarioId=${userId}`)
      .then(setOrders)
      .catch(console.error)
  }, [userId])

  return orders
}

export default getOrders