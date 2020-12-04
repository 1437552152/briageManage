<template>
  <div class="tableBox">
     <BIMInfo />
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
        <Row type="flex" justify="start">
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
              <Input v-model="formData.pierNoRange" placeholder=""></Input>
             <!--  <Select v-model="formData.pierNoRange">
                <Option value="P1-P4" key="1">P1-P4</Option>
              </Select> -->
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
  </div>
</template>

<script>
import { exportFileService } from "@/view/utils/myFetch";
import { getbridgeStructInfo } from "@/util/api";
import { filterParams } from "@/util/commonFilter";
import { getbridgeBridgeInfo } from "@/util/api";
import BIMInfo from "@/components/BIMInfo/index";
import dataTotal from "./exportData";
export default {
  data() {
    return {
      bridgeId: this.$route.query.bridgeId,   
      formData: {
        mainCode: "",
        mainBeamCode: "",
        pierNoRange: ""
      }, // 表单数据
      briageParams: {}, //桥信息
      columns: dataTotal.data,
      data: []
    };
  },
  components: {
    BIMInfo
  },
  created() {
    this.getbridge();
    this.getBriageList();
  },
  mounted() {
    
  },
  methods: {
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
    rowClick(params) {
      
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
  
}

</style>
