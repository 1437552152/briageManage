<template>
  <div>
    <div class="chartStyle" :ref="className" style="width:500px;height:300px"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-gl';
export default {
  data () {
    return {

    }
  },
  methods: {
    initCharts () {
      let myChart = this.$echarts.init(this.$refs[this.className])
      myChart.setOption({
        tooltip: {},
        backgroundColor: '#0b212b',
        visualMap: {
          show: false,
          dimension: 2,
          min: -1,
          max: 1,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
        },
        xAxis3D: {
          type: 'value'
        },
        yAxis3D: {
          type: 'value'
        },
        zAxis3D: {
          type: 'value'
        },
        grid3D: {
          viewControl: {
          }
        },
        series: [{
          type: 'surface',
          equation: {
            x: {
              step: 0.05
            },
            y: {
              step: 0.05
            },
            z: function(x, y) {
              if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
                return '-'
              }
              return Math.sin(x * Math.PI) * Math.sin(y * Math.PI)
            }
          }
        }]
      }, true)
    }
  },
  mounted () {
    const that = this
    this.$nextTick(() => {
      that.initCharts()
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
