import React from 'react'
import { URL_NESPRA_DATAMED } from '../router/Url';

export const UpdateDataLectura = ({ DATA }) => {
  // console.log('DATOS TO UPDATE',SENSOR, N_MED)
  let contrato = DATA.CONTRATO

  // console.log("Contrato",DATA)
  // ******|NESPRA\*******************************************
  if(contrato === "NESPRA"){
    let fuente = DATA.FUENTE
    let url = DATA.URL
    let sensor = DATA.SENSOR
    let n_med = DATA.N_MED
    console.log("WE ARE IN NESPRA")
    let now = Math.floor((new Date).getTime() / 1000)
    let antes = now - 600
    let antes_2H = now - (60 * 60 * 32)
    let antes_15M = now - (60 * 15)
    // console.log("************************>",antes_15M,now)
    
  
    const ReserveLasData = async () => {
      console.log("Buscando el ultimo dato guardado del medidor")
      return new Promise(async (resolve, reject) => {
        let query = await fetch(`${url}?deveui=${fuente}&t0=${antes_2H}&t1=${now}&sensor_labels=${sensor}&ig_module=rtu&slave_address=${n_med}`, {
          method: 'GET',
          headers: {
            'x-api-key': "XZIqIvG8hX9QwkquKBF1k1nfbhJSB7333aJNq42a",
            'Authorization': "a02Xz3KWVn7TXn31hF04JWDj6-iQ5xNERUK7h021okM",
          }
        })
        let responsito = await query.json();
        if (responsito.length) {
          console.log("Buscando el ultimo dato guardado del medidor",responsito[0])
          resolve([responsito[0]])
        }else{
          resolve({error:true,msg: "No hay datos para mostrar. [err: 500]"})
        }
      })
    }
  
  
    return new Promise(async (resolve, reject) => {
      let query = await fetch(`${url}?deveui=${fuente}&t0=${antes_15M}&t1=${now}&sensor_labels=${sensor}&ig_module=rtu&slave_address=${n_med}`, {
        method: 'GET',
        headers: {
          'x-api-key': "XZIqIvG8hX9QwkquKBF1k1nfbhJSB7333aJNq42a",
          'Authorization': "a02Xz3KWVn7TXn31hF04JWDj6-iQ5xNERUK7h021okM",
        }
      })
      let responsito = await query.json();
      // console.log("===>",responsito)
      if (responsito.length) {
        resolve(responsito)
      }else{
        resolve(ReserveLasData())
      }
    })
  }
  // ******|NESPRA\*******************************************
  // ******|E-SMART/*******************************************
  if(contrato === "E-SMART"){
    let fuente = DATA.FUENTE//NOMBRE MEDIDORE
    let url = DATA.URL
    let sensor = DATA.SENSOR//TIPO DE LECTURA(INSTANTANEA=M1, ACUMULADOR=M2)
    let n_med = DATA.N_MED//PARA E-SMART NO SE UTILIZA
    

    // console.log("WE ARE IN E-SMART")
    let now = new Date().getTime()
    let antes = now - 600
    let antes_15M = now - (1000 * 60 * 50)
    // console.log("|||||||||==============>",antes_15M,now,)
    return new Promise(async (resolve, reject) => {
      let query = await fetch(`${url}?topico=${fuente}&fechaInicio=${antes_15M}&fechaTermino=${now}`, {
        method: 'GET',
        headers: {
          'Content-Type': "application/json",
          'Accept': "application/json",
          'Authorization': "6lPalweZzMwj6qsivQ$xBfFo",
          'Mail': "elpaico@ariztia.cl",
        }
      })
      let responsito = await query.json();
      if (responsito.statusCode) {
        let DatoMed = responsito.body.data[responsito.body.data.length-1]
        // console.log("===>",DatoMed)
        resolve([{"TimeStamp":DatoMed.timestamp, "m1":DatoMed.caudal}])
      }else{
        resolve()
      }
    })
  }

}


// ,{
//   deveui: "f8-dc-7a-5a-37-ca",
//   t0: antes+"",
//   t1: now+"",
//   sensor_labels: "m1,m2",
//   ig_module: "rtu",
//   slave_address:"2"
// }
