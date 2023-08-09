import React, { useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import { URL_LOGIN } from '../../router/Url';
import LoginContext from './LoginContext';
import LoginReducer from './LoginReducer'

const initialState = {
  user: "",
  planta: "",
  token: "",
  rol: "",
  area: ""
}

const LoginState = (props) => {
  const [state, dispatch] = useReducer(LoginReducer, initialState);
  const navigation = useNavigate();

  useEffect(() => {
    let user = sessionStorage.getItem('user')
    let token = sessionStorage.getItem('token')
    let planta = sessionStorage.getItem('planta')
    let area = sessionStorage.getItem('area')
    let rol = sessionStorage.getItem('rol')
    if(user && token && planta){
      dispatch({
        type: 'SETLOGIN',
        payload: {
          area: area,
          user: user,
          planta: planta,
          token: token,
          rol: rol
        }
      })
      navigation('/dashboard')
    }
  }, [])

  // methods

  const SetLogin = async ({valores}) => {
    return new Promise(async(resolve, reject) => {
      let query = await fetch(URL_LOGIN,{
        method: "POST",
        headers: {
          'authorization': "marcuxo",
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user:valores.user,
          clave:valores.password
        })
      })

      let responsio = await query.json();
      if(responsio.data.success){
        // console.log(responsio)
        sessionStorage.setItem('area',responsio.data.area)
        sessionStorage.setItem('user',responsio.data.nombre)
        sessionStorage.setItem('planta',responsio.data.empresa)
        sessionStorage.setItem('token',responsio.data.token)
        sessionStorage.setItem('rol',responsio.data.user)
        dispatch({
          type: 'SETLOGIN',
          payload: {
            area: responsio.data.area,
            user: responsio.data.nombre,
            planta: responsio.data.empresa,
            token: responsio.data.token,
            rol: responsio.data.user
          }
        })
        resolve(responsio.data)     
      }else{
        resolve(responsio.data)
      }
    })
  }

  const GetLoginSession = async () => {
    return new Promise(async (resolve, reject) => {
      const user = sessionStorage.getItem('user')
      const token = sessionStorage.getItem('token')

      if(user && token) {
       
        dispatch({
          type: 'SETLOGIN',
          payload: {
            user: user,
            token: token,
            loginDate: new Date().toUTCString()
          }
        })
        resolve(true)

      } else {
        resolve(false)
      }

    })
  }

  const CloseLogin = async () => {
    sessionStorage.clear()
    return (dispatch({
      type: 'SETLOGIN',
      payload: {
        user: '',
        planta: '',
        token: '',
        rol: ''
      }
    }))
  }
  
  return (
    <LoginContext.Provider
      value={{
        LoginState:state,
        SetLogin,
        CloseLogin,
        GetLoginSession
      }}
    >
      {props.children}
    </LoginContext.Provider>
  )
}

export default LoginState