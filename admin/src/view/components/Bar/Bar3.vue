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
      let that=this;
      let myChart = this.$echarts.init(this.$refs[this.className]);
      console.log(this.dataObj);
      myChart.setOption(
        {
            title: {
        text: this.dataObj.title,
        x: "0%",
        y:"0%",
        textStyle: {
            color: this.dataObj.color,
            fontSize: '14'
        }},
    tooltip: {
        show: true,
        formatter: '{b} : {c}'
    },
    grid: {
        top: '25%',
        right: '10%',
        left: '0%',
        bottom: '1%'
    },
    xAxis: {
        type: 'value',
        show: false,
    },
    yAxis: {
        type: 'category',
        axisTick: {
            show: false,
            alignWithLabel: false,
            length: 5,
        },
         axisLabel: {
             show:false,
            formatter: '{value}',
            color: 'rgba(255,255,255,0.65)',
        },
        inverse: 'true',
        axisLine: {
                show: false,
                lineStyle: {
                    color: '#fff',
                }
            },
        data: this.dataObj.valueY
    },
    series: [{
        type: 'bar',
        label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{c}%',
                    textStyle: {
            color: this.dataObj.color,
            fontSize: '16'
        }
                }
            },
        data: this.dataObj.value,
        barWidth: '8px',
        barCategoryGap: '50%',
        itemStyle: {
            normal: {
                show: true,
                color: function(params) {
                    return {
                        type: 'linear',
                        colorStops: [{
                                offset: 0,
                                color: that.dataObj.colorGroup[0]
                            }, 
                            {
                                offset: 1,
                                color: that.dataObj.colorGroup[1]
                            }]
                    }
                },
                barBorderRadius: 8,
                borderWidth: 0,
                borderColor: '#333',
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
