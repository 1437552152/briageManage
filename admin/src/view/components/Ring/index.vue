<template>
  <div>
    <div
      class="chartStyle"
      :ref="className"
      style="width:400px;height:150px"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    initCharts() {
      let myChart = this.$echarts.init(this.$refs[this.className]);
      myChart.setOption({
        title: [
            {
              text: this.dataObj.title,
              left: "40%",
              top: "40%",
              textAlign: "center",
              textStyle: {
                fontWeight: "normal",
                fontSize: "14",
                color: "#999",
                textAlign: "center"
              }
            }
          ],
    series: {
        type: 'pie',
        clockWise: false,
        radius: [40, 45],
        hoverAnimation: false,
        silent: true,
        center: ['80%', '50%'],
        data: [{
          value: 75,
      
          itemStyle: {
              normal: {
                
                  color: '#071925',
                  borderWidth:0,
                  borderColor: '#073A66'
              }
          }
        },{
            value: this.dataObj.value,
            label: {
                normal: {
                    rich: {
                        a: {
                            color: '#82ffff',
                            align: 'center',
                            fontSize: 25,
                            fontWeight: "bold",
                            fontFamily:'方正粗倩_GBK'
                        },
                        b: {
                            color: '#08a0df',
                            align: 'center',
                            fontSize: 25
                        },
                        c: {
                          fontSize: 15,
                          fontFamily:'方正粗倩_GBK',
                          fontWeight: "bold"
                        }
                    },
                    formatter: function(params){
                        return "{a|"+params.value+"}"+" {c|%}";
                    },
                    position: 'center',
                    show: true,
                    textStyle: {
                        fontSize: '14',
                        fontWeight: 'normal',
                        color: '#fff'
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#139FBE',
                    shadowColor: '#82ffff',
                    borderWidth:2,
                    borderColor:'#82ffff',
                    shadowBlur: 10
                }
            }
        }]
    }
  }
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
      default: "Circle"
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
