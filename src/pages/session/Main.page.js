import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { HeaderMenu } from '../../components/HeaderMenu.comp'
import GaugeOne from '../../components/charts/GaugeOne.chart'
import { LineOne } from '../../components/charts/LineOne.chart'
// import { UpdateDataLectura } from '../../API/UpdateDataLectura.api';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import LoginContext from '../../context/login_context/LoginContext';
import { ListMedidores } from '../../API/ListMedidores.api';
import './index.css'

//icons
import { BsArrowsFullscreen } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { AddChartGauge } from '../../components/AddChartGauge';
import { AddChartLine } from '../../components/AddChartLine';

function Main() {
  const {LoginState,SetLogin,CloseLogin,GetLoginSession} = useContext(LoginContext);
  // console.log(LoginState.planta)
  const [MediList, setMediList] = useState([]);
  const [colF1, setColF1] = useState(3);
  const [cantColF1, setCantColF1] = useState([]);
  const [colF2, setColF2] = useState(3);
  const [cantColF2, setCantColF2] = useState([]);

  const [SelectMed, setSelectMed] = useState({});
  const [SettingsMenu, setSettingsMenu] = useState(true);

  const launchFullScreen = async () => {
    let container = document.getElementById('container')
    // console.log("full screen")
    if(container.requestFullScreen) {
      container.requestFullScreen();
    } else if(container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if(container.webkitRequestFullScreen) {
      container.webkitRequestFullScreen();
    }
  }

  let reqest = async () => {
    // UpdateDataLectura();
  }

  const GetListOfMedidoresNespra = async () => {
    let mediList = await ListMedidores({empresa:LoginState.planta})
    setMediList(mediList);
  }

  const HandleSelect = async (e) => {
    console.log(e.target.value)
    setSelectMed(e.target.value)
  }

  const ObtainDataOfSessionStorage = async () => {
    let med_u = ["UD_1","UD_2","UD_3","UD_4","UD_5","UD_6"]
    let med_d = ["DD_1","DD_2","DD_3"]
    let arr = [];
    let arr_ = [];
    for (let mm = 0; mm < med_u.length; mm++) {
      const mm_ = med_u[mm];
      let a = sessionStorage.getItem(mm_)
      let itm = JSON.parse(a)
      if(itm){
        // console.log(itm)
        arr.push({
          "ID": itm.DATA._id,
          "CHART": itm.CHART,
          "DATA": itm.DATA
        })
      }
    }

    for (let mm = 0; mm < med_d.length; mm++) {
      const mm_ = med_d[mm];
      let a = sessionStorage.getItem(mm_)
      let itm = JSON.parse(a)
      if(itm){
        // console.log(itm)
        arr_.push({
          "ID": itm.DATA._id,
          "CHART": itm.CHART,
          "DATA": itm.DATA
        })
      }
    }
    setCantColF1(arr)
    setCantColF2(arr_)
  }

  const CloseMenuSettings = async (close) => {
    setSettingsMenu(close)
    ObtainDataOfSessionStorage()
  }
  
  useEffect(() => {
    GetListOfMedidoresNespra()
    reqest()
    return () => {
      // reqest()
    }
  }, [])
  
  useLayoutEffect(() => {
    ObtainDataOfSessionStorage()
    return () => {
    };
  }, [])
 
  return (
    <div>
      <HeaderMenu Pag_Sel={'dashboard'} />
      <button className='btn btn-activo' onClick={()=>launchFullScreen()}><BsArrowsFullscreen /></button>
      <button className='btn btn-activo-2' onClick={()=>setSettingsMenu(!SettingsMenu)}><AiOutlineSetting /></button>
      

      <div className='container-fluid stilo' id='container'>
        <div className='row pt-5 d-flex justify-content-around'>

          {
            cantColF1.map(cl => (
              
              <div key={cl.ID} className={`col-12 responsive-col col-md-${Math.floor(12/cantColF1.length)}`}>
                {
                  cl.CHART==="gauge"?<GaugeOne key={cl.ID} DATA={cl.DATA} />:<LineOne key={cl.ID} DATA={cl.DATA}  />
                }
              </div>
            ))
          }

      {/* <div className='container-fluid menu-off'>
        <div className='row'>
          <div className='col-6 py-2'>
            <div className='row'>
              <div className='col-12 pt-3'>
                <FormControl fullWidth size='small'>
                  <InputLabel id="demo-simple-select-label">Medidor---</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={SelectMed}
                    name='Medidor'
                    label="Medidor"
                    onChange={HandleSelect}
                  >
                    {
                      MediList.map(lst => (
                        <MenuItem style={{fontSize: "smaller"}} key={lst._id} value={lst}>{lst.MEDIDOR} - {lst.TIPO}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div className='col-12 pt-3'></div>
              <div className='col-12 pt-3 text-center'>
                <Button variant='contained' size='small' onClick={()=>console.log(SelectMed)}> Agregar Medidor</Button>
              </div>
            </div>
          </div>
          <div className='col-6 py-2'>
            <div className='row'>
              <div className='col-12 pt-3'>
                <FormControl fullWidth size='small'>
                  <InputLabel id="demo-simple-select-label">Medidor</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={SelectMed}
                    name='Medidor'
                    label="Medidor"
                    onChange={HandleSelect}
                  >
                    {
                      MediList.map(lst => (
                        <MenuItem style={{fontSize: "smaller"}} key={lst._id} value={lst}>{lst.MEDIDOR} - {lst.TIPO}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div className='col-12 pt-3'></div>
              <div className='col-12 pt-3 text-center'>
                <Button variant='contained' size='small' onClick={()=>console.log(SelectMed)}> Agregar Medidor</Button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

          {
            cantColF2.map(cl => (
              <div key={cl.ID} className={`col-12 col-md-${Math.floor(12/cantColF2.length)}`}>
                {
                  cl.CHART==="line"?<LineOne key={cl.ID} DATA={cl.DATA} />:null
                }
                  
              </div>
            ))
          }

        </div>
      </div>


      <Button variant='contained' onClick={()=>console.log(cantColF1, cantColF2)}>ASDASDASD</Button>

      <div className={SettingsMenu?'settings menu-off':'settings'} id='settings'>
        <div className='container-fluid pt-3'>
          <div className='row'>
            <div className='col-12 text-center'>
              <button className='btn btn-info btn-sm' onClick={()=>CloseMenuSettings(!SettingsMenu)}>Cerrar</button>
            </div>
            <div className='col-12 py-2 mt-2 card-chart-line'>
              <div className='row'>
                <div className='col-12'>
                  <AddChartGauge n_id_u={1} />
                </div>
                <div className='col-12'>
                  <AddChartGauge n_id_u={2} />
                </div>
                <div className='col-12'>
                  <AddChartGauge n_id_u={3} />
                </div>
                <div className='col-12'>
                  <AddChartGauge n_id_u={4} />
                </div>
                <div className='col-12'>
                  <AddChartGauge n_id_u={5} />
                </div>
                <div className='col-12'>
                  <AddChartGauge n_id_u={6} />
                </div>

                {/* <div className='col-12 col-md-4'>
                  <AddChartLine n_id_d={1} />
                </div>
                <div className='col-12 col-md-4'>
                  <AddChartLine n_id_d={2} />
                </div>
                <div className='col-12 col-md-4'>
                  <AddChartLine n_id_d={3} />
                </div> */}
              </div>
            </div>

            <div className='col-12 py-2 mt-2 card-chart-line'>
              <div className='row'>
                <div className='col-12'>
                  <AddChartLine n_id_d={1} />
                </div>
                <div className='col-12'>
                  <AddChartLine n_id_d={2} />
                </div>
                <div className='col-12'>
                  <AddChartLine n_id_d={3} />
                </div>

                {/* <div className='col-12 col-md-4'>
                  <AddChartLine n_id_d={1} />
                </div>
                <div className='col-12 col-md-4'>
                  <AddChartLine n_id_d={2} />
                </div>
                <div className='col-12 col-md-4'>
                  <AddChartLine n_id_d={3} />
                </div> */}
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main