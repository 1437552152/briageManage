<template>
  <div class="tableBox">
    这是首页
  </div>
</template>

<script>
import { exportFileService } from "@/view/utils/myFetch";
export default {
  data() {
    return {};
  },
  mounted() {
  
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
#toolbar {
  position: absolute;
  padding-top: 8px;
  padding-bottom: 12px;
  padding-left: 10px;
  padding-right: 10px;
  top: 0;
  width: calc(100% - 60px);
}
.description {
  position: relative;
  left: 0;
  color: white;
  font-size: 14px;
}
.buttons {
  position: absolute;
  right: 0;
  margin-right: 10px;
  padding-left: 10px;
}
.buttons button {
  background-color: transparent;
  color: white;
  border: 1px solid #ffffffcc;
  border-radius: 2px;
  height: 24px;
  line-height: 18px;
  margin: 0 5;
}
</style>
