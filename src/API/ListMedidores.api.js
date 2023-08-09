import React from 'react'
import { URL_CTRL_HIDRIC } from '../router/Url';

export const ListMedidores = ({empresa}) => {
  return new Promise(async (resolve, reject) => {
    let query = await fetch(URL_CTRL_HIDRIC+'getnespramedidores',{
      method: 'POST',
      headers: {
        'authorization': "paico2021",
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        empresa: empresa
      })
    })
    let responsito = await query.json();
    // console.log(responsito.body.MEDIDORES)

    if(responsito.success){
      resolve(responsito.body.MEDIDORES)
    }else{
      resolve(responsito.body.MEDIDORES)
    }
  })
}
