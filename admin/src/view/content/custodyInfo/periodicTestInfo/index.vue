<template>
  <div class="tableBox">
    <div class="qiehuanPosition">
    <RadioGroup v-model="type"  @on-change="onChangeType">
        <Radio label="1">鲁班</Radio>
        <Radio label="2">广联达</Radio>
    </RadioGroup>
  </div>
    <BIMInfo v-if="type==1" />
    <BIMFACE  v-if="type==2" flag=2 /> 
    <div class="boxStyle"></div>
    <div class="titleTotal">
      <div class="title">
        定期检测信息<img src="../../../../assets/images/dashed.png" />
      </div>
    </div>
    <div class="inputStyle">
      <Form
        :model="formData"
        label-position="right"
        class="right-search"
        inline
        :label-width="100"
      >
        <Row type="flex" justify="start">
          <Col :xl="5" :xxl="4">
            <FormItem label="巡检开始时间:">
              <DatePicker
                type="date"
                v-model="formData.startTime"
                placeholder="请选择开始时间"
                style="width: 100%;"
              ></DatePicker>
            </FormItem>
          </Col>

          <Col :xl="5" :xxl="4">
            <FormItem label="巡检结束时间">
              <DatePicker
                type="date"
                v-model="formData.endTime"
                placeholder="请选择结束时间"
                style="width: 100%;"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="上报人:">
              <Input v-model="formData.name" placeholder=""></Input>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="所属构件类型:">
              <Select
                v-model="formData.structuralType"
                placeholder="请选择所属构件类型"
              >
                <Option value="附属工程" key="1">附属工程</Option>
                <Option value="上部结构" key="2">上部结构</Option>
                <Option value="下部结构" key="3">下部结构</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="所属构件:">
              <Select v-model="formData.component" placeholder="请选择所属构件">
                <Option value="声屏障基础" key="1">声屏障基础</Option>
                <Option value="声屏障立柱" key="2">声屏障立柱</Option>
                <Option value="屏障板" key="3">屏障板</Option>
                <Option value="连接螺栓" key="4">连接螺栓</Option>
                <Option value="综合评价病害" key="5">综合评价病害</Option>
                <Option value="栏杆基础" key="6">栏杆基础</Option>
                <Option value="立柱" key="7">立柱</Option>
                <Option value="栏帽" key="8">栏帽</Option>
                <Option value="栏片" key="9">栏片</Option>
                <Option value="防撞墙基础" key="10">防撞墙基础</Option>
                <Option value="防撞墙钢栏杆" key="11">防撞墙钢栏杆</Option>
                <Option value="沥清桥面" key="12">沥清桥面</Option>
                <Option value="混凝土桥面" key="13">混凝土桥面</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="轻重度:">
              <Select
                v-model="formData.diseaseSeverity"
                placeholder="请选择轻重度"
              >
                <Option value="轻度" key="1">轻度</Option>
                <Option value="重度" key="2">重度</Option>
              </Select>
            </FormItem>
          </Col>

          <Col :xl="5" :xxl="4">
            <FormItem label="处理状态:">
              <Select
                v-model="formData.dealStatue"
                placeholder="请选择处理状态"
              >
                <Option value="待维修" key="1">待维修</Option>
                <Option value="维修中" key="2">维修中</Option>
                <Option value="已维修" key="3">已维修</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xl="4" :xxl="4">
            <Button type="primary" @click="handleSubmit('formValidate')"
              >查询</Button
            >
            <Button @click="handleReset" style="margin-left: 8px">重置</Button>
          </Col>
        </Row>
      </Form>
    </div>

    <Table
      :columns="columns"
      :data="data"
      highlight-row
      @on-row-click="rowClick"
      id="tablenine"
    ></Table>
  </div>
</template>

<script>
import { exportFileService } from "@/view/utils/myFetch";
import Circles from "@/view/components/Circles/Circles";
import BIMInfo from "@/components/BIMInfo/index";
import BIMFACE from "@/components/BIMFACE/index";
import dataTotal from "./exportData";
import moment from "moment";
export default {
  components: {
    Circles,BIMInfo,BIMFACE
  },
  data() {
    return {
      formInline: {
        blongStructural: ""
      },
      formData: {
        startTime: "",
        endTime: "",
        name: "",
        structuralType: "",
        blongStructural: "",
        serious: "1",
        Urgency: "",
        DealStatus: "1"
      },
      bridgeId: this.$route.query.bridgeId,
      columns:dataTotal.data,
      data: [],
   type: localStorage.getItem('type')||"1"
    };
  },
  methods: {
    rowClick(params) {
      /*  this.src = 'http://www.baidu.com' */
    },
    handleSubmit(name) {
      this.getbridge();
    },
    handleReset(name) {
      for (let key in this.formData) {
        this.formData[key] = "";
      }
      this.getbridge();
    },
    getbridge() {
      let body = {};
      body = filterParams(this.formData);
      body.bridgeId = this.bridgeId;
      if (body.startTime) {
        body.startTime =
          moment(body.startTime).format("YYYY") +
          moment(body.startTime).format("MM") +
          moment(body.startTime).format("DD") +
          "000000";
      }
      if (body.endTime) {
        body.endTime =
          moment(body.endTime).format("YYYY") +
          moment(body.endTime).format("MM") +
          moment(body.endTime).format("DD") +
          "235959";
      }
      getbridgeInspectInfo(body).then(res => {
        this.data = res.data;
      });
    },
         onChangeType(type){
      localStorage.setItem('type',type);
        this.type=type;
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
.Meter {
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-around;
}
.tableBox .inputStyle {
  margin-left: 10px;
  margin-bottom: 30px;
  margin-top: 30px;
}
</style>
