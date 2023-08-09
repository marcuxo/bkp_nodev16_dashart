import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Drawer } from '@mui/material';
import LoginContext from '../context/login_context/LoginContext';

import MenuIcon from '@mui/icons-material/Menu';
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

import './main.css'

import dayjs from 'dayjs'
import { VERSION } from '../router/Url';
var weekOfYear = require('dayjs/plugin/weekOfYear')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(weekOfYear)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs().tz('America/Santiago')

export const HeaderMenu = ({Pag_Sel}) => {
  const navigate = useNavigate();
  const {LoginState,SetLogin,CloseLogin,GetLoginSession} = useContext(LoginContext);
  const [PageSelcected, setPageSelcected] = useState(Pag_Sel)
  const [IsHiddedn, setIsHiddedn] = useState(true);
  // console.log(LoginState.user)

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const HandleCloseSession = async () => {
    CloseLogin()
    navigate('/')
  }

  const Make_A_File_whit_all_Data = async () => {
    
  }

  return (
    <>
      <div className='container-fluid header mb-2'>
        <div className='row'>

<div className='col-12'>
  <div className='row'>
        
<div className="ocean_2">
  <div className="wave_2"></div>
  <div className="wave_2"></div>
  <div className="wave_2"></div>
</div>
    <div className='col-3 my-2'>
      <img src={require('../assets/logo_main.png')} height={'50px'}/>
    </div>
    <div className='col-9 p-auto m-auto'>
      <div className='row'>
        <div className='col-10'>
          <div className='row'>
            <div className='col-12 hidden-xs col-md-6'>
              <b>{LoginState.planta}</b>
            </div>
            <div className='col-12 col-md-6 text-right'>
              {LoginState.user}
            </div>
          </div>
        </div>
        <div className='col-2 text-right p-auto m-auto'>
          <span className='menubtn' onClick={toggleDrawer('right', true)}><MenuIcon/></span>
        </div>
      </div>
    </div>
  </div>
</div>
          
  

        </div>
      </div>

      <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        <div className='menu-container'>
            <img src={require('../assets/logo_main.png')} style={{height: "150px", }} className='px-5' />
            <hr/>
            <br/>
            {/*   */}

            {/* <div className='' onClick={toggleDrawer('right', false)}>
              <p className={PageSelcected==='buscar'?'menu-item selected-item':'menu-item'} onClick={()=>navigate('/buscar')}><PlagiarismOutlinedIcon className='color-icon-menu'/><span className='spacing'></span> Editar Transporte</p>
            </div> */}

            <div className='' onClick={toggleDrawer('right', false)}>
              <p className={PageSelcected==='dashboard'?'menu-item selected-item':'menu-item'} onClick={()=>navigate('/dashboard')}><DashboardIcon className='color-icon-menu'/><span className='spacing'></span> DashBoard</p>
            </div>

            {/* <div className='' onClick={toggleDrawer('right', false)}>
              <p className={PageSelcected==='datos'?'menu-item selected-item':'menu-item'} onClick={()=>navigate('/datos')}><ListAltIcon className='color-icon-menu'/><span className='spacing'></span> Datos</p>
            </div>
            
            
            <div className='' onClick={toggleDrawer('right', false)}>
              <p className='menu-item' onClick={()=>Make_A_File_whit_all_Data()}><MoveToInboxIcon className='color-icon-menu'/><span className='spacing'></span> Descargar Archivo</p>
            </div> */}

            <br/>
            <hr/>
            <p className='menu-item' onClick={()=>HandleCloseSession()}>
              <OutputOutlinedIcon className='color-icon-menu'/><span className='spacing'></span> Salir
            </p>
            <div className='menu-footer-version'>
              <small>version {VERSION}</small>
            </div>
        </div>
      </Drawer>
      
    </>
  )
}
