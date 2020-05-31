<template>
  <div class="contain">
    <vue-seamless-scroll
      :data="newsList"
      :class-option="optionLeft"
      class="seamless-warp2"
    >
      <ul class="item">
        <li
          v-for="(item, index) in newsList"
          v-text="item.title"
          :key="index"
        ></li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: [
        {
          title: "武汉市最新通告:自2020年4月5日起，禁止货车上高架"
        },
        {
          title: "武汉市最新通告:自2020年4月5日起，禁止货车上高架"
        },
        {
          title: "武汉市最新通告:自2020年4月5日起，禁止货车上高架"
        },
        {
          title: "武汉市最新通告:自2020年4月5日起，禁止货车上高架"
        },
        {
          title: "武汉市最新通告:自2020年4月5日起，禁止货车上高架"
        }
      ]
    };
  },
  methods: {},
  computed: {
    optionLeft() {
      return {
        direction: 2,
        limitMoveNum: 2
      };
    }
  },
  mounted() {
    const that = this;
  }
};
</script>
<style lang="less" scoped>
.contain {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("../../assets/images/bg.png") no-repeat;
  background-size: 100% 100%;
}
.seamless-warp2 {
  overflow: hidden;
  height: 25px;
  width: 380px;
  position: absolute;
  top:7%;
  left:70%;
  font-size: 20px;
  color: #fff;
  ul.item {
    width: 580px;
    li {
      float: left;
      margin-right: 10px;
    }
  }
}
</style>
