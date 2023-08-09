import React, { useEffect, useLayoutEffect, useState } from 'react'
import { HeaderMenu } from '../../components/HeaderMenu.comp'

import solidGauge from 'highcharts/modules/solid-gauge'
import highchartsMore from 'highcharts/highcharts-more'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { UpdateDataLectura } from '../../API/UpdateDataLectura.api'

function GaugeOne({DATA}) {
// console.log(DATA)
let max = DATA?.MAX
let a = max / 5
let b = (a*3).toFixed(0)
let c = (a*2).toFixed(0)
let d = c/2
let v1 = 0
let v2 = b
let m1 = b
let m2 = Number(b)+Number(d)
let r1 = Number(b)+Number(d)
let r2 = max
  // console.log("rangos",v1,v2,m1,m2,r1,r2)
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
      text: DATA.MEDIDOR,
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
        max: DATA?.MAX,//valor maximo del grafico
        tickPixelInterval: 50,//separador de cuadros en angulo
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
            from: v1,
            to: v2,
            color: '#55BF3B', // green
            thickness: 30,
          }, {
              from: m1,
              to: m2,
              color: '#DDDF0D', // yellow
              thickness: 30
          }, {
              from: r1,
              to: r2,
              color: 'red', // red
              thickness: 30
          }
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
  const [state, setstate] = useState(options);
  const [MaxValue, setMaxValue] = useState(0)
  const [IsREnder, setIsREnder] = useState(false)
  const [LoadText, setLoadText] = useState("Cargando . . .")


 useLayoutEffect( ( ) => {
  // console.log('===========>',Highcharts)
    highchartsMore(Highcharts);
    // solidGauge(Highcharts);
    // console.log("este es el maximo",DATA.MAX)
    // setstate(options)
  },[])

  const UpgradeDataChart = async () => {//actualoza el grafico
    if(DATA){
      // console.log("este es el maximo",DATA.MAX)
      // setstate(options)
      // await setMaxValue(DATA.MAX)
      let control = new Date()
      // console.log(control.toUTCString())
      let datas = await UpdateDataLectura({SENSOR:DATA.SENSOR, N_MED:DATA.N_MED,DATA})
      // console.log(datas)
      if(datas?.error){
        setLoadText(datas.msg)
      }else{
        let FormatFecha = new Date(control.setUTCSeconds(Math.floor(datas[0].TimeStamp/ 1000000)))
        // console.log(FormatFecha.toISOString())
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
          text: DATA.MEDIDOR,
          style: {
            fontSize:'small',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            color: 'gray'
          }
        },
        subtitle:{
          text: DATA.TIPO,
          style: {
            fontSize:'small',
            fontWeight: 'lighter',
            fontFamily: 'monospace',
            color: 'gray'
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
          max: DATA.MAX,//valor maximo del grafico
          tickPixelInterval: 50,//separador de cuadros en angulo
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
            from: v1,
            to: v2,
            color: '#55BF3B', // green
            thickness: 30,
            }, {
              from: m1,
              to: m2,
              color: '#DDDF0D', // yellow
              thickness: 30
            }, {
              from: r1,
              to: r2,
              color: 'red', // red
              thickness: 30
            }
          ]
        },
    
        series: [{
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
     
      await setstate(options)
      // await setstate({...state,["series"]:the_series,["yAxis"]:yAxis})
      await setIsREnder(true)
      }
      
    }
  }

  //setInterval
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

  
  if(IsREnder){
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={state||[]}
      />
    )
  }else{
    return (
      <div className='container'>
        <div className='row'>
          <div className='col text-center'>
            <small>{LoadText}</small>
          </div>
        </div>
      </div>
    )
  }
    

  
}

export default GaugeOne

// const chart = Highcharts.chart('container', {
//   title: {
//       text: 'Unemployment rates in engineering and ICT subjects, 2021',
//       align: 'left'
//   },
//   subtitle: {
//       text: 'Chart option: Plain | Source: ' +
//           '<a href="https://www.nav.no/no/nav-og-samfunn/statistikk/arbeidssokere-og-stillinger-statistikk/helt-ledige"' +
//           'target="_blank">NAV</a>',
//       align: 'left'
//   },
//   colors: [
//       '#4caefe',
//       '#3fbdf3',
//       '#35c3e8',
//       '#2bc9dc',
//       '#20cfe1',
//       '#16d4e6',
//       '#0dd9db',
//       '#03dfd0',
//       '#00e4c5',
//       '#00e9ba',
//       '#00eeaf',
//       '#23e274'
//   ],
//   xAxis: {
//       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//   },
//   series: [{
//       type: 'column',
//       name: 'Unemployed',
//       borderRadius: 5,
//       colorByPoint: true,
//       data: [5412, 4977, 4730, 4437, 3947, 3707, 4143, 3609,
//           3311, 3072, 2899, 2887],
//       showInLegend: false
//   }]
// });

// document.getElementById('plain').addEventListener('click', () => {
//   chart.update({
//       chart: {
//           inverted: false,
//           polar: false
//       },
//       subtitle: {
//           text: 'Chart option: Plain | Source: ' +
//               '<a href="https://www.nav.no/no/nav-og-samfunn/statistikk/arbeidssokere-og-stillinger-statistikk/helt-ledige"' +
//               'target="_blank">NAV</a>'
//       }
//   });
// });

// document.getElementById('inverted').addEventListener('click', () => {
//   chart.update({
//       chart: {
//           inverted: true,
//           polar: false
//       },
//       subtitle: {
//           text: 'Chart option: Inverted | Source: ' +
//               '<a href="https://www.nav.no/no/nav-og-samfunn/statistikk/arbeidssokere-og-stillinger-statistikk/helt-ledige"' +
//               'target="_blank">NAV</a>'
//       }
//   });
// });

// document.getElementById('polar').addEventListener('click', () => {
//   chart.update({
//       chart: {
//           inverted: false,
//           polar: true
//       },
//       subtitle: {
//           text: 'Chart option: Polar | Source: ' +
//               '<a href="https://www.nav.no/no/nav-og-samfunn/statistikk/arbeidssokere-og-stillinger-statistikk/helt-ledige"' +
//               'target="_blank">NAV</a>'
//       }
//   });
// });
