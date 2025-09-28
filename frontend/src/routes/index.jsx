import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../components/web/home'
import Error from '../components/web/error'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes