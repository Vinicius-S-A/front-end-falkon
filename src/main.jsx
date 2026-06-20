import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

import './index.css'
import ErrorPage from './routes/ErrorPage.jsx'

import Home from './routes/Home.jsx'
import ProductDetail from './routes/ProductDetail.jsx'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/produto/:id",
    element: <ProductDetail />,
    errorElement: <ErrorPage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
