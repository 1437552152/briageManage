<template>
  <Form
    ref="loginForm"
    :model="form"
    :rules="rules"
    @keydown.enter.native="handleSubmit"
  >
    <FormItem prop="userName">
      <Input
        v-model="form.userName"
        placeholder="请输入用户名"
        class="loginInput"
        prefix="ios-person"
      >
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input
        type="password"
        v-model="form.password"
        placeholder="请输入密码"
        class="loginInput"
        prefix="md-lock"
      >
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long class="loginBtn"
        >登录</Button
      >
    </FormItem>
    <span class="matter">常见问题</span>
  </Form>
</template>
<script>
import {checkPwd,checkUserName} from "@/view/utils/Checkform"
export default {
  name: "LoginForm",
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "账号不能为空", trigger: "blur" },{validator: checkUserName, trigger: 'blur'}];
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "密码不能为空", trigger: "blur" },{validator: checkPwd, trigger: 'blur'}];
      }
    }
  },
  data() {
    return {
      form: {
        userName: "",
        password: ""
      }
    };
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      };
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit("on-success-valid", {
            userName: this.form.userName,
            password: this.form.password
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.loginBtn {
  background-color: #1cebec;
  color: #fff;
  border: 0;
  height: 38px;
  font-size: 18px;
}
.loginInput {
  background: #073544;
  height: 42px;
  line-height: 40px;
}
.loginInput .ivu-input {
  background: #073544;
  height: 42px;
  line-height: 40px;
}
.matter {
  color: #4eecee;
  top: -9px;
  position: relative;
  font-size: 12px;
}
</style>
