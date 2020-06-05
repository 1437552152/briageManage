<template>
  <div>
    <div
      class="chartStyle"
      :ref="className"
      style="width:500px; height: 200px;"
    ></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts-gl";

import {
  dataX1,
  dataY1,
  dataZ1,
  dataZ2,
  dataZ3,
  dataZ4,
  dataZ5
} from "./ModuleTwo.js";
export default {
  data() {
    return {};
  },
  methods: {
    initCharts() {
      let myChart = this.$echarts.init(this.$refs[this.className]);
      const data = [dataZ1(), dataZ2(), dataZ3(), dataZ4(), dataZ5()];
      const dataX = dataX1();
      const dataY = dataY1();
      // vdata里面存放的是处理之后的数据
      var vdata = [];
      for (let i = 0; i < dataY.length; i++) {
        vdata[i] = []; // vdata里面存放的是二维数组
      }
      // 将处理完之后的数据存放到 vdata 里面
      for (var t = 0; t < dataY.length; t++) {
        const y = dataY[t];
        for (var k = 0; k < data[0].length; k++) {
          for (var p = 0; p < dataX.length; p++) {
            const x = dataX[p];
            const z = data[t][p];
            vdata[t].push([x, y, z]);
          }
          break;
        }
      }
      let colors = ["#69c860", "#32C5FF", "#AA41FF"];
      myChart.setOption(
        {
          title: {
            text: this.dataObj.title,
            textStyle: {
              color: "#4BE4E7",
              fontStyle: "normal",
              fontWeight: "bold",
              fontFamily: "sans-serif",
              fontSize: 16,
              left: "right"
            },
            x: "center",
            y: 10,
            textAlign: "left"
          },
          color:['#69c860','#32C5FF','#AA41FF'],
          legend: {
            data: ["传感器A", "传感器B", "传感器C"],
            orient: "vertical",
            top: "center",
            left: "80%",
            itemGap: 10,
            icon: "rect",
            itemWidth: 20,
            itemHeight: 2,
            textStyle: {
              fontSize: 12,
              color: "#fff"
            }
          },
          xAxis3D: {
            type: "category",
            name: "",
            data: dataX,
            axisLabel: {
              show: true
            },
            axisLine: {
              lineStyle: {
                color: "#919393"
              }
            }
          },
          yAxis3D: {
            type: "category",
            name: "",
            data: dataY,
            axisLabel: {
              show: true,
              interval: 0
            },
            axisLine: {
              lineStyle: {
                color: "#919393"
              }
            }
          },
          zAxis3D: {
            type: "value",
            name: ""
          },
          tooltip: {
            show: true
          },
          grid3D: {
            boxWidth: 300,
            boxHeight: 120,
            boxDepth: 200,
            axisLine: {
              show: true,
              interval: 0,
              lineStyle: {
                color: "#919393"
              }
            },
            viewControl: {
              // distance: 300,
              rotateSensitivity: 0,
              distance: 500,
              //与视角的距离，值越大，图离视角越远，图越小
              alpha: 45,
              //绕x轴旋转的角度（上下旋转），增大，视角顺时针增大（向上）
              beta:30,
              //绕y轴旋转的角度（左右旋转），增大，视角逆时针增大（向右）
              center: [-20, 15, 10]
              //第一个参数：增大，视角沿x轴正方向水平右移动（图向左）；第二个参数：增大，视角沿y轴正方向垂直向上移动（图向下）；第三个参数：增大，视角向z轴正方向移动（图变小）
            },
            axisLine: {
              lineStyle: {
                color: "#919393"
              }
            }
          },
          series: [
            {
              symbol: "none",
              type: "scatter3D",
              name: "传感器A",
              itemStyle: {
                color: "#69c860"
              },
              
              label: {
                show: false,
                position: "bottom",
                distance: 0,
                textStyle: {
                  color: "#69c860",
                  fontSize: 12,
                  borderWidth: 0,
                  borderColor: "#c6c6c6",
                  backgroundColor: "transparent"
                }
              },
              data: vdata[0]
            },
            {
              symbol: "none",
              type: "scatter3D",
              name: "传感器B",
              itemStyle: {
                color: "#32C5FF"
              },
              label: {
                show: false,
                position: "bottom",
                distance: 0,
                textStyle: {
                  color: "rgba(255,255,255,0.65)",
                  fontSize: 12,
                  borderWidth: 0,
                  borderColor: "#c6c6c6",
                  backgroundColor: "transparent"
                }
              },
              data: vdata[1]
            },
            {
              symbol: "none",
              type: "scatter3D",
              name: "传感器C",
              itemStyle: {
                color: "#AA41FF"
              },
              label: {
                show: false,
                position: "bottom",
                distance: 0,
                textStyle: {
                  color: "#AA41FF",
                  fontSize: 12,
                  borderWidth: 0,
                  borderColor: "#c6c6c6",
                  backgroundColor: "transparent"
                }
              },
              data: vdata[2]
            },
            {
              symbol: "none",
              type: "line3D",
              name: "传感器A",
              lineStyle: {
                width: 2,
                color: "#69c860"
              },
             
              data: vdata[0]
            },
            {
              symbol: "none",
              type: "line3D",
              name: "传感器B",
              lineStyle: {
                color: "#32C5FF",
                width: 2
              },
              data: vdata[1]
            },
            {
              symbol: "none",
              type: "line3D",
              name: "传感器C",
              lineStyle: {
                color: "#AA41FF",
                width: 2
              },
              data: vdata[2]
            }
          ]
        },
        true
      );
    }
  },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      setInterval(() => {
        that.initCharts();
      }, 1000);
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
