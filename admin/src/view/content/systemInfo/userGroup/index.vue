<template>
  <div class="tableBox">
     <iframe align="center" width="100%" :height="ContentHeight" :src="src"  frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" />
      <Form ref="formInline" :model="formInline"  inline class="pagePosition">
          <FormItem prop="name">
              <Input type="text" search v-model="formInline.name" placeholder="请输入桥梁名称"   @on-search="IconClick" />
          </FormItem>
      </Form>

    <Table  :columns="columns" :data="data"  highlight-row @on-row-click="rowClick"></Table>
   <!--  <div class="pagePosition pageStyle"><Page :total="data.length" show-elevator  show-sizer :current="current" :page-size="pageSize" show-total @on-change="onChange"  @on-page-size-change="onSizeChange"/>
  </div> -->
   </div>
</template>

<script>
import { exportFileService } from '@/view/utils/myFetch'
export default {
  data () {
    return {
      current: 1,
      pageSize: 10,
      ContentHeight: 500,
      formInline: {
        name: ''
      },
columns: [
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
      ],
      data: []
    }
  },
  mounted () {
  },
  methods: {
    onChange (page) {
      this.current = page
    },
    onSizeChange (paseSize) {
      this.pageSize = pageSize
    },
    rowClick (params) {
    
    },
    IconClick () {
    }
  }
}
</script>

<style lang='less' scoped>
  .pagePosition{
    display: flex;
justify-content: flex-end;
    margin-top: 20PX;
  }
  .tableBox .ivu-table-row-highlight td,.tableBox .ivu-table-row-highlight:hover td{
    background-color: #0D3541;
    color:#fff
  }
</style>
