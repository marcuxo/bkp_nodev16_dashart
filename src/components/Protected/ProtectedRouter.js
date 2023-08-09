import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import LoginContext from '../../context/login_context/LoginContext'

export const ProtectedRouter = ({children}) => {
  const { LoginState } = useContext(LoginContext)

  if(LoginState.user === ""){
    return <Navigate to={'/'} replace={true} />
  }
  return children ? children : <Navigate to={'/'} replace={true}/>
}
