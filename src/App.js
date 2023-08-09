import React from 'react'
import LoginState from './context/login_context/LoginState'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login.page'
import './App.css'
import { ProtectedRouter } from './components/Protected/ProtectedRouter'
import Main from './pages/session/Main.page'

function App() {
  return (
    <LoginState>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route path='/dashboard' element={
          <ProtectedRouter>
            <Main />
          </ProtectedRouter>
        }/>

        {/* <Route path='/datos' element={
          <ProtectedRouter>
            <PAGINAS />
          </ProtectedRouter>
        }/> */}

        <Route path='*' element={<Login />} />
        
      </Routes>
    </LoginState>
  )
}

export default App