<template>
  <div>
    <div class="chartStyle" :ref="className" style="width:500px;height:200px"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {

    }
  },
  methods: {
    initCharts () {
      let myChart = this.$echarts.init(this.$refs[this.className])
      myChart.setOption({
                        title:{
     text:this.dataObj.title,
     textStyle:{
        color:'#4BE4E7',
        fontStyle:'normal',
        fontWeight:'bold',
        fontFamily:'sans-serif',
　　　　 fontSize:16,left:'right'    },
x:'center',
        y:10,
        textAlign:'left'
                }, 
                grid: {
        right: '15%',
    }, 
        xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
        interval: 9,
        axisTick: {
            show:false,
          inside: true,
          lineStyle: {
              color: '#10899A'
          }
        },
        axisLine: {
          lineStyle: {
              color: '#425B63'
          }  
        },
        axisLabel: {
            rotate: 28,
            fontFamily: 'PingFangSC',
            fontSize: 12,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.65)'
        }
    },
    yAxis: {
        type: 'value',
        name: '车重/KN',
        max: 60,
        min:0,
        splitNumber: 6,
        splitLine: {
            show: false
        },
        axisLine: {
          lineStyle: {
              color: '#425B63'
          }  
        },
        axisTick: {
             show:false,
          lineStyle: {
              color: '#10899A'
          },
        },
        axisLabel: {
            showMaxLabel: false,
            color: 'rgba(255,255,255,0.65)',
            fontFamily: 'PingFangSC',
            fontSize: 12,
            fontWeight: 300
        }
    },
    series: [{
        name: '网点数',
        data: this.getValue(),
        type: 'line',
        smooth: 0.4,
        symbolSize: 6,
        lineStyle: {
          color: '#0DF9B4',
          opacity: 0.61,
          borderWidth: 2
          
        },
        itemStyle: {
            borderWidth: 2,
            borderColor: '#f00'
        },
               markLine : {
               symbol:'none',
               data : [
                { 
                  silent:false,//鼠标悬停事件  true没有，false有
                  yAxis:55,
                  lineStyle:{
                        type:'solid',
                        color:'red'
                            },
                  label:{
                        position:'end',
                        formatter:"预警值55KN",
                        color:'rgba(255,255,255,0.65)'
                        }
                },
                { 
                  silent:false,
                  yAxis:29,
                  type:"average",
                  lineStyle:{
                        type:'dashed',
                        color:'red'
                            },
                  label:{
                        position:'end',
                        formatter:"平均值29KN",
                        color:'rgba(255,255,255,0.65)'
                        }
                }
            ]
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1, [{
                    offset: 0,
                    color: '#1CDBB4'
                  },
                  {
                    offset: 1,
                    color: '#56A3F1'
                  }
                ])
            }
        }
    }]
      }, true)
    },
  getValue() {
      let arr = [];
      for (let i = 0; i < 9; i++) {
        arr.push((Math.random()*50));
      }
      return arr;
    }
  },
  mounted () {
    const that = this
    this.$nextTick(() => {
 that.initCharts();
    })
  },
  props: {
    type: {
      type: String,
      default: 'InstrumentPanel'
    },
    className: {
      type: String,
      default: 'container'
    },
    data: {
      type: Array
    },
    dataObj: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="less"></style>
