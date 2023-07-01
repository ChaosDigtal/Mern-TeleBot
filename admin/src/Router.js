import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./Pages/Login/Login"
import Dashboard from "./Pages/Dashboard/Dashboard"

export default function Routers() {
    return (
      <Router basename='/admin'>
        <Routes>
          <Route exact path='/' element={<Login />}></Route>
        
          <Route path='/login' element={<Login />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Routes>
      </Router>
    )
  }