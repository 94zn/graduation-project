<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="1" class="navigator-top">
      <!--logo -->
      <div class="layout-logo-name">
        <span>
          书箱网管理
        </span>
      </div>
      <!--用户top信息-->
      <div class="layout-login-info">
        <div>
           <span>
            欢迎光临书箱网后台管理，
              <a v-show="isloginout">欢迎{{userInfo.adname}}</a>
          </span>
          <span @click="loginout" v-show="isloginout">
            注销
          </span>
        </div>
      </div>
      <!--一级导航-->
      <div class="layout-nav">

      </div>
    </Menu>
    <!--二级导航-->
    <Menu mode="horizontal" active-name="1" class="nav-2">
      <!--<div class="layout-assistant">-->
        <!--<Input v-model="searchBookName" placeholder="请输入您要找的书籍" style="width: 300px" ></Input>-->
        <!--<Button type="primary" shape="circle" icon="ios-search">搜索</Button>-->
      <!--</div>-->
    </Menu>
    <div class="layout-content">
      <Row>
        <!--侧边栏-->
        <i-col span="5">
          <Menu active-name="0-1" width="auto" :open-names="['0']" class="sider-nav">
            <Submenu name="0">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                订单管理
              </template>
              <Menu-item name="0-1"><span @click="changeLink('order')">全部订单</span></Menu-item>
            </Submenu>
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                商品管理
              </template>
              <Menu-item name="1-1"><span @click="changeLink('products')">全部商品</span></Menu-item>
              <Menu-item name="2-2"><span @click="changeLink('add')">添加商品</span></Menu-item>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                用户管理
              </template>
              <Menu-item name="2-1" ><span @click="changeLink('users')" >全部用户</span></Menu-item>

            </Submenu>
          </Menu>
        </i-col>
        <!--内容区域-->
        <i-col span="19">
          <div class="layout-content-main">
            <transition name="fade" mode="out-in" appear>
              <router-view></router-view>
            </transition>

          </div>
        </i-col>
      </Row>
    </div>
    <div class="layout-copy">
      我们的邮箱：936937805@qq.com
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'hello',
    data () {
      return {
        searchBookName:'',
        isloginout:false,//未登录标识
        userInfo:''
      };
    },
    beforeMount() {
      axios.get('/api/checkLogin').then((res)=>{
        console.log('userInfo',res);
        if(res.data.status ==1){
          window.location.href = '#/adminLogin'
        }
        if(res.data.userInfo == ''){
          this.isloginout = false;
        }else{
          this.userInfo = res.data.userInfo[0]
          this.isloginout = true;
        }
      });
      this.changeLink('order');
    },
    methods:{
      /*注销操作*/
      loginout:function () {
        axios.get('/api/adminloginout').then((res)=>{
          if(res.data.status == 0){
            this.isloginout = false;
            this.$Message.success(res.data.msg);
            window.location.href = "#/adminLogin"
          }
        })
      },

      changeLink:function (name) {
          switch (name){
            case 'add':
                  window.location.href = '#/admin/add';
                  break;
            case 'products':
                  window.location.href = '#/admin/products';
                  break;
            case 'users':
                  window.location.href = '#/admin/users';
                  break;
            case 'order':
                  window.location.href = '#/admin/order';
                  break;
          }

      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="sheetstyle/stylus">
  .layout
    border 1px solid #d7dde4
    background #f5f7f9
    position relative
  .navigator-top
    background #f9f9f9
  .layout-logo
    width 100px
    height 30px
    background #5b6270
    border-radius 3px
    float left
    position relative
    top 15px
    left 20px

  .layout-nav
    width 420px
    margin 0 auto
  .nav-2
    text-align center
  .layout-assistant
    width 300px
    margin 0 auto
    height inherit
    display inline
  .layout-breadcrumb
    padding 10px 15px 0
  .layout-content
    min-height 200px
    margin 15px
    overflow hidden
    background #fff
    border-radius 4px
  .layout-content-main
    padding 10px
  .layout-copy
    text-align center
    padding 10px 0 20px
    color #9ea7b4
  .layout-login-info
    span
      color #999
      margin-right 10px
      &:hover
        cursor pointer
    .icon-car
      margin-right 4px
  .ivu-menu-dark
    background #f9f9f9
    .layout-logo-name
      display inline-block
      margin-left 31px
      font-size 26px
      font-family monospace
      color #fff
    .layout-login-info
      display inline-block
      position absolute
      text-align center
      width 100%
      color #fff
  .sider-nav
    a


</style>
