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
} from "./ModuleTwo.js";
export default {
  data() {
    return {};
  },
  methods: {
    initCharts() {
      let myChart = this.$echarts.init(this.$refs[this.className]);
      const data = [dataZ1(), dataZ2(), dataZ3()];
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

    vdata.push(JSON.parse(JSON.stringify(vdata[1])));
    vdata.push(JSON.parse(JSON.stringify(vdata[1])));
    vdata.push(JSON.parse(JSON.stringify(vdata[1])));
    vdata.push(JSON.parse(JSON.stringify(vdata[1])));
    vdata.push(JSON.parse(JSON.stringify(vdata[1])));
    vdata.push(JSON.parse(JSON.stringify(vdata[1])));
  vdata[3]=[["0:00", "P1", 1],
    ["2:00", "P1",1],
    ["4:00", "P1", 1],
    ["6:00", "P1",1],
    ["8:00", "P1", 1],
    ["10:00", "P1",1],
    ["12:00", "P1",1],
    ["14:00", "P1",1],
    ["16:00", "P1",1],
    ["18:00", "P1",1],
    ["20:00", "P1",1],
    ["22:00", "P1",1]]

   vdata[6]=[["0:00", "P1", 40],
    ["2:00", "P1",40],
    ["4:00", "P1", 40],
    ["6:00", "P1",40],
    ["8:00", "P1", 40],
    ["10:00", "P1",40],
    ["12:00", "P1",40],
    ["14:00", "P1",40],
    ["16:00", "P1",40],
    ["18:00", "P1",40],
    ["20:00", "P1",40],
    ["22:00", "P1",40]]

 vdata[4]=[["0:00", "P2", 1],
    ["2:00", "P2",1],
    ["4:00", "P2", 1],
    ["6:00", "P2",1],
    ["8:00", "P2", 1],
    ["10:00", "P2",1],
    ["12:00", "P2",1],
    ["14:00", "P2",1],
    ["16:00", "P2",1],
    ["18:00", "P2",1],
    ["20:00", "P2",1],
    ["22:00", "P2",1]]

   vdata[7]=[["0:00","P2",30],
    ["2:00","P2",30],
    ["4:00", "P2", 30],
    ["6:00", "P2",30],
    ["8:00", "P2", 30],
    ["10:00","P2",30],
    ["12:00", "P2",30],
    ["14:00","P2",30],
    ["16:00", "P2",30],
    ["18:00", "P2",30],
    ["20:00", "P2",30],
    ["22:00", "P2",30]]

     vdata[5]=[["0:00", "P3",7],
    ["2:00", "P3",7],
    ["4:00", "P3", 7],
    ["6:00", "P3",7],
    ["8:00", "P3",7],
    ["10:00", "P3",7],
    ["12:00", "P3",7],
    ["14:00", "P3",7],
    ["16:00", "P3",7],
    ["18:00", "P3",7],
    ["20:00", "P3",7],
    ["22:00", "P3",7]]

   vdata[8]=[["0:00", "P3", 70],
    ["2:00", "P3",70],
    ["4:00", "P3", 70],
    ["6:00", "P3",70],
    ["8:00", "P3", 70],
    ["10:00", "P3",70],
    ["12:00", "P3",70],
    ["14:00", "P3",70],
    ["16:00", "P3",70],
    ["18:00", "P3",70],
    ["20:00", "P3",70],
    ["22:00", "P3",70]]

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
            data: ["传感器1", "传感器2", "传感器3"],
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
              name: "传感器1",
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
              name: "传感器2",
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
              name: "传感器3",
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
              name: "传感器1",
              lineStyle: {
                width: 2,
                color: "#69c860"
              },
              data: vdata[0]
            },
            {
              symbol: "none",
              type: "line3D",
              name: "传感器2",
              lineStyle: {
                color: "#32C5FF",
                width: 2
              },
              data: vdata[1]
            },
            {
              symbol: "none",
              type: "line3D",
              name: "传感器3",
              lineStyle: {
                color: "#AA41FF",
                width: 2
              },
              data: vdata[2]
            },
              {
              type: 'line3D',
              name: '传感器1上限',
              lineStyle: {
                color: 'rgb(241,7,27)',
                width:2
              },
              data: vdata[3]
            },
            {
              type: 'line3D',
              name: '传感器2上限',
              lineStyle: {
                color: 'rgb(241,7,27)',
                width: 2
              },
              data: vdata[4]
            },
            {
              type: 'line3D',
              name: '传感器3上限',
              lineStyle: {
                color: 'rgb(241,7,27)',
                width: 2
              },
              data: vdata[5]
            },
            {
              type: 'line3D',
              name: '传感器1下限',
              lineStyle: {
                color: 'rgb(241,7,27)',
                width: 2
              },
              data: vdata[6]
            },
            {
              type: 'line3D',
              name: '传感器2下限',
              lineStyle: {
                color: 'rgb(241,7,27)',
                width:2
              },
              data: vdata[7]
            }
            ,         {
              type: 'line3D',
              name: '传感器3下限',
              lineStyle: {
                color: 'rgb(241,7,27)',
                width: 2
              },
              data: vdata[8]
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
