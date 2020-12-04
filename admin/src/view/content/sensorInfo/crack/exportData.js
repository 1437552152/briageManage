/*
 * @Description: 
 * @Author: yfye
 * @Date: 2020-12-04 21:47:20
 * @LastEditTime: 2020-12-04 22:50:43
 * @LastEditors: yfye
 */
import { exportFileService } from "@/view/utils/myFetch";
const data1 =  [
  {
    title: "时刻",
    key: "time",
    align: "center"
  },
  {
    title: "传感器A",
    key: "p1",
    align: "center"
  },
  {
    title: "传感器B",
    key: "p2",
    align: "center"
  },
  {
    title: "传感器C",
    key: "p3",
    align: "center"
  },
  {
    title: "图片下载",
    key: "action",
    width: 150,
    align: "center",
    render: (h, params) => {
      return h("div", [
        h("img", {
          attrs: {
            src: require("../../../../assets/images/download.png")
          },
          style: {
            width: "18px",
            height: "18px",
            position: "relative",
            top: "5px"
          }
        }),
        h(
          "a",
          {
            style: {
              marginLeft: "5px"
            },
            on: {
              click: () => {
                exportFileService(params.row.fileUrl);
              }
            }
          },
          "下载"
        )
      ]);
    }
  }
]

const data2 = [
  {
    time: "2020/2/16 0:00",
    p1: 8.403084183,
    p2: 8.727584183,
    p3: 9.052084183,
    fileUrl: "https://mobile.yyf2gml.site/download/data.zip"
  },
  {
    time: "2020/2/16 0:00",
    p1: 8.277712127,
    p2: 8.602212127,
    p3: 8.926712127,
    fileUrl: "https://mobile.yyf2gml.site/download/data.xls"
  },
  {
    time: "2020/2/16 1:00",
    p1: 8.204359364,
    p2: 8.528859364,
    p3: 8.853359364,
    fileUrl: "https://mobile.yyf2gml.site/download/data.xlsx"
  }
]


const data3 =[
  { id: 0, name: "zip格式下载" },
  { id: 1, name: "xls格式下载" },
  { id: 2, name: "xlsx格式下载" }
]

  export default {
    data1,data2,data3
}