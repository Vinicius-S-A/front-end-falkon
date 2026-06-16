import { useEffect, useState } from "react"
import { apiFetch } from "../services/api"

export function useOrders(userId) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    apiFetch(`pedidos?usuarioId=${userId}`)
      .then(setOrders)
      .catch(console.error)
  }, [userId])

  return { orders }
}