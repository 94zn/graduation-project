<template>
  <div>
    <Table border :context="self" :columns="columns1" :data="data1" ></Table>
    <modify :show="showModify" :data="modifydata" @on-show-change="showModify = !showModify"></modify>
  </div>
</template>
<script>
  import axios from 'axios';
  import modify from '../../operation/modify'
  export default {
    name: 'products',
    data () {
      return {
        self: this,
        showModify:false,
        modifydata:{},
        columns1: [
          {
            title: '书名',
            key: 'name'
          },
          {
            title: '类别',
            key: 'type',
            filterMultiple: false,
            filterMethod (value, row) {
              if (value === 'html') {
                return row.type == 'html';
              } else if (value === 'css') {
                return row.type =='css';
              }else if(value ==='css'){
                  return row.type =='css'
              }else if(value ==='javascript'){
                  return row.type =='javascript';
              }else if(value ==='nosql'){
                  return row.type =='nosql';
              }else if(value ==='mysql'){
                  return row.type =='mysql'
              }else if(value ==='literature'){
                  return row.type =='literature'
              }else if(value ==='science'){
                  return row.type =='science'
              }
            },
            filters: [
              {
                label: 'HTML',
                value: 'html'
              },
              {
                label: 'CSS',
                value: 'css'
              },
              {
                label:'Javascript',
                value:'javascript'
              },
              {
                label:'Nosql',
                value:'nosql'
              },
              {
                label:'Mysql',
                value:'mysql'
              },
              {
                label:'文学',
                value:'literature'
              },
              {
                label:'科学',
                value:'science'
              }
            ],
          },
          {
            title: '价格（元）',
            key: 'price'
          },
          {
            title:'数量（个）',
            key:'num'
          },
          {
            title:'作者',
            key:'author'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render (row, column, index) {
              return `<i-button type="primary" size="small" @click="modifyDialog(row)">修改商品</i-button> <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
            }
          }
        ],
        data1:[]
      };
    },

    watch:{
      showModify(curVal,oldVal){
        if(!curVal){
          axios.get('/api/adminAllProduct').then((res)=>{
            this.data1 = [];
            _.map(res.data,(item)=>{
              this.data1.push({
                'name':item.p_name,
                'type':item.p_type,
                'price':item.p_price,
                'num':item.p_num,
                'author':item.p_author,
                '_id':item._id
              })
            });
          });
        }
      },
    },

    beforeMount(){
      axios.get('/api/adminAllProduct').then((res)=>{
          this.data1 = [];
          _.map(res.data,(item)=>{
             this.data1.push({
               'name':item.p_name,
               'type':item.p_type,
               'price':item.p_price,
               'num':item.p_num,
               'author':item.p_author,
               '_id':item._id
             })
          });
        console.log('products',res);
      });
    },
    components: {
      modify
    },
    methods:{
      changeLink:function(){
          console.log('aaa')
      },
      show (index) {
        this.$Modal.info({
          title: '用户信息',
          content: `姓名：${this.data1[index].name}<br>年龄：${this.data1[index].type}`
        })
      },
      //删除商品
      remove (index) {
//        console.log(this.data1[index],'adfsf');
        axios.request({
          method:'delete',
          url:'/api/deleteProduct',
          data:this.data1[index]
        }).then((res)=>{
            if(res.data.ok ==1){
              this.reload();
              this.$Message.success('删除成功');
            }else{
                this.$Message.error('删除失败');
            }
        });
      },

      reload(){
        axios.get('/api/adminAllProduct').then((res)=>{
          this.data1 = [];
          _.map(res.data,(item)=>{
            this.data1.push({
              'name':item.p_name,
              'type':item.p_type,
              'price':item.p_price,
              'num':item.p_num,
              'author':item.p_author,
              '_id':item._id
            })
          });
        });
      },

      modifyDialog (row) {
        this.modifydata = row
        this.showModify=true;
      },
    },
  }
</script>

