import React, { useEffect, useLayoutEffect, useState } from 'react'
import { HeaderMenu } from '../../components/HeaderMenu.comp'

import solidGauge from 'highcharts/modules/solid-gauge'
import highchartsMore from 'highcharts/highcharts-more'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { UpdateDataLectura } from '../../API/UpdateDataLectura.api'

function GaugeOne({DATA}) {
  // console.log(DATA.MAX)
  const [state, setstate] = useState({});
  const [MaxValue, setMaxValue] = useState(0)
  const [IsREnder, setIsREnder] = useState(false)

 useEffect( ( ) => {
  // console.log('===========>',Highcharts)
    highchartsMore(Highcharts);
    // solidGauge(Highcharts);
    // console.log("este es el maximo",DATA.MAX)
    // setstate(options)
  },[])

  

  const UpgradeDataChart = async () => {
    if(DATA){
      console.log("este es el maximo",DATA.MAX)
      setstate(options)
      setMaxValue(DATA.MAX)
      let control = new Date()
      console.log(control.toUTCString())
      let datas = await UpdateDataLectura({SENSOR:DATA.SENSOR, N_MED:DATA.N_MED})
      // console.log(datas[0][DATA.SENSOR])
      let the_series = [{
        name: 'Consumo',
        data: [datas[0][DATA.SENSOR]],//[Math.floor(Math.random() * 180)],
        tooltip: {
            valueSuffix: ` ${DATA.UNIDAD}`
        },
        dataLabels: {
            format: `{y} ${DATA.UNIDAD}`,//' m³/h',
            borderWidth: 0,//borde del numero indicador
            color: (
                Highcharts.defaultOptions.title &&
                Highcharts.defaultOptions.title.style &&
                Highcharts.defaultOptions.title.style.color
            ) || '#333333',
            style: {
                fontSize: '16px'
            }
        },
        dial: {
            radius: '90%',//largo del indicacor central
            backgroundColor: 'black',//color del indicador
            baseWidth: 10,
            baseLength: "0%",
            rearLength: '0%'
        },
        pivot: {
            backgroundColor: 'black',
            radius: 5
        }

      }]

      let yAxis =  {
        min: 0,
        max: MaxValue,//valor maximo del grafico
        tickPixelInterval: 40,//separador de cuadros en angulo
        tickPosition: 'inside',
        tickColor: 'white',//color separador de cuadros en angulo
        tickLength: 15,//tamaño linea separadora de cuadros en angulo
        tickWidth: 1,//ancho de linea separadora de cuadros en angulo
        minorTickInterval: null,
        // minorTickColor: 'white',
        // minorTickLength:5,
        labels: {
            distance: 11,
            style: {
                fontSize: '12px',
            }
        },
        title: {
          text: ""
        },
        lineWidth: 0,// grosor linea de borde angulo
        plotBands: [{
            from: 0,
            to: MaxValue,
            color: '#55BF3B', // green
            thickness: 30,
        }//, {
        //     from: 120,
        //     to: 160,
        //     color: '#DDDF0D', // yellow
        //     thickness: 30
        // }, {
        //     from: 160,
        //     to: 180,
        //     color: 'red', // red
        //     thickness: 30
        //}
      ]
    }
      setstate({...state,["series"]:the_series,["yAxis"]:yAxis})
      // setstate({...state,["yAxis"]:yAxis})
    }
  }

  useEffect(() => {
    // console.log("este es el maximo",DATA?.MAX)
    let intervalo = () => setInterval(() => {
      UpgradeDataChart()      
    }, 1000*60*10);
    return () => {
      intervalo()
    };
  }, [])

  useEffect(() => {
    UpgradeDataChart()
    if(DATA?.MAX){
      // const options = {
      //   chart: {
      //     type: 'gauge',
      //     plotBackgroundColor: null,
      //     plotBackgroundImage: null,
      //     plotBorderWidth: 0,
      //     plotShadow: false,
      //     height: '230px'//'100%'
      //   },
    
      //   title: {
      //     text: 'WaterMeter',
      //     style: {
      //       fontWeight: 'lighter',
      //       fontFamily: 'monospace',
      //       color: ''
      //     }
      //   },
    
      //   pane: {
      //       startAngle: -125,
      //       endAngle: 125,
      //       background: null,
      //       center: ['50%', '60%'],//['50%', '75%'],
      //       size: '90%'
      //   },
    
      //   // the value axis
      //   yAxis: {
      //       min: 0,
      //       max: MaxValue,//valor maximo del grafico
      //       tickPixelInterval: 40,//separador de cuadros en angulo
      //       tickPosition: 'inside',
      //       tickColor: 'white',//color separador de cuadros en angulo
      //       tickLength: 15,//tamaño linea separadora de cuadros en angulo
      //       tickWidth: 1,//ancho de linea separadora de cuadros en angulo
      //       minorTickInterval: null,
      //       // minorTickColor: 'white',
      //       // minorTickLength:5,
      //       labels: {
      //           distance: 11,
      //           style: {
      //               fontSize: '12px',
      //           }
      //       },
      //       title: {
      //         text: ""
      //       },
      //       lineWidth: 0,// grosor linea de borde angulo
      //       plotBands: [{
      //           from: 0,
      //           to: MaxValue,
      //           color: '#55BF3B', // green
      //           thickness: 30,
      //       }//, {
      //       //     from: 120,
      //       //     to: 160,
      //       //     color: '#DDDF0D', // yellow
      //       //     thickness: 30
      //       // }, {
      //       //     from: 160,
      //       //     to: 180,
      //       //     color: 'red', // red
      //       //     thickness: 30
      //       //}
      //     ]
      //   },
    
      //   series: [{
      //       name: 'Consumo',
      //       data: [155],
      //       tooltip: {
      //           valueSuffix: ' --'//unidad de medica precargada
      //       },
      //       dataLabels: {
      //           format: '{y} --',//unidad de medica precargada
      //           borderWidth: 0,//borde del numero indicador
      //           color: (
      //               Highcharts.defaultOptions.title &&
      //               Highcharts.defaultOptions.title.style &&
      //               Highcharts.defaultOptions.title.style.color
      //           ) || '#333333',
      //           style: {
      //               fontSize: '16px'
      //           }
      //       },
      //       dial: {
      //           radius: '90%',//largo del indicacor central
      //           backgroundColor: 'black',//color del indicador
      //           baseWidth: 10,
      //           baseLength: "0%",
      //           rearLength: '0%'
      //       },
      //       pivot: {
      //           backgroundColor: 'black',
      //           radius: 5
      //       }
    
      //   }],
      //   responsive: {
      //     rules: [{
      //         condition: {
      //             // maxWidth: 500
      //             minHeight: 238
      //         },
      //         chartOptions: {
      //             legend: {
      //                 align: 'center',
      //                 verticalAlign: 'bottom',
      //                 layout: 'horizontal'
      //             },
      //             yAxis: {
      //                 labels: {
      //                     align: 'left',
      //                     x: 0,
      //                     y: -5
      //                 },
      //                 title: {
      //                     text: null
      //                 }
      //             },
      //             subtitle: {
      //                 text: null
      //             },
      //             credits: {
      //                 enabled: false
      //             }
      //         }
      //     }]
      // }
      
      // }
      
      // setIsREnder(true)
    }
    return () => {
      UpgradeDataChart()
    }
  }, [])

  // useEffect(() => {
  //   setIsREnder(true)
  
  //   return () => {
      
  //   }
  // }, [state])

  const options = {
    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: '230px'//'100%'
    },

    title: {
      text: 'WaterMeter',
      style: {
        fontWeight: 'lighter',
        fontFamily: 'monospace',
        color: ''
      }
    },

    pane: {
        startAngle: -125,
        endAngle: 125,
        background: null,
        center: ['50%', '60%'],//['50%', '75%'],
        size: '90%'
    },

    // the value axis
    yAxis: {
        min: 0,
        max: MaxValue,//valor maximo del grafico
        tickPixelInterval: 40,//separador de cuadros en angulo
        tickPosition: 'inside',
        tickColor: 'white',//color separador de cuadros en angulo
        tickLength: 15,//tamaño linea separadora de cuadros en angulo
        tickWidth: 1,//ancho de linea separadora de cuadros en angulo
        minorTickInterval: null,
        // minorTickColor: 'white',
        // minorTickLength:5,
        labels: {
            distance: 11,
            style: {
                fontSize: '12px',
            }
        },
        title: {
          text: ""
        },
        lineWidth: 0,// grosor linea de borde angulo
        plotBands: [{
            from: 0,
            to: MaxValue,
            color: '#55BF3B', // green
            thickness: 30,
        }//, {
        //     from: 120,
        //     to: 160,
        //     color: '#DDDF0D', // yellow
        //     thickness: 30
        // }, {
        //     from: 160,
        //     to: 180,
        //     color: 'red', // red
        //     thickness: 30
        //}
      ]
    },

    series: [{
        name: 'Consumo',
        data: [155],
        tooltip: {
            valueSuffix: ' --'//unidad de medica precargada
        },
        dataLabels: {
            format: '{y} --',//unidad de medica precargada
            borderWidth: 0,//borde del numero indicador
            color: (
                Highcharts.defaultOptions.title &&
                Highcharts.defaultOptions.title.style &&
                Highcharts.defaultOptions.title.style.color
            ) || '#333333',
            style: {
                fontSize: '16px'
            }
        },
        dial: {
            radius: '90%',//largo del indicacor central
            backgroundColor: 'black',//color del indicador
            baseWidth: 10,
            baseLength: "0%",
            rearLength: '0%'
        },
        pivot: {
            backgroundColor: 'black',
            radius: 5
        }

    }],
    responsive: {
      rules: [{
          condition: {
              // maxWidth: 500
              minHeight: 238
          },
          chartOptions: {
              legend: {
                  align: 'center',
                  verticalAlign: 'bottom',
                  layout: 'horizontal'
              },
              yAxis: {
                  labels: {
                      align: 'left',
                      x: 0,
                      y: -5
                  },
                  title: {
                      text: null
                  }
              },
              subtitle: {
                  text: null
              },
              credits: {
                  enabled: false
              }
          }
      }]
  }
  
  }
  
  
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={state||[]}
      />
    )

  
}

export default GaugeOne