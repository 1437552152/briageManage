<template>
  <div class="tableBox">
     <div class="qiehuanPosition">
    <RadioGroup v-model="type"  @on-change="onChangeType">
        <Radio label="1">鲁班</Radio>
        <Radio label="2">广联达</Radio>
       
    </RadioGroup>
  </div>
    <BIMInfo v-if="type==1" ref="biminfo" />
    <BIMFACE  v-if="type==2" flag=2 />
    <div class="boxStyle"></div>
    <div class="titleTotal">
      <div class="title">
        构件信息<img src="../../../../assets/images/dashed.png" />
      </div>
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
          <Col :xl="5" :xxl="4">
            <FormItem label="构件类型:">
              <Select v-model="formData.componentType">
                <Option value="附属结构" key="1">附属结构</Option>
                <Option value="上部结构" key="2">上部结构</Option>
                <Option value="下部结构" key="3">下部结构</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xl="5" :xxl="4">
            <FormItem label="构件名称:">
              <Input v-model="formData.componentName" placeholder=""></Input>
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
    <Table
      :columns="columns"
      :data="data"
      highlight-row
      @on-row-click="rowClick"
      id="tableone"
    ></Table>
  </div>
</template>

<script>
import { getbridgeComponentInfo } from "@/util/api";
import { filterParams } from "@/util/commonFilter";
import BIMInfo from "@/components/BIMInfo/index";
import BIMFACE from "@/components/BIMFACE/index";
import dataTotal from "./exportData";
import $ from "jquery";
export default {
  data() {
    return {
      formInline: {
        name: ""
      },
      bridgeId: this.$route.query.bridgeId,
      formData: {
        componentType: "",
        componentName: "",
        pierNoRange: ""
      },
      columns: dataTotal.data,
      data: [],
      type: localStorage.getItem('type')||"1"
    };
  },
    components: {
    BIMInfo,
    BIMFACE
  },
  created() {
    this.getbridge();
  },
  mounted() {},
  methods: {
    dodail() {
      this.$refs.biminfo.sing(params);
    },
    getbridge() {
      let body = {};
      body = filterParams(this.formData);
      body.bridgeId = this.bridgeId;
      getbridgeComponentInfo(body).then(res => {
        this.data = res.data;
      });
    },
    rowClick(params) {
        this.dodail(params.id);
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
#loading {
  position: absolute;
  top: 0;
  z-index: 998;
  width: 100%;
  height: 100%;
  background-color: #0000004d;
}
.loading-image {
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50px;
  width: 100%;
}
</style>
