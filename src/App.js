// all imports

import CarbonIndex from "./components/CarbonAPI"
import React from "react"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"


function App() {
  return (
  <Router >
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/CarbonAPI" element={<CarbonIndex />} /> 
    </Routes>
  </Router>
  )
}

export default App
