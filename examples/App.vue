<template>
  <div class="entry">
    <div class="nav">
      <div class="title" @click="goHome">组件库示例</div>
      <div class="title-line"></div>
    </div>
    <div class="content">
      <Menu theme="dark" class="menu" :active-name="activeName" @on-select="changeMenu">
        <MenuGroup :title="item.textName" v-for="(item, index) in routes" :key="item.path">
          <MenuItem :name="item.name">{{ item.textName }}</MenuItem>
        </MenuGroup>
      </Menu>
      <div class="example">
        <div class="empty" v-if="showEmpty">展示区</div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { routes } from './router/index'

export default {
  data() {
    return {
      routes,
      showEmpty: true,
      activeName: ''
    }
  },
  watch: {
    $route(to) {
      if (to.path !== '/') {
        this.showEmpty = false
      } else {
        this.showEmpty = true
      }
    }
  },
  mounted() {
    if (window.location.pathname !== '/') {
      this.showEmpty = false
      this.activeName = window.location.pathname.replace('/', '')
    }
  },
  methods: {
    changeMenu(e) {
      this.$router.push(e)
      this.activeName = e
    },
    goHome() {
      this.$router.replace('/')
      this.activeName = ''
    }
  }
}
</script>
<style lang="less" scoped>
:deep(.ivu-menu-vertical.ivu-menu-light:after) {
  width: 0;
}
.entry {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .nav {
    width: 100%;
    height: 5.5vh;
    box-shadow: 1px 3px 5px #292d40;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5vw;
    background-color: #202124;
    position: relative;
    .title {
      cursor: pointer;
      color: #e3e9ed;
      font-size: 1.1vw;
      font-weight: bold;
    }
    .title-line {
      width: 6.5vw;
      height: 2px;
      background-color: #e13d2f;
      position: absolute;
      top: 100%;
      left: 0%;
      box-shadow: 1px 0px 8px #e13d2f;
    }
  }
  .content {
    display: flex;
    height: 95vh;
    width: 100%;
    .menu {
      height: 100%;
      box-shadow: 1px 5px 10px #202124;
      background-color: #202124;
    }
    .example {
      flex: 1;
      padding: 10px;
      .empty {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 50px;
      }
    }
  }
}
</style>
