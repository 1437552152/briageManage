<template>
  <div class="tableBox">
      <div class="qiehuanPosition">
    <RadioGroup v-model="type"  @on-change="onChangeType">
        <Radio label="1">鲁班</Radio>
        <Radio label="2">广联达</Radio>
    </RadioGroup>
  </div>
    <BIMInfo v-if="type==1"/>
    <BIMFACE  v-if="type==2" flag=2 />
    <div class="boxStyle"></div>
    <div class="titleTotal">
      <div class="title">
        布置及状态<img src="../../../../assets/images/dashed.png" />
      </div>
    </div>
    <div class="Meter1">
      <Pie
        className="container1"
        type="InstrumentPanel"
        :dataObj="data1"
        v-if="data1.value.length"
      />
    </div>
    <div class="inputStyle">
      <Form
        :model="formData"
        label-position="right"
        class="right-search"
        inline
        :label-width="90"
      >
        <Row type="flex" justify="start">
          <Col :xl="4" :xxl="4">
            <FormItem label="传感器类型:">
              <Select v-model="formData.sensorType">
                <Option value="静挠度" key="1">静挠度</Option>
                <Option value="动挠度" key="2">动挠度</Option>
                <Option value="裂缝计" key="3">裂缝计</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xl="4" :xxl="4">
            <FormItem label="编号:">
              <Input v-model="formData.sensorCode" placeholder="" />
            </FormItem>
          </Col>
          <Col :xl="4" :xxl="4">
            <FormItem label="型号:">
              <Input v-model="formData.sensorModel" placeholder="" />
            </FormItem>
          </Col>
          <Col :xl="4" :xxl="4">
            <FormItem label="坐标:">
              <Input v-model="formData.centerSite" placeholder="" />
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
      id="tablethree"
    ></Table>
  </div>
</template>

<script>
import { exportFileService } from "@/view/utils/myFetch";
import { getbridgeSensorInfo, getsensorInfo } from "@/util/api";
import { filterParams } from "@/util/commonFilter";
import Pie from "@/view/components/Pie/Pie";
import BIMInfo from "@/components/BIMInfo/index";
import BIMFACE from "@/components/BIMFACE/index";
import dataTotal from "./exportData";
export default {
  components: {
    Pie,BIMInfo,BIMFACE
  },
  data() {
    return {
      bridgeId: this.$route.query.bridgeId,  
      formInline: {
        name: ""
      },
      data1: {
        title: "传感器类型",
        value: [],
        data: []
      },
      formData: {
        sensorType: "",
        sensorCode: "",
        sensorModel: "",
        centerSite: ""
      },
      columns:dataTotal.data,
      data: [],
      type: localStorage.getItem('type')||"1"
    }
  },
  created() {
    this.getbridge();
  },

  methods: {
    getbridge() {
      const that = this;
      getsensorInfo().then(res => {
        let a = [];
        let b = [];
        for (let key in res) {
          a.push(key);
          let params = {};
          params.name = key;
          params.value = Number(res[key]) * 100;
          b.push(params);
        }
        that.data1.value = a;
        that.data1.data = b;
      });
      let body = {};
      body = filterParams(this.formData);
      body.bridgeId = this.bridgeId;
      getbridgeSensorInfo(body).then(res => {
        this.data = res.data;
      });
    },
    rowClick(params) {
   
    },
    handleSubmit(name) {
      this.getbridge();
    },
    handleReset() {
      for (let key in this.formData) {
        this.formData[key] = "";
      }
      this.getbridge();
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
.tableBox .inputStyle {
  margin-left: 20px;
}
</style>
