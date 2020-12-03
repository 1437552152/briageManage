/*
 * @Description:
 * @Author: yfye
 * @Date: 2020-12-03 21:14:18
 * @LastEditTime: 2020-12-03 21:35:41
 * @LastEditors: yfye
 */
const data1 = {
  title: "实时评分",
  valueX: [
    "塔顶位移",
    "塔顶应力",
    "扰度线性",
    "支座位移",
    "梁缝位移",
    "索力",
    "塔顶位移",
    "塔顶应力",
    "扰度线性",
    "支座位移",
    "梁缝位移",
    "索力"
  ],
  valueY: [
    68.7,
    90.5,
    92.7,
    82.5,
    94.4,
    64.7,
    94.1,
    98.4,
    84.7,
    94.2,
    96.2,
    88.9
  ],
  type: 1
};

const data2 = {
  title: "月巡检次数",
  valueX: [
    "2019-1",
    "2019-2",
    "2019-3",
    "2019-4",
    "2019-5",
    "2019-6",
    "2019-7",
    "2019-8",
    "2019-9",
    "2019-10",
    "2019-11",
    "2019-12"
  ],
  valueY: [53, 48, 26, 50, 43, 43, 55, 59, 38, 39, 43, 43],
  type: 1,
  color: "#21dcb7"
};

const data3 = {
  title: "扰度传感器",
  valueY: ["1", "2", "3"],
  value: [99.6, 95.2, 94.2],
  color: "#2396FA",
  colorGroup: ["#0E8BF8", "#07EDAD"]
};

const data4 = {
  title: "温度传感器",
  valueY: ["1", "2", "3"],
  value: [99.6, 95.2, 94.2],
  color: "#07AB84",
  colorGroup: ["#1EC8D2", "#6DEDA7"]
};
const data5 = {
  title: "压力传感器",
  valueY: ["1", "2", "3"],
  value: [99.6, 95.2, 94.2],
  color: "#F9D576",
  colorGroup: ["#27DF8E", "#87E696"]
};

const data6 = {
  title: "良好",
  value: ["1", "2", "3"]
};

const data7 = {
  title: "正常",
  value: ["1", "2", "3"]
};
const data8 = {
  title: "无",
  value: ["1", "2", "3"]
};
export default {
    data1,data2, data3,data4, data5,data6, 
    data7,data8
}