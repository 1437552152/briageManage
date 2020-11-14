<template>
  <div class="chartStyle"
      :ref="className"
      style="width:100%;height:100%">
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  data() {
    return {};
  },
  methods: {
    initCharts() {
      let myChart = this.$echarts.init(this.$refs[this.className]);
      console.log(myChart);
      myChart.setOption(
        {
            title: {
        text: this.dataObj.title,
        x: "1%",
        y:"1%",
        textStyle: {
            color: '#4EECEE',
            fontSize: '18'
        },
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        top: '25%',
        right: '3%',
        left: '5%',
        bottom: '12%'
    },
    xAxis: [{
        type: 'category',
        data: this.dataObj.valueX,
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,0.65)'
            }
        },
        axisLabel: {
            margin: 10,
            color: 'rgba(255,255,255,0.65)',
            textStyle: {
                fontSize: 12
            },
        },
    }],
    yAxis: [{
        name: '(次数)',
        max:60,
        min:0,
        splitNumber:3,
        axisLabel: {
            formatter: '{value}',
            color: 'rgba(255,255,255,0.65)',
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'rgba(255,255,255,0.65)'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#1E8A90',
                width:1,
                       type:'dotted'
            }
        }
    }],
    series: [{
        type: 'bar',
        data: this.dataObj.valueY,
        barWidth: '20px',
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00D481' // 0% 处的颜色
                }, {
                    offset: 1,
                    color: '#15A1EA' // 100% 处的颜色
                }], false),
                barBorderRadius: [30, 30, 30, 30],
                shadowColor: 'rgba(0,160,221,1)',
                shadowBlur: 4,
            }
        },
        label: {
            normal: {
                show: true,
                position: ['-8', '-20'],
                distance: 1,
                formatter: [
                    ' {a|{c}}     \n',
                    '    {b|}'
                ].join(','),
                rich: {
                    a: {
                        color: '#4EECEE',
                        align: 'center',
                    }
                }
            }
        }
    }]
        },
        true
      );
    }
  },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      that.initCharts();
    });
  },
  props: {
    type: {
      type: String,
      default: "InstrumentPanel"
    },
    className: {
      type: String,
      default: "container"
    },
    data: {
      type: Array
    },
    dataObj: {
      type: Object,
      default: null
    }
  }
};
</script>

<style lang="less"></style>
