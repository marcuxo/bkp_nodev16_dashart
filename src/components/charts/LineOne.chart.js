import React, { useEffect, useLayoutEffect, useState } from 'react'

import solidGauge from 'highcharts/modules/solid-gauge'
import highchartsMore from 'highcharts/highcharts-more'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { UpdateDataColumn } from '../../API/UpdateDataColumn.api'

export const LineOne = ({DATA}) => {
  // console.log(DATA)
  let title = DATA.MEDIDOR
  let subTitle = DATA.TIPO
  let unidad_med = DATA.UNIDAD
  const [state, setstate] = useState()
  const [IsREnder, setIsREnder] = useState(false)
  // console.log(new Date(1483232400000).toISOString())
  // console.log(state)

  useLayoutEffect( ( ) => {
    // console.log('===========>',Highcharts)
    // highchartsMore(Highcharts);
    // solidGauge(Highcharts);
    setstate(options)
    setIsREnder(true)
  },[])

  let UpdateChartNow = async () => {
    // console.log(state.series[0].data)
    let datas = await UpdateDataColumn({SENSOR:DATA.SENSOR, N_MED:DATA.N_MED})//return m2;yymmddhh//[Date.UTC(1971, 7, 4, 0, 0), 0.57]
    let aa = await datas.map(itm =>{
      let {m2,yymmddhh} = itm
      let p_ = String(yymmddhh).match(/.{1,2}/g)
      let q = [
        Number("20"+p_[0]), 
        Number(p_[1])-1,
        // Number(p_[2]),
        Number(p_[3])-4<0?Number(p_[2])-1:Number(p_[2]),
        Number(p_[3])-4<0?(24-(4-Number(p_[3]))):Number(p_[3])-4,
        0
      ]
      // console.log(q[0],q[1],q[2],q[3],q[4],m2)
      return [Date.UTC(q[0],q[1],q[2],q[3],q[4]),m2]
    })
    let arr_consumo = []
    for (let a_a = 1; a_a < aa.length; a_a++) {
      const a_a_ = aa[a_a];
      const a_a_a = aa[a_a-1];
      let Resultado_a = Number(a_a_[1]-a_a_a[1]).toFixed(2)
      // console.log(Resultado_a)
      arr_consumo.push([a_a_[0],Number(Resultado_a)])
      // console.log(a_a_a,a_a_)
    }
    // console.log(arr_consumo)
    // console.log(aa)
    
    let g = [{
      name: title,
      data: arr_consumo//aa
          // [
            // [Date("2023-08-04 18:00"), 0.45],
            // [Date("2023-08-04 19:00"), 0.4],
            // [Date("2023-08-04 20:00"), 0.39],
            // [Date("2023-08-04 18:00"), 0.56],
              // [Date.UTC(1971, 7, 4, 0, 0), 0.57],
              // [Date.UTC(1971, 7, 4, 6 ,0), 0.68],
              // [Date.UTC(1971, 7, 4, 7 ,0), 0.93],
              // [Date.UTC(1971, 7, 4, 8, 0), 1.11],
              // [Date.UTC(1971, 7, 4, 9, 0), 1.01],
              // [Date.UTC(1971, 7, 4, 10 ,0), 0.99],
            // [Date.UTC(1971, 0, 27), 1.17],
            // [Date.UTC(1971, 0, 30), 1.24],
            // [Date.UTC(1971, 1,  3), 1.41],
            // [Date.UTC(1971, 1,  6), 1.47],
            // [Date.UTC(1971, 1,  9), 1.4],
            // [Date.UTC(1971, 1, 12), 1.92],
            // [Date.UTC(1971, 1, 15), 2.03],
            // [Date.UTC(1971, 1, 18), 2.46],
            // [Date.UTC(1971, 1, 21), 2.53],
            // [Date.UTC(1971, 1, 24), 2.73],
            // [Date.UTC(1971, 1, 27), 2.67],
            // [Date.UTC(1971, 2,  3), 2.65],
          // ]
        }]
        setstate({...state,["series"]:g})
  }

  useEffect(() => {
    UpdateChartNow()
    setInterval(() => {
      UpdateChartNow()
    }, 1000*60*10);
  
    return () => {
      
    }
  }, [])
  

  const options = {
    chart: {
      type: 'column',
      zoomType: 'x',
      height: '400px'
    },
    title: {
        text: title,
        style: {
          // fontSize:'small',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          color: 'gray'
        }
    },
    subtitle: {
        text: subTitle + "/Hora",
        style: {
          // fontSize:'small',
          fontWeight: 'lighter',
          fontFamily: 'monospace',
          color: 'gray'
        }
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the year
            month: '%e. %b',
            year: '%b'
        },
        title: {
            text: ''
        }
    },
    legend: {
      align: 'left',
        verticalAlign: 'top',
        borderWidth: 0
    },
    yAxis: {
        title: {
            text: `Consumos ${title} por ${unidad_med}`
        },
        min: 0
    },
    tooltip: {
        formatter: function() {
          // let d = new Date()
          let d_ = new Date(this.x)
          return this.series.name + '<br/>Fecha: <b>' + d_.toISOString().split('T')[0] + '</b><br/>Consumo: <b>' + this.y + " " + unidad_med + '</b>';
          console.log(this.x)
        },
        // headerFormat: '<b>{series.name}</b><br>',
        // pointFormat: '{point.x}: {point.y:.2f} m³',
        // crosshairs: true,
        // shared: true
    },
    plotOptions: {
      series: {
        marker: {
          enabled: true,
          radius: 2.5
        }
      }
    },

    series: [{
      name: 'Flujometro',
      data:
          [
            [Date.UTC(1970, 9, 24), 0],
            [Date.UTC(1970, 9, 27), 0.12],
            [Date.UTC(1970, 9, 30), 0.09],
            [Date.UTC(1970, 10,  3), 0.13],
            [Date.UTC(1970, 10,  6), 0.12],
            [Date.UTC(1970, 10,  9), 0.13],
            [Date.UTC(1970, 10, 12), 0.13],
            [Date.UTC(1970, 10, 15), 0.16],
            [Date.UTC(1970, 10, 18), 0.19],
            [Date.UTC(1970, 10, 21), 0.25],
            [Date.UTC(1970, 10, 24), 0.26],
            [Date.UTC(1970, 10, 27), 0.24],
            [Date.UTC(1970, 10, 30), 0.25],
            [Date.UTC(1970, 11,  3), 0.26],
            [Date.UTC(1970, 11,  6), 0.36],
            [Date.UTC(1970, 11,  9), 0.43],
            [Date.UTC(1970, 11, 12), 0.32],
            [Date.UTC(1970, 11, 15), 0.48],
            [Date.UTC(1970, 11, 18), 0.5],
            [Date.UTC(1970, 11, 21), 0.44],
            [Date.UTC(1970, 11, 24), 0.43],
            [Date.UTC(1970, 11, 27), 0.45],
            [Date.UTC(1970, 11, 30), 0.4],
            [Date.UTC(1971, 0,  3), 0.39],
            [Date.UTC(1971, 0,  6), 0.56],
            [Date.UTC(1971, 0,  9), 0.57],
            [Date.UTC(1971, 0, 12), 0.68],
            [Date.UTC(1971, 0, 15), 0.93],
            [Date.UTC(1971, 0, 18), 1.11],
            [Date.UTC(1971, 0, 21), 1.01],
            [Date.UTC(1971, 0, 24), 0.99],
            [Date.UTC(1971, 0, 27), 1.17],
            [Date.UTC(1971, 0, 30), 1.24],
            [Date.UTC(1971, 1,  3), 1.41],
            [Date.UTC(1971, 1,  6), 1.47],
            [Date.UTC(1971, 1,  9), 1.4],
            [Date.UTC(1971, 1, 12), 1.92],
            [Date.UTC(1971, 1, 15), 2.03],
            [Date.UTC(1971, 1, 18), 2.46],
            [Date.UTC(1971, 1, 21), 2.53],
            [Date.UTC(1971, 1, 24), 2.73],
            [Date.UTC(1971, 1, 27), 2.67],
            [Date.UTC(1971, 2,  3), 2.65],
            [Date.UTC(1971, 2,  6), 2.62],
            [Date.UTC(1971, 2,  9), 2.79],
            [Date.UTC(1971, 2, 13), 2.93],
            [Date.UTC(1971, 2, 20), 3.09],
            [Date.UTC(1971, 2, 27), 2.76],
            [Date.UTC(1971, 2, 30), 2.73],
            [Date.UTC(1971, 3,  4), 2.9],
            [Date.UTC(1971, 3,  9), 2.77],
            [Date.UTC(1971, 3, 12), 2.78],
            [Date.UTC(1971, 3, 15), 2.76],
            [Date.UTC(1971, 3, 18), 2.76],
            [Date.UTC(1971, 3, 21), 2.7],
            [Date.UTC(1971, 3, 24), 2.61],
            [Date.UTC(1971, 3, 27), 2.52],
            [Date.UTC(1971, 3, 30), 2.53],
            [Date.UTC(1971, 4,  3), 2.55],
            [Date.UTC(1971, 4,  6), 2.52],
            [Date.UTC(1971, 4,  9), 2.44],
            [Date.UTC(1971, 4, 12), 2.43],
            [Date.UTC(1971, 4, 15), 2.43],
            [Date.UTC(1971, 4, 18), 2.48],
            [Date.UTC(1971, 4, 21), 2.41],
            [Date.UTC(1971, 4, 24), 2.16],
            [Date.UTC(1971, 4, 27), 2.01],
            [Date.UTC(1971, 4, 30), 1.88],
            [Date.UTC(1971, 5,  2), 1.62],
            [Date.UTC(1971, 5,  6), 1.43],
            [Date.UTC(1971, 5,  9), 1.3],
            [Date.UTC(1971, 5, 12), 1.11],
            [Date.UTC(1971, 5, 15), 0.84],
            [Date.UTC(1971, 5, 18), 0.54],
            [Date.UTC(1971, 5, 21), 0.19],
          ]
    }]
  }

  if(IsREnder){
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={state||[]}
      />
    )
  }else{
    return <span>Cargando ..</span>
  }
}
