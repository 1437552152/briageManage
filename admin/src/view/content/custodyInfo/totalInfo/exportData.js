/*
 * @Description: 
 * @Author: yfye
 * @Date: 2020-12-04 21:47:20
 * @LastEditTime: 2020-12-04 23:01:15
 * @LastEditors: yfye
 */
import { exportFileService } from "@/view/utils/myFetch";
const data = [
  {
    title: "巡检时间",
    key: "inspectTime",
    align: "center"
  },
  {
    title: "上报人",
    key: "inspectStaff",
    align: "center"
  },
  {
    title: "病害墩号范围",
    key: "pierNoRange",
    align: "center"
  },
  {
    title: "所属构件类型",
    key: "componentType",
    align: "center"
  },
  {
    title: "所属构件",
    key: "component",
    align: "center"
  },
  {
    title: "病害描述",
    key: "diseaseDesc",
    align: "center"
  },
  {
    title: "轻重度",
    key: "diseaseSeverity",
    align: "center"
  },
  {
    title: "紧迫度",
    key: "urgentType",
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