/*
 * @Description: 
 * @Author: yfye
 * @Date: 2020-12-04 21:47:20
 * @LastEditTime: 2020-12-04 23:14:17
 * @LastEditors: yfye
 */
import { exportFileService } from "@/view/utils/myFetch";
const data = [
  {
    type: 'index',
   width:80,
    title: '序号',
    align: 'center'
  },
  {
    title: '桥名',
    key: 'name',
    align: 'center'
  },
  {
    title: '总桥长',
    key: 'mile',
    align: 'center'
  },
  {
    title: '主梁编号',
    key: 'mainBeamCode',
    align: 'center'
  },
  {
    title: '结构形式',
    key: 'structStyleBasic',
    align: 'center'
  },
  {
    title: '跨度',
    key: 'span',
    align: 'center'
  },
  {
    title: '墩号范围',
    key: 'pierNoRange',
    align: 'center'
  },
  {
    title: '图片下载',
    key: 'action',
    width: 150,
    align: 'center',
    render: (h, params) => {
      return h('div', [
        h('img', {
          attrs: {
            src: require('../../../../assets/images/download.png')
          },
          style: {
            width: '18px',
            height: '18px',
            position: 'relative',
            top: '5px'
          }
        }),
        h('a', {
          style: {
            marginLeft: '5px'
          },
          on: {
            click: () => {
              exportFileService(params.row.picUrl)
            }
          }
        }, '下载')

      ])
    }
  }
]

  export default {
    data
}