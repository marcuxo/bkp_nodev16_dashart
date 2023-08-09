import React, { useContext, useLayoutEffect, useState } from 'react'
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Tooltip, Zoom } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ContactSupportTwoToneIcon from '@mui/icons-material/ContactSupportTwoTone';
import AccountCircle from '@mui/icons-material/AccountCircle'
import PasswordIcon from '@mui/icons-material/Password';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../context/login_context/LoginContext';

export default function Login() {
  const navigate = useNavigate();

  const {LoginState,SetLogin,CloseLogin,GetLoginSession} = useContext(LoginContext);
  

  useLayoutEffect(() => {
    // if(LoginState.token!=='NO-TOKEN')navigate('/dashboard')
  }, [LoginState])
  

  const [valores, setValores] = useState({
    user:'',
    password:'',
    showPassword: false,
    isSubmit: false,
    errorMessage: null
  })

  const HandleSetData = async (e) => {
    setValores({...valores,[e.target.name]:e.target.value.trim()})
  }

  // show or hide pass input
  const handleClickShowPassword = () => {
    setValores({
      ...valores,
      showPassword: !valores.showPassword,
    });
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // verify login
  const HandleSubmit = async () => {
    const isLogin = await SetLogin({valores})
    // console.log(isLogin)
    if(isLogin.success){
      navigate('./dashboard')//ingresar_transporte
    }else{
      setValores({...valores,errorMessage:isLogin.error})
    }
  }

  return (
    <>
      <div className="container-fluid bg-ariztia">
      <div className="row" style={{height: '100vh'}}>
        <div className="col-12 col-md-6 d-flex align-items-center text-center justify-content-center">
          <img src={require(`../../assets/logo_ariztia.png`)} alt="Ariztia" />
        </div>
        <div className="col-12 col-md-5 px-3 fondo d-flex align-items-center text-center justify-content-center performance-2-2" >
          <div className="row">
            <div className="col-12 text-left">
              <h3>Nombre Aplicacion</h3>
            </div>
            <div className="col-12 pt-3">
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="input-username">
                  Usuario
                </InputLabel>
                <Input
                  type="email"
                  name='user'
                  value={valores.user}
                  onChange={(e)=>HandleSetData(e)}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-12 pt-3">
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="input-password">Contraseña</InputLabel>
              <Input
                type={valores.showPassword ? 'text' : 'password'}
                name='password'
                value={valores.password}
                onChange={(e)=>HandleSetData(e)}
                startAdornment={
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {valores.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            </div>
            <div className="col-12">
              {valores.errorMessage?
              <small className="text-danger">{valores.errorMessage}</small>
              :null
              }
            </div>
            <div className="col-12 pt-5 text-right">
              <Button
                fullWidth
                variant="contained"
                size="small"
                onClick={()=>HandleSubmit()}
                endIcon={<AssignmentIndIcon />} >Entrar</Button>
            </div>
            <div className='col-12'>
              <div className='row'>
                <div className='col-6'>
                  {/* <Tooltip
                    title='Solo se permitira crear cuentas con correos corporativos de ariztia.'
                    TransitionComponent={Zoom}
                    arrow>
                    <Button className="mt-3"
                      size="small"
                      onClick={()=>navigate('/crear_cuenta')}
                      endIcon={<ContactSupportTwoToneIcon />}>Crear Cuenta</Button>
                  </Tooltip> */}
                </div>
                <div className='col-6'>
                  <Button className="mt-3" size="small" onClick={()=>navigate('/recuperar_cuenta')} >Recuperar Contraseña</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
