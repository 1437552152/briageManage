<template>
   <div class="diBu">
        <div style="margin-bottom:10px"> <Button type="default" @click="checkReturn" v-if="type==='0'">返回</Button></div>
        <div> <Button type="default" @click="checkOut">退出登陆</Button></div>      
    </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
 props: {
    type: {
      type: String,
      default: "0"
  }},
  methods: {
    checkOut(){
      this.$router.push({
         path:'/login',
      });
    },
    checkReturn(){
       this.$router.push({
         path:'/ParentSystem/home',
      });  
    }
  }
};
</script>
<style lang='less' scoped>
.diBu{
  bottom: 10px;
    position: fixed;
}
.diBu button{
 background-color: #21746a;
    border-color: #21746a;
    color: #fff; 
  width: 100px;
  margin-left:15px
}
</style>
