/*
 * @Description: 
 * @Author: yfye
 * @Date: 2020-12-04 21:47:20
 * @LastEditTime: 2020-12-04 23:03:26
 * @LastEditors: yfye
 */
import { exportFileService } from "@/view/utils/myFetch";
const data =[
  {
    type: "index",
    width: 80,
    title: "序号",
    align: "center"
  },
  {
    title: "巡检时间",
    key: "age",
    align: "center"
  },
  {
    title: "上报人",
    key: "age",
    align: "center"
  },
  {
    title: "病害墩号范围",
    key: "address",
    align: "center"
  },
  {
    title: "所属构件类型",
    key: "address",
    align: "center"
  },
  {
    title: "所属构件",
    key: "address",
    align: "center"
  },
  {
    title: "病害描述",
    key: "age",
    align: "center"
  },
  {
    title: "病害中心坐标",
    key: "age",
    align: "center"
  },
  {
    title: "轻重度",
    key: "address",
    align: "center"
  },
  {
    title: "处理状态",
    key: "address",
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

  export default {
    data
}