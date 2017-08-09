<template>
  <div class="layout">
    <UserInfo v-if="showUser" :show="showUser" :data="userData" @on-show-change="showUser = !showUser"></UserInfo>

    <Menu mode="horizontal" theme="dark" active-name="1" class="navigator-top">
      <div class="layout-logo-name">
        <span>
          书箱网
        </span>
      </div>
      <!--用户top信息-->
      <div class="layout-login-info">
        <div>
           <span>
            欢迎光临书箱网，
              <a href="#/login" v-show="!isloginout">请登录成为会员</a>
              <a v-show="isloginout" @click="Info">欢迎{{userInfo.userName}}</a>
          </span>
          <span>
            <Icon type="ios-cart" class="icon-car"></Icon>购物车
          </span>
          <span>
            我的订单
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
      <div class="layout-assistant">
        <Input v-model="searchBookName" placeholder="请输入您要找的书籍"  style="width: 300px" ></Input>
        <Button type="primary" shape="circle" icon="ios-search" @click="search">搜索</Button>
      </div>
    </Menu>
    <div class="layout-content">
      <Row>
        <!--侧边栏-->
        <i-col span="5">
          <Menu active-name="0-1" width="auto" :open-names="['0']">
            <Submenu name="0">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
               首页
              </template>
              <Menu-item name="0-1" ><span @click="siderBar('All')">全部</span></Menu-item>

            </Submenu>
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                Web
              </template>
              <Menu-item name="1-1"> <span @click="siderBar('#/html')">Html</span></Menu-item>
              <Menu-item name="1-2"><span @click="siderBar('#/css')">Css</span></Menu-item>
              <Menu-item name="1-3"><span @click="siderBar('#/js')">Javascript</span></Menu-item>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                数据库
              </template>
              <Menu-item name="2-1"><span @click="siderBar('#/nosql')">Nosql</span></Menu-item>
              <Menu-item name="2-2"><span @click="siderBar('#/mysql')">Mysql</span></Menu-item>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                生活
              </template>
              <Menu-item name="3-1"><span @click="siderBar('#/culture')">文学</span></Menu-item>
              <Menu-item name="3-2"><span @click="siderBar('#/science')">科技</span></Menu-item>
            </Submenu>
          </Menu>
        </i-col>
        <!--内容区域-->
        <i-col span="19">
          <div class="layout-content-main" v-if="All">
            <Carousel autoplay  class="test" style="background: #f5f7f9;" v-model="value2">
              <Carousel-item>
                <div class="demo-carousel">
                  <img src="../assets/js.jpg" />
                  <span>
                    JavaScript高级程序设计(第3版)(JavaScript技术名著，教程精粹，html 实战实例,销量超过8万册)
                  </span>
                </div>
              </Carousel-item>
              <Carousel-item>
                <div class="demo-carousel">
                  <img src="../assets/css.jpg" alt="">
                  <span>CSS权威指南（第三版）</span>
                </div>
              </Carousel-item>
              <Carousel-item>
                <div class="demo-carousel">
                  <img src="../assets/mongo.jpg" alt="">
                  <span>
                    MongoDB权威指南（第2版）【MongoDB项目核心团队成员倾力打造，权威著作，无可替代】
                  </span>
                </div>
              </Carousel-item>
              <Carousel-item>
                <div class="demo-carousel">
                  <img src="../assets/cuturl.jpg" alt="">
                  <span>余秋雨经典！影响全球三代华人的文化价值观，值得全家人一读再读的经典之作</span>
                </div>
              </Carousel-item>
            </Carousel>

            <Tabs value="name1" v-if="!Buying">
              <Tab-pane label="全部书籍" name="name1">
                <Tab-pane label="热门书籍" name="name2">

                </Tab-pane>
                <Table :context="self" :columns="bookTitle" :data="allBooks"></Table>
              </Tab-pane>
              <Tab-pane label="特价书籍" name="name3">特价书籍</Tab-pane>
            </Tabs>
            <div v-if="Buying" class="buy-div">
                <div class="p-13">
                  <span>{{'书名：'+bookDetail.name}}</span>
                </div>
                <div class="p-13">
                  <span>{{'作者：'+bookDetail.author}}</span>
                </div>
                <div class="p-13">
                  <span>{{'出版时间：'+bookDetail.time}}</span>
                </div>
                <div class="p-13">
                  <span>{{'简介：'+bookDetail.discribe}}</span>
                </div>
                <div class="p-13">
                  <span>{{'￥：'+bookDetail.price +'元'}}</span>
                </div>
                <Button type="primary" @click="order">下单</Button>
                <Button type="warning" @click="backHome">取消</Button>
                <Buy :show="showBuy" :data="Buydata" @on-show-change="showBuy= !showBuy"></Buy>
                <div class="p-13">
                  <Tabs value="comment1">
                    <Tab-pane label="全部评论" name="comment1">
                      <div>
                        <span>读书爱好者:</span>
                        <span>感觉不错</span>
                      </div>
                      <div>
                        <span>john:</span>
                        <span>价格合理</span>
                      </div>
                    </Tab-pane>

                  </Tabs>
                </div>
            </div>
            <div v-if="ordering">
              <Form ref="formBuy" :model="formBuy" :rules="ruleInline">
                <Form-item prop="buy_phone">
                  <Input text="text" v-model="formBuy.phone" placeholder="收货人联系电话">
                  </Input>
                </Form-item>
                <Form-item prop="buy_address">
                  <Input text="text" v-model="formBuy.address" placeholder="收货地址">
                  </Input>
                </Form-item>
              </Form>
            </div>
          </div>
          <div class="layout-content-main" v-if="!All">
            <transition name="fade" mode="out-in" appear>
              <router-view></router-view>
            </transition>
          </div>
        </i-col>
      </Row>
    </div>
    <Contents v-if='showContent' :show="showContent" :data="contentData" @on-show-change="showContent = !showContent"></Contents>
    <div class="layout-copy">
      我们的邮箱：936937805@qq.com
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Buy from '../operation/buy';
import UserInfo from '../operation/userInfo';
import Contents from '../operation/content'
export default {
  name: 'hello',
  data () {
    return {
      searchBookName:'',
      isloginout:false,//未登录标识
      userInfo:'',
      self: this,
      Buying:false,
      ordering:false,
      showBuy:false,
      showUser:false,
      showContent:false,
      contentData:{},
      userData:{},
      Buydata:{},
      value2:0,
      All:true, //初始化全部商品
      bookDetail:'',
      bookTitle:[
        {
          title:'书名',
          key:'name'
        },
        {
          title:"类型",
          key:'type'
        },
        {
          title:'价格',
          key:'price'
        },
        {
          title:'余量',
          key:'num'
        },
        {
          title:'商品货号',
          key:'id',
          className:'hah'
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          align: 'center',
          render (row, column, index) {
            return `<i-button type="text" size="small" @click="buyCar(${index})">加入购物车</i-button>
                    <i-button type="text" size="small" @click="seeContent(${index})">查看评论
                    <!--<Badge count="haha"></Badge></i-button>-->
                    <i-button type="text" size="small" @click="buy(${index})">购买</i-button>`;
          }
        }
      ],
      allBooks:[],
      formBuy:{
          address:'',
          phone:'',
      },
      ruleInline:{
          buy_address:[
            { required:true,message:'请填写配送地址',trigger:'blur'}
          ],
          buy_phone:[
            {required:true,message:'请填写收货人地址',trigger:'blur'}
          ]
      }
    };
  },
  components: {
    Buy,
    UserInfo,
    Contents
  },
  watch:{
    showBuy(curVal,oldVal){
      if(!curVal){
        this.allBooks = []
        axios.get('/api/adminAllProduct').then((res)=>{
          _.map(res.data,(item)=>{
            this.allBooks.push({
              name :item.p_name,
              type : item.p_type,
              price : item.p_price,
              num : item.p_num,
              author:item.p_author,
              time:(new Date(Number(item.p_time)).toLocaleDateString()),
              id:item._id,
              discribe:item.p_discribe,
              content:item.p_content
            });
          });
        });
        this.backHome()
      }
    }
  },
  mounted:function(){
    axios.get('/api/userinfo').then((res)=>{
//          console.log('userInfo.vue',res);
          if(res.data == ''){
            this.isloginout = false;
          }else{
            this.userInfo = res.data[0];
            this.isloginout = true;
          }

    });
    axios.get('/api/adminAllProduct').then((res)=>{
        _.map(res.data,(item)=>{
          this.allBooks.push({
              name :item.p_name,
              type : item.p_type,
              price : item.p_price,
              num : item.p_num,
              author:item.p_author,
              time:(new Date(Number(item.p_time)).toLocaleDateString()),
              id:item._id,
              discribe:item.p_discribe,
            content:item.p_content
          });
        });
    });
  },
  updated:function(){
    if(window.location.hash =='#/'){
      this.All = true;
    }else{
      this.All = false;
    }
  },
  methods:{
      /*注销操作*/
      loginout:function () {
        axios.get('/api/logout').then((res)=>{
            if(res.data.status == 0){
                this.isloginout = false;
                this.$Message.success(res.data.msg);
                this.userInfo = [];
            }
        })
      },
      //购买商品
      buy (row) {
          this.Buying = true;
          this.bookDetail = this.allBooks[row];
      },
      //加入购物车
      buyCar (row) {
         if(this.userInfo ==''){
             this.$Message.error('请先登录');
             window.location.href = '#/login';
             return
         };

         if(this.allBooks[row].num ==0){
             this.$Message.error('商品已售罄');
         }else{
//             console.log(this.userInfo.vue,this.allBooks[row]);
             axios.request({
               method:'post',
               url:'/api/addCar',
               data:{
                  userName:this.userInfo.userName,
                  detail:this.allBooks[row]
               }
             }).then((res)=>{
                 console.log(res);
                 if(res.data.ok ==1){
                    if(res.data.nModified ==0){
                        this.$Message.error('购物车已存在');
                    }else{
                      this.$Message.success('成功加入购物车！')
                    }
                 }else{
                     this.$Message.error('加入购物车失败')
                 }
             });
         }
      },
      //下单
      order(){
        this.Buydata = this.bookDetail;
        this.Buydata.userName = this.userInfo.userName;
        this.showBuy=true;
      },
      handleSubmit (name) {
        var name = 'order';
        this.$refs[name].validate((valid) => {
          if (valid) {
          } else {
            this.$Message.error('表单验证失败!!!!');
          }
        })
      },
      backHome  (){
          this.Buying = false;
//          this.handleReset();
      },
      handleReset (name) {
        var name = 'order';
        this.$refs[name].resetFields();
      },

      //用户购物车信息 订单信息 个人信息
      Info(){
          this.showUser = true;
          this.userData = this.userInfo;
//          console.log(this.showUser)
      },
      siderBar(flag){
          if(flag =='All'){
            this.All = true;
            window.location.href ='#/'
          }else{
            this.All = false;
            window.location.href =flag
          }
      },
      /*查看评论*/
      seeContent(index){
        console.log(this.allBooks[index]);
        this.showContent = true;
        this.contentData = this.allBooks[index];
      },
      search(){
          if(this.searchBookName == ''){
            axios.request({
              method:'get',
              url:'/api/adminAllProduct',
            }).then((res)=>{
              if(res.data){
                this.allBooks = [];
                _.map(res.data,(item)=>{
                  this.allBooks.push({
                    name :item.p_name,
                    type : item.p_type,
                    price : item.p_price,
                    num : item.p_num,
                    author:item.p_author,
                    time:(new Date(Number(item.p_time)).toLocaleDateString()),
                    id:item._id,
                    discribe:item.p_discribe,
                    content:item.p_content
                  });
                });
              }
            });
          }else{
              axios.request({
                method:'get',
                url:'/api/search',
                params:{
                    name:this.searchBookName
                }
              }).then((res)=>{
                  if(res.data){
                      this.allBooks = [];
                    _.map(res.data,(item)=>{
                      this.allBooks.push({
                        name :item.p_name,
                        type : item.p_type,
                        price : item.p_price,
                        num : item.p_num,
                        author:item.p_author,
                        time:(new Date(Number(item.p_time)).toLocaleDateString()),
                        id:item._id,
                        discribe:item.p_discribe,
                        content:item.p_content
                      });
                    });
                    this.$Message.success('搜索成功');
                  }
              });
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
    .demo-carousel
      height 300px
      color black
    .test
      img
        width 28%
        float left
        margin-left 60px
      span
        display inline-block
        margin-top 10%
        margin-left 15px
        font-size 14px
    .p-13
      padding 13px 0px
      font-size 16px
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
    .buy-div
      width 50%
      margin 30px 200px
      box-shadow 0 0 25px #cac6c6
      padding 10px 30px
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
</style>
