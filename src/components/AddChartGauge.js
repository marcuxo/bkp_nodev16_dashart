import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import LoginContext from '../context/login_context/LoginContext';
import { ListMedidores } from '../API/ListMedidores.api';

//icons
import { LuGauge,LuLineChart } from "react-icons/lu";
import { FaTrashAlt, FaPlus } from "react-icons/fa";


export const AddChartGauge = ({n_id_u}) => {
  // console.log(n_id_u)

  const {LoginState,SetLogin,CloseLogin,GetLoginSession} = useContext(LoginContext);
  // console.log(LoginState.planta)
  
  const [MedDataBrute, setMedDataBrute] = useState({});//datos desde api
  const [MedData, setMedData] = useState({});//dato que se guarda en session storage
  const [MediList, setMediList] = useState([]);//opciones del select
  const [SelectMed, setSelectMed] = useState({});//id de opcion seleccionada
  const [TypeChart, setTypeChart] = useState("gauge");//guarda el tipo de chart

  const HandleSelect = async (e) => {
    console.log(e.target.value)
    // let finder = await MediList.find(sdb => sdb._id === e.target.value)
    // console.log(finder)
    setSelectMed(e.target.value)
    // setMedData(e.target.value)
  }

  const GetListOfMedidoresNespra = async () => {
    let mediList = await ListMedidores({empresa:LoginState.planta})
    // console.log(mediList)
    let parList = await mediList["m1"].map(adf =>{
      let {_id,MEDIDOR,TIPO} = adf
      return {_id,MEDIDOR,TIPO}
    })
    // console.log(parList)
    setMediList(parList)
    setMedDataBrute(mediList["m1"])
  }

  const MakeAChart = async () => {
    let DataSele = await MedDataBrute.find(adg=>adg._id === SelectMed)
    // console.log(DataSele)
    setMedData({['CHART']:"gauge",['N_ID_U']:n_id_u,['DATA']:DataSele})
    // console.log(SelectMed,TypeChart,n_id_u)
    
  }
  const DeleteMedidorData = async () => {
    sessionStorage.removeItem(`UD_${n_id_u}`)
    // setMediList([])
    setSelectMed({})
    setTypeChart('')
  }

  useEffect(() => {
    GetListOfMedidoresNespra()
    let elDato = sessionStorage.getItem(`UD_${n_id_u}`)
    if(elDato!==null){
      let n = JSON.parse(elDato)
      // console.log(n)
      setSelectMed(n.DATA._id)
      setTypeChart(n.CHART)
    }

    return () => {
    }
  }, [])

  useEffect(() => {
    // console.log(MedData)
    if(MedData?.DATA){
      sessionStorage.setItem(`UD_${n_id_u}`,JSON.stringify(MedData))
    }
    return () => {
      
    }
  }, [MedData])
  
  return (
    <div className='col-12'>
      <div className='row' style={{margin: '0px'}}>
        <div className='col-12 my-2 col-md-5'>
          <FormControl fullWidth size='small'>
            <InputLabel id="demo-simple-select-label" size='small'>Medidor</InputLabel>
            <Select
              size='small'
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={SelectMed}
              name='Medidor'
              label="Medidor"
              onChange={HandleSelect}
            >
              {
                MediList.map(lst => (
                  <MenuItem style={{fontSize: "smaller"}} key={lst._id} value={lst._id}>{lst.MEDIDOR} - {lst.TIPO}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className='col-12 my-2 col-md-3' style={{display:'none'}}>
          <FormControl fullWidth size='small'>
            <InputLabel id="demo-simple-select-label" size='small'>Tipo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"gauge"}
              name='Tipo'
              label="Tipo"
              // onChange={(e)=>setTypeChart(e.target.value)}
            >
              <MenuItem style={{fontSize: "smaller"}} value={"gauge"}><LuGauge size={'16px'} style={{marginRight: "10px"}}/> Gauge</MenuItem>
              {/* <MenuItem style={{fontSize: "smaller"}} value={"line"}><LuLineChart size={'16px'} style={{marginRight: "10px"}}/> Area</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        {/* <div className='col-6'>
          <label style={{fontSize:"10px", width: "100%"}}>Minimo</label>
          <input type='number' className='form-control form-contro-sm' />
        </div>
        <div className='col-6'>
          <label style={{fontSize:"10px", width: "100%"}}>Maximo</label>
          <input type='number' className='form-control form-contro-sm' />
        </div> */}
        
        <div className='col-12 my-2 col-md-4 text-center'>
          <Button variant='contained' color='error' onClick={()=>DeleteMedidorData()}> <FaTrashAlt /></Button>
          <span>  </span>
          <Button variant='contained' color='success' onClick={()=>MakeAChart()}> <FaPlus /></Button>
        </div>
      </div>
    </div>
  )
}