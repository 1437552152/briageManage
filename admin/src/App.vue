<template>
  <div id="Myapp">
    <router-view />
  </div>
</template>

<script>
import Nav from "@/components/nav/index";
export default {
  components: { Nav },
  name: "App",
  data() {
    return {};
  },
  methods: {},
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (val.matched[0].path === "/ChildSystem") {
          if (val.query.bridgeId) {
            window.localStorage.setItem("bridgeId", val.query.bridgeId);
            window.localStorage.setItem("viewToken", val.query.viewToken);
          } else {
            this.$router.push({
              path: "/ParentSystem/home",
            });
            localStorage.clear("bridgeId");
              localStorage.clear("viewToken");
          }
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="less">
@import "./index.less";
@import "./common.less";
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #0b212b;
}

#Myapp .ivu-input {
  background-color: transparent;
  border: 1px solid rgba(68, 215, 182, 0.48);
  border-radius: 2px;
  border-radius: 2px;
}

#Myapp {
  background-color: #0b212b;
  .ivu-drawer-content {
    background-color: rgb(4, 35, 44);
  }
  .ivu-drawer-header {
    border-bottom: none;
  }
  .ivu-drawer-header-inner {
    color: #54fbfc;
    font-size: 18px;
  }
  .ivu-input-icon-normal + .ivu-input {
    padding-right: 32px;
  }
  .ivu-input:focus,
  .ivu-input:hover {
    border-color: #22e1ba;
  }
}
.DrawerSty {
  .ivu-input {
    border: 1px solid #22e1ba;
    background-color: #0b212b;
    color: #fff;
  }
  .ivu-drawer-header {
    background-color: rgb(4, 35, 44);
  }
  .demo-drawer-footer {
    button {
      background-color: #21746a;
      border-color: #21746a;
      color: #fff;
    }
  }
  .right-search .ivu-select-dropdown {
    background-color: #073544;
  }
  .ivu-drawer-header-inner {
    color: #54fbfc;
    font-size: 18px;
  }
  .ivu-drawer-header {
    border-bottom: none;
  }
  .ivu-select-single .ivu-select-selection {
    height: 32px;
    position: relative;
  }

  .ivu-select-selection {
    background-color: #04232c;
    border: 1px solid rgba(68, 215, 182, 0.48);
    border-radius: 2px;
    border-radius: 2px;
  }

  .ivu-form-item-label {
    color: #b7bece;
  }
}

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
.tableBox .ivu-table {
  color: #fff;
  background: none;
  th {
    background-color: #0d3541;
    border-bottom: 1px solid #33405a;
  }
  td {
    background-color: #0b212b;
    border-bottom: 1px solid #33405a;
    color: #999;
  }
}
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px 16px;
  text-align: right;
}
.clearfix {
  clear: both;
}
#Myapp {
  width: 100%;
  height: 100%;
  // margin-bottom: 60px;
}
</style>
