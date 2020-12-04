<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2020-06-06 02:39:00
 * @LastEditTime: 2020-12-04 23:14:37
 * @LastEditors: yfye
-->
<template>
  <div class="tableBox">
     <BIMInfo />   
      <div class="boxStyle"></div>
      <div class="titleTotal">
      <div class="title">裂缝发展分析<img src="../../../../assets/images/dashed.png"></div></div>   
    <Table  :columns="columns" :data="data"  highlight-row></Table>
   </div>
</template>

<script>
import { exportFileService } from '@/view/utils/myFetch';
import BIMInfo from "@/components/BIMInfo/index";
import dataTotal from "./exportData";
export default {
  data () {
    return {
      formInline: {
        name: ''
      },
      bridgeId: this.$route.query.bridgeId,
      columns:dataTotal.data,
      
      data: []
    }
  },
 components: {
    BIMInfo
  },
  methods: {
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
