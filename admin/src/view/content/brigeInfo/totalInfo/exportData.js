/*
 * @Description: 
 * @Author: yfye
 * @Date: 2020-12-04 21:47:20
 * @LastEditTime: 2020-12-04 21:48:42
 * @LastEditors: yfye
 */
const data =[
    {
      title: "主线/匝道编号",
      key: "mainCode",
      align: "center"
    },
    {
      title: "主梁编号",
      key: "mainBeamCode",
      align: "center"
    },
    {
      title: "墩号范围",
      key: "pierNoRange",
      align: "center"
    },
    {
      title: "结构形式",
      /*           key: "", */
      align: "center",
      children: [
        {
          title: "桥跨布置",
          key: "structStyleAssign",
          align: "center"
        },
        {
          title: "桥面宽度(梁顶面宽)",
          key: "structStyleWidth",
          align: "center"
        },
        {
          title: "结构高度",
          key: "structStyleHeight",
          align: "center"
        },
        {
          title: "梁体特征",
          key: "",
          align: "center",
          render:(h,params)=>{return h('div',{},params.row.structStyleFeature1+','+params.row.structStyleFeature2)}
        },
        {
          title: "桥墩",
          key: "structStylePier",
          align: "center"
        },
        {
          title: "基础",
          key: "structStyleBasic",
          align: "center"
        }
      ]
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
                  exportFileService(params.row.picUrl);
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