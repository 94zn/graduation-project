<template>
  <div>
    <Table :columns="htmlColumns" :data="data"></Table>
  </div>
</template>
<script>
  import  axios from 'axios';
  export default{
    data(){
      return {
        htmlColumns:[
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
            width: 250,
            align: 'center',
            render (row, column, index) {
              return `<i-button type="text" size="small" @click="buyCar(${index})">加入购物车</i-button> <i-button type="text" size="small" @click="buy(${index})">购买</i-button>`;
            }
          }
        ],
        data:[]
      };
    },

    mounted(){
      axios.request({
        method:'get',
        url:'/api/type',
        params:{
          type:'science'
        }
      }).then((res)=>{
        console.log(res.data);
        this.data = [];
        _.map(res.data,(item)=>{
          this.data.push({
            'name':item.p_name,
            'type':item.p_type,
            'price':item.p_price,
            'num':item.p_num,
            'id':item._id,

          })
        });
      });
    },
    methods:{
      buyCar(){

      },
      buy(){

      }
    }
  }
</script>
<style lang="stylus" rel="sheetstyle/stylus">

</style>
