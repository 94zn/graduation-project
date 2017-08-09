<template>
  <div :data="getData" >
    <Modal
      class="userInfo"
      v-model="ctrlShow"
      title="个人信息"
      width="800"
      :mask-closable="false"
      @on-cancel="close"
    >
      <div class="userName">
        用户名：{{ this.userInfo.userName }}
      </div>
      <div v-if="!showContent">
        <div>
          <Tabs value="name10">
            <Tab-pane label="购物车 " name="name10">
              <Table :context="self" :columns="carColumns" :data="carData"></Table>
            </Tab-pane>
            <Tab-pane label="全部订单" name="name20">
              <Table :context="self" :columns="orderColumns" :data="orderData"></Table>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
      <div v-if="showContent" class="content">
        <div class="bookName">
          <span>书名:</span><span>{{contentData.name}}</span>
        </div>
        <div class="content-input">
          <Input v-model="contentValue" placeholder="请输入..." style="width: 300px"></Input>
        </div>

        <Button type="info" @click="submitContent">提交评论</Button>
        <Button @click="cancelContent">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import axios from 'axios';
  export default{
    name:'userInfo',
    data(){
      return{
        userInfo:'',
        self: this,
        showContent:false,
        contentData:'',
        contentValue:'系统默认评论',
        carInfo:[],
        carColumns:[
          {
              title:'书名',
              key:'name',
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
              title:'介绍',
              key:'discribe'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render (row, column, index) {
              return `<i-button type="text" size="small" @click="removeCar(${index})">移除购物车</i-button><i-button type="text" size="small" @click="buy(${index})">购买</i-button>`;
            }
          }
        ],
        carData:[],
        orderColumns:[
          {
              title:'书名',
              key:'name'
          },
          {
              title:'收货人姓名',
              key:'userName'
          },
          {
              title:'收货电话',
              key:'phone'
          },

          {
              title:'收货地址' ,
              key:'address'
          },
          {
              title:'状态',
              key:'status'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render (row, column, index) {
              return `<i-button type="text" size="small" @click="content(${index})">评论</i-button>`;
            }
          }
        ],
        orderData:[]
      }
    },
    component:{

    },
    mounted(){
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default: {}
      }
    },
    computed:{
      ctrlShow() {
        return this.show;
      },
      getData() {
        console.log('获取到的userInfo数据',this.data);
        this.userInfo = this.data;
        //获取用户所有购物车信息
        this.carData = [];
        axios.request({
          method:'post',
          url:'/api/login',
          data:{
            flag:'register',
            userName:this.data.userName
          }
        }).then((res)=>{
            _.map(res.data[0].car,(item)=>{
              axios.request({
                method: 'get',
                url:'/api/userProduct',
                params:{
                  p_id:item
                }
              }).then((res)=>{
                  _.map(res.data,(item)=>{
                      this.carData.push({
                        'name':item.p_name,
                        'price':item.p_price,
                        'id':item._id,
                        'num':item.p_num,
                        'discribe':item.p_discribe
                      });
                  });
              });
            });
        });

        //获取用户所有订单
        axios.request({
          method:'get',
          url:'/api/userOrders',
          params:{
              userName:this.data.userName
          }
        }).then((res)=>{
            if(res.data){
                this.orderData = [];
                _.map(res.data,(item)=>{
                    this.orderData.push({
                      'userName':item.order_name,
                      'name':item.order_bookName,
                      'phone':item.order_phone,
                      'address':item.order_address,
                      'status':item.order_status,
                      'id':item._id  //订单id
                    });
                });
            }else{
                this.$Message.error('获取订单列表失败')
            }
          });
          return this.data;
      }
    },
    methods:{
//      移除购物车
      removeCar(index) {
        axios.request({
            method:'delete',
            url:'/api/deleteCar',
            params:{
                id:this.carData[index].id,
                name:this.data.userName
            }
          }
        ).then((res)=>{
          if(res.data.nModified ==1){
            this.reload();
            this.$Message.success('此商品已经移除购物车');
          }else{
            this.$Message.error('移除失败');
          }
        });
      },

      reload(){
          axios.request({
            method:'post',
            url:'/api/login',
            data:{
              flag:'register',
              userName:this.data.userName
            }
          }).then((res)=>{
              this.carData = [];
              _.map(res.data[0].car,(item)=>{
                  axios.request({
                    method: 'get',
                    url:'/api/userProduct',
                    params:{
                      p_id:item
                    }
                  }).then((res)=>{
                      this.carData.push({
                          'name':res.data[0].p_name,
                          'price':res.data[0].p_price,
                          'id':res.data[0]._id
                      });
                  });
              });

          });
      },

      buy(index){
          console.log(this.carData[index]);
      },

      submitContent(){
          if(this.contentValue == ''){
              this.$Message.error('提交内容不能为空')
          }else{
              this.$Message.success('提交成功');
//              console.log(this.contentData);
              axios.request({
                method:'get',
                url:'/api/getProductByOrderId',
                params:{
                    'id':this.contentData.id
                }
              }).then((res)=>{
                //拿productid 去写入评论
                axios.request({
                  method:'post',
                  url:'/api/addContent',
                  params:{
                    userName:res.data[0].order_userName,
                    p_id:res.data[0].order_id,
                    content:this.contentValue
                  }
                }).then((res)=>{
                  if(res.data){
                      this.$Message.success('添加评论成功');
                      this.close();
                  }
                });
              });
          }
      },
      content(index){
          this.showContent = true;
          this.contentData= this.orderData[index]
      },
      cancelContent(){
        this.showContent =false;
      },

      close() {
        this.$emit('on-show-change', false);
      },
    }
  }
</script>
<style lang="stylus" rel="sheetstyle/stylus">
  .userInfo
    .content
      padding-left 10px
      text-align center
      .bookName
        font-size 16px
        margin-left 10px
        margin-top 10px
      .content-input
        margin 12px
      .ivu-btn
        margin 12px
    .userName
      font-size 15px
      padding-left 13px
    .ivu-form
      padding 0 100px
    .ivu-form-item-content
      margin-left 88px
    .ivu-modal
      .ivu-modal-footer
        .ivu-btn-primary
          display none
</style>
