<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2020-06-06 02:39:01
 * @LastEditTime: 2020-12-07 20:32:37
 * @LastEditors: yfye
-->
<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <div class="login-module">
        <Card icon="log-in" title="城市集群桥梁检测系统" :bordered="false">
          <div class="form-con">
            <login-form @on-success-valid="handleSubmit"></login-form>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/login-form";
import { login } from "@/util/api";
export default {
  components: {
    LoginForm
  },
  methods: {
    handleSubmit({ userName, password }) {
      const that = this;
      let value = {};
      value.username = userName;
      value.password = password;
      login(value).then(res => {
         if(res){
          that.$router.push({
            path:'/ParentSystem/home',
          });
          localStorage.setItem("token",res);
          localStorage.setItem("type",1);
         }
      }
    ).catch(err => {
        that.$Message.error("账号密码不正确");
      });
  }}
};
</script>

<style lang='less' scoped>
.login-con {
  width: 600px;
  height: 100%;
  padding: 25px;
  background-color: rgba(5, 20, 25, 0.6);
  bottom: 0;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateY(0);
  .ivu-icon-log-in {
    display: none;
  }
}
</style>
