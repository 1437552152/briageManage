<template>
  <div class="tableBox">
    <iframe
      align="center"
      width="100%"
      :height="ContentHeight"
      :src="src"
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      scrolling="no"
    />

    <div class="boxStyle"></div>
    <div class="titleTotal">
      <div class="title">
        总体信息<img src="../../../../assets/images/dashed.png" />
      </div>
    </div>

    <div class="totalInfoTable">
      <div class="title">总体-管理信息表</div>
      <div class="box">
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          align="center"
        >
          <tbody>
            <tr class="bridgeBim">
              <td>桥名</td>
              <td>总桥长</td>
              <td>建设单位</td>
              <td>项目管理单位</td>
              <td>项目性质</td>
              <td>投资主体</td>
              <td>施工单位</td>
              <td>勘查单位</td>
              <td>设计单位</td>
              <td>建设起始年月</td>
              <td>建成年月</td>
            </tr>
            <tr>
              <td>{{ briageParams.name }}</td>
              <td>{{ briageParams.mile }}</td>
              <td>{{ briageParams.buildUnit }}</td>
              <td>{{ briageParams.projectManagerUnit }}</td>
              <td>{{ briageParams.projectNature }}</td>
              <td>{{ briageParams.invest }}</td>
              <td>{{ briageParams.constructUnit }}</td>
              <td>{{ briageParams.exploreUnit }}</td>
              <td>{{ briageParams.designUnit }}</td>
              <td>{{ briageParams.beginTime }}</td>
              <td>{{ briageParams.endTime }}</td>
            </tr>
            <tr class="bridgeBim">
              <td>竣工验收年月</td>
              <td>建成年月</td>
              <td>管理单位</td>
              <td>养护单位</td>

              <td>接管年月</td>
              <td>移交年月</td>
              <td>接管移交范围</td>
              <td>接管移交移交历史</td>
              <td>执法单位</td>
              <td>管理桥长</td>
              <td>执法桥长</td>
            </tr>
            <tr>
              <td>{{ briageParams.checkTime }}</td>
              <td>{{ briageParams.endTime2 }}</td>
              <td>{{ briageParams.managerUnit }}</td>
              <td>{{ briageParams.maintainUnit }}</td>
              <td>{{ briageParams.takeOverTime }}</td>
              <td>{{ briageParams.turnOverTime }}</td>
              <td>{{ briageParams.overTime }}</td>
              <td>{{ briageParams.overList }}</td>
              <td>{{ briageParams.lawUnit }}</td>
              <td>{{ briageParams.managerMile }}</td>
              <td>{{ briageParams.lawMile }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="totalInfoTable">
      <div class="title">总体-结构信息表</div>
    </div>
    <div class="inputStyle">
      <Form :model="formData" class="right-search" inline :label-width="95">
        <Row  type="flex" justify="start">
          <Col :xl="5" :xxl="4">
            <FormItem label="主线/匝道编号:">
              <Input
                v-model="formData.mainCode"
                placeholder="请输入主线/匝道编号"
              ></Input>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="主梁编号:">
              <Input
                v-model="formData.mainBeamCode"
                placeholder="请输入主梁编号"
              ></Input>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="墩号范围:">
              <Select v-model="formData.pierNoRange">
                <Option value="P1-P4" key="1">P1-P4</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xl="3" :xxl="3">
            <Button type="primary" @click="handleSubmit('formValidate')"
              >查询</Button
            >
            <Button @click="handleReset" style="margin-left: 8px">重置</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="tableBorder">
      <Table
        :columns="columns"
        :data="data"
        highlight-row
        @on-row-click="rowClick"
        border
        id="tabletwo"
      ></Table>
    </div>
    <!-- <div class="pagePosition pageStyle">
      <Page
        :total="100"
        show-elevator
        show-sizer
        :current="current"
        :page-size="pageSize"
        show-total
        @on-change="onChange"
        @on-page-size-change="onSizeChange"
      />
    </div> -->
  </div>
</template>

<script>
import { exportFileService } from "@/view/utils/myFetch";
import { getbridgeStructInfo } from "@/util/api";
import { filterParams } from "@/util/commonFilter";
import { getbridgeBridgeInfo } from "@/util/api";
export default {
  data() {
    return {
      current: 1,
      pageSize: 10,
      ContentHeight: 500,
      drawerImg: require("../../../../assets/images/down.png"),
      value3: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static",
        backgroundColor: "#04232c"
      }, //样式
      formData: {
        mainCode: "",
        mainBeamCode: "",
        pierNoRange: ""
      }, // 表单数据
      bridgeId: this.$route.query.bridgeId, //桥id
      src: localStorage.getItem("bimUrl"), //缓存的桥bim
      briageParams: {}, //桥信息
      columns: [
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
              /*         key: "", */
              align: "center",
              children: [
                {
                  key: "structStyleFeature1",
                  align: "center",
                  title: "属性设置"
                },
                {
                  key: "structStyleFeature2",
                  align: "center",
                  title: "属性设置"
                }
              ]
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
          title: "图纸下载",
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
      ],
      data: []
    };
  },
  created() {
    this.getbridge();
    this.getBriageList();
  },
  mounted() {
       window.addEventListener('scroll', this.load)
  },
  methods: {
        load(){
             var oDiv =document.getElementById('tabletwo').getElementsByTagName('table')[0],
          H = 0,
          Y = oDiv        
          while (Y) {
          H += Y.offsetTop; 
          Y = Y.offsetParent;
          }
      var s = document.body.scrollTop || document.documentElement.scrollTop
      if(s>H-500) {
         console.log(oDiv)
          oDiv.style = "position:fixed;top:500px;z-index:99"
      } else {
           oDiv.style = ""
      }
  },
    getbridge() {
      let body = {};
      body = filterParams(this.formData);
      body.bridgeId = this.bridgeId;
      getbridgeStructInfo(body).then(res => {
        this.data = res.data;
      });
    },
    getBriageList() {
      let that = this;
      getbridgeBridgeInfo().then(res => {
        res.data.map(item => {
          if (item.id === localStorage.getItem("bridgeId")) {
            that.briageParams = item;
          }
        });
      });
    },

    onChange(page) {
      this.current = page;
    },
    onSizeChange(paseSize) {
      this.pageSize = pageSize;
    },
    rowClick(params) {
      this.src = params.bimUrl;
    },
    handleSubmit(name) {
      this.getbridge();
    },
    handleReset(name) {
      for (let key in this.formData) {
        this.formData[key] = "";
      }
      this.getbridge();
    }
    /* IconClick() {
    } */
  }
};
</script>

<style lang="less" scoped>
.pagePosition {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.tableBox .ivu-table-row-highlight td,
.tableBox .ivu-table-row-highlight:hover td {
  background-color: #0d3541;
  color: #fff;
}

.tableBox {
  padding-bottom: 100px;
}
.inputStyle {
  margin-top: 40px;
  // margin-bottom: 30px;
}

.totalInfoTable {
  .title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .box {
    margin-left: 35px;
    margin-right: 35px;
  }
  table {
    border-top: 1pt solid #33405a;
    border-left: 1pt solid #33405a;
    margin: 0 auto;

    margin-bottom: 60px;
  }
  td {
    padding: 10px 10px;
    text-align: center;
    border-right: 1pt solid #33405a;
    border-bottom: 1pt solid #33405a;
    color: #515a6e;
  }

  .bridgeBim td {
    color: #fff;
    font-weight: bold;
  }

  tr:nth-of-type(odd) {
    // background: #c6f9f7;
  } /* odd 标识奇数行，even标识偶数行 */
  tr:hover {
    // background: #e0f0f0;
  } /*鼠标悬停后表格背景颜色*/
}


</style>
