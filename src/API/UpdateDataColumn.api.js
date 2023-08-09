import React from 'react'
import { URL_NESPRA_DATAMED } from '../router/Url';

export const UpdateDataColumn = ({SENSOR, N_MED}) => {
  // console.log(SENSOR, N_MED)


  let OneWeek = 604800;
  let OneDay = 86400;
  let OneHour = 3600;
  let OneMinit = 60

  let now = Math.floor((new Date).getTime()/1000)//segundos now
  let pasado = now - OneWeek;
  // console.log(now,"=>",pasado)

  return new Promise(async (resolve, reject) => {
    let query = await fetch(`${URL_NESPRA_DATAMED}?deveui=f8-dc-7a-57-e1-94&t0=${pasado}&t1=${now}&sensor_labels=${SENSOR}&ig_module=rtu&slave_address=${N_MED}`,{
      method: 'GET',
      headers: {
        'x-api-key':"XZIqIvG8hX9QwkquKBF1k1nfbhJSB7333aJNq42a",
        'Authorization': "a02Xz3KWVn7TXn31hF04JWDj6-iQ5xNERUK7h021okM",
      }
    })
    let responsito = await query.json();
    // console.log("===>",responsito)
    if(responsito.length){
      resolve(responsito)
    }
  })
}
