<template>
    <div class="cointaner">
      <parentNav />
        <router-view />
    </div>
</template>

<script>
import parentNav from "@/components/parentNav/index";
export default {
  components: { parentNav },
  data() {
    return {
     
    };
  },
  methods: {

  }
};
</script>
<style lang='less' scoped>
.cointaner{
    position: relative;
    width:100%;
    height:100%;
}
</style>