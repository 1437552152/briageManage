<template>
  <div class="tableBox">
       <div class="moduleRe">
       <div id="loading">
          <div class="loading-image" style="background-image:url('http://47.107.180.202:40605/ezgif.com-crop.gif');">
              <div class="loadingNuliLoading">正在努力加载中...</div>
          </div>
        </div>
    </div>
    <div id="container" style="height:500px" />
     <div class="boxStyle"></div>
     <div class="titleTotal">
     <div class="title">综合分析及预警<img src="../../../../assets/images/dashed.png"></div></div>
      <!-- <Form ref="formInline" :model="formInline"  inline class="pagePosition">
          <FormItem prop="name">
              <Input type="text" search v-model="formInline.name" placeholder="请输入桥梁名称"   @on-search="IconClick" />
          </FormItem>
      </Form> -->

    <Table  :columns="columns" :data="data"  highlight-row @on-row-click="rowClick"></Table>
  <!--   <div class="pagePosition pageStyle"><Page :total="data.length" show-elevator  show-sizer :current="current" :page-size="pageSize" show-total @on-change="onChange"  @on-page-size-change="onSizeChange"/>
  </div> -->
   </div>
</template>

<script>
import { exportFileService } from '@/view/utils/myFetch';
import { config } from "@/view/utils/common";
import Motor from "../../../../../library/motor";
Motor.Config.serverUrl = config.bridge.bimServer;
export default {
  data () {
    return {
      current: 1,
      pageSize: 10,
      ContentHeight: 500,
      formInline: {
        name: ''
      },
   project: null,
      projectId:null,
      bridgeId: this.$route.query.bridgeId,
     columns: [
        {
          type: 'index',
          width: 60,
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
      setTimeout(()=>{
    const that = this;
    var projectId = localStorage.getItem("bridgeId");
    this.projectId=projectId;
    var viewer = new Motor.Viewer({
      container: "container",
      antialias: true,
      viewerMode: Motor.ViewerMode.BIM,
      appid: config.bridge.motorAppId,
      secret: config.bridge.motorSecret,
      backgroundImageCss: "url('/assets/images/login-bg.jpg')"
    });
    let project = viewer.queryProject(projectId);
    this.project = project;
    viewer.initialize().then(function() {
      that.drawProject(projectId, true, false);
    });
},3000);
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
      
    },
     drawProject(projectId, isInSubScene, aBd) {
      let that=this;
      this.project
        .open({
          drawEdge: isInSubScene
        })
        .then(function() {
        that.flag=false;
           $('#loading').hide();
        });
    },
  }
}
</script>

<style lang="less" lang='less' scoped>
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
