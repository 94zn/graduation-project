<template>
  <div class="admin-order">
    <Table :columns="orderName" :data="orderData" @on-sort-change="sort"></Table>
    <Page :total="total" :page-size="4" @on-change="changePage" show-total></Page>
  </div>
</template>
<style lang="stylus" rel="sheetstyle/stylus">
  .admin-order
    .ivu-page
      margin-left 40%
      margin-top 5%
</style>
<script>
  import axios from 'axios';
  export default {
    name: 'orders',
    data () {
      return {
        orderName:[
            {
              title:'订单编号',
              key:'no'
            },
            {
              title:'收货人',
              key:'name'
            },
            {
              title:'地址',
              key:'address'
            },
            {
              title:'联系电话',
              key:'phone'
            },
            {
              title:'订单时间',
              key:'time',
              sortable:'sort',

            },
            {
              title:'书名',
              key:'bookName'
            },
            {
              title:'类型',
              key:'type'
            },
            {
              title:'价格',
              key:'price'
            },
            {
              title:'数量',
              key:'num'
            },
            {
              title:'状态',
              key:'status'
            },
            {
              title: '操作',
              key: 'action',
              width: 80,
              align: 'center',
              render (row, column, index) {
                return `<i-button type="primary" size="small" @click="send(${index})">
                          <span v-if="row.status=='未发货'">发货</span>
                          <span v-else>已发货</span>
                        </i-button> `;
              }
            }
          ],
        orderData:[],
        total:0,
        page:1
      };
    },
    mounted:function(){

      axios.get('/api/adminOrderList').then((res)=>{
        this.total = res.data.length;
        axios.request({
          method:'get',
          url:'/api/adminOrderList',
          params:{
            'skip':1,
            'flag':'asc'
          }
        }).then((res)=>{
          this.orderData = [];
          _.map(res.data,(item)=>{
            this.orderData.push({
              'no':item.order_id,
              'name':item.order_name,
              'address':item.order_address,
              'phone':item.order_phone,
              'status':item.order_status,
              'bookName':item.order_bookName,
              'type':item.order_type,
              'price':item.order_price,
              'num':item.order_num,
              'time':new Date(item.order_savetime).toLocaleString(),
              'userName':item.order_userName,
              '_id':item._id, //订单id
            });
          });
//        if(res.data.status ==1){
////          window.location.href = '#/adminLogin'
//        }
//        if(res.data.userInfo.vue == ''){
//          this.isloginout = false;
//        }else{
//          this.userInfo.vue = res.data.userInfo.vue[0]
//        }
        });
      });


    },
    methods: {
      sort(a){
//        console.log('111111', a);
        axios.request({
          method: 'get',
          url: '/api/adminOrderList',
          params: {
            'flag': a.order,
            'skip':this.page
          }
        }).then((res) => {
          this.orderData = [];
          _.map(res.data, (item) => {
            this.orderData.push({
              'no': item.order_id,
              'name': item.order_name,
              'address': item.order_address,
              'phone': item.order_phone,
              'status': item.order_status,
              'bookName': item.order_bookName,
              'type': item.order_type,
              'price': item.order_price,
              'num': item.order_num,
              'time': new Date(item.order_savetime).toLocaleString(),
              'userName':item.order_userName,
              '_id':item._id, //订单id
            });
          });
        });
      },
      changePage(page){
        this.page = page;
        axios.request({
          method: 'get',
          url: '/api/adminOrderList',
          params: {
            'skip': this.page,
            'flag':'first'
          }
        }).then((res) => {
          this.orderData = [];
          _.map(res.data, (item) => {
            this.orderData.push({
              'no': item.order_id,
              'name': item.order_name,
              'address': item.order_address,
              'phone': item.order_phone,
              'status': item.order_status,
              'bookName': item.order_bookName,
              'type': item.order_type,
              'price': item.order_price,
              'num': item.order_num,
              'time': new Date(item.order_savetime).toLocaleString(),
              'userName':item.order_userName,
              '_id':item._id, //订单id
            });
          });
        });
      },
      send(index){
          console.log(this.orderData[index],'send');
          if(this.orderData[index].status == '未发货'){
              axios.request({
                url:'/api/adminChangeStatus',
                method:'put',
                params:{
                    id:this.orderData[index]._id
                }
              }).then((res)=>{
                  if(res.data.nModified == 0){
                    this.$Message.error('发货失败');
                  }else{
                    this.reload();
                  }
              });
          }else{
              this.$Message.warning('您的商品已返货');
          }
      },
      reload(){

        axios.get('/api/adminOrderList').then((res)=> {
          this.total = res.data.length;
          axios.request({
            method: 'get',
            url: '/api/adminOrderList',
            params: {
              'skip': 1,
              'flag': 'asc'
            }
          }).then((res) => {
            this.orderData = [];
            _.map(res.data, (item) => {
              this.orderData.push({
                'no': item.order_id,  //商品id
                'name': item.order_name,
                'address': item.order_address,
                'phone': item.order_phone,
                'status': item.order_status,
                'bookName': item.order_bookName,
                'type': item.order_type,
                'price': item.order_price,
                'num': item.order_num,
                'time': new Date(item.order_savetime).toLocaleString(),
                'userName': item.order_userName,
                '_id':item._id, //订单id
              });
            });
          })
        })
      }
    }
  }
</script>

