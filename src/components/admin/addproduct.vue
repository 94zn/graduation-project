<template>
  <div class="addProduct">
    <Form ref="formInlineAddProduct" :model="formInlineAddProduct" :rules="ruleInline" inline>
      <Form-item prop="p_name" label="书名">
        <Input type="text" v-model="formInlineAddProduct.p_name" placeholder="name">
        </Input>
      </Form-item>
      <Form-item label="类别">
        <Select v-model="p_type.value" @on-change="changeValue(p_typelist,p_type)" placeholder="请选择">
          <Option v-for="item in p_typelist" :value="item.value" :key="item">{{ item.label }}</Option>
        </Select>
      </Form-item>
      <Form-item prop="p_author" label="作者">
        <Input text="text" v-model="formInlineAddProduct.p_author" placeholder="作者">

        </Input>
      </Form-item>
      <Form-item label="价格">
        <Input text="text" v-model="formInlineAddProduct.p_price" placeholder="价格">
        </Input>
      </Form-item>
      <Form-item prop="p_num" label="数量">
        <Input text="text" v-model="formInlineAddProduct.p_num" placeholder="数量">

        </Input>
      </Form-item>
      <Form-item prop="p_discribe" label="描述">
        <Input text="text" v-model="formInlineAddProduct.p_discribe" placeholder="商品描述">
        </Input>
      </Form-item>
      <Form-item label="出版日期" prop="p_time">
        <Date-picker type="date" placeholder="选择日期" v-model="formInlineAddProduct.p_time"></Date-picker>
      </Form-item>
      <Form-item>
        <Button type="primary" @click="handleSubmit('formInlineAddProduct')">提交</Button>
      </Form-item>
    </Form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name:'addproduct',
    data (){
        return {
          formInlineAddProduct:{
            p_name:'',
            p_author:'',
            p_price:'',
            p_num:'',
            p_discribe:'',
            p_time:'',
            p_type:'',
            p_heat:0
          },
          p_type:{
              value:'html',
              label:'HTML'
          },
          p_typelist: [
            {
              value: 'html',
              label: 'HTML'
            },
            {
              value: 'css',
              label: 'CSS'
            },
            {
              value: 'javascript',
              label: 'Javascript'
            },
            {
              value: 'nosql',
              label: 'Nosql'
            },
            {
              value: 'mysql',
              label: 'Mysql'
            },
            {
              value: 'literature',
              label: '文学'
            },
            {
              value:'science',
              label:'科学'
            }
          ],
          ruleInline:{
            p_name:[
              { required:true,message:'请输入商品名称',trigger:'blur'}
            ],
            p_author:[
              { required:true,message:'请输入作者姓名',trigger:'blur'}
            ],
//            p_price:[
//              { required:true,message:'请输入书籍价格',trigger:'blur'}
//            ],
            p_num:[
              { required:true,message:'请输入库存数量',trigger:'blur'}
            ],
            p_discribe:[
              { required:true,message:'请输入简介信息',trigger:'blur'}
            ],
            p_time:[
              { required:true,type:'date',message:'请输入出版日期',trigger:'change'}
            ]
          }
        };
    },

    beforeMount(){

    },

    methods:{
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            console.log(this.formInlineAddProduct,this.p_type.value);
            this.formInlineAddProduct.p_time = new Date(this.formInlineAddProduct.p_time).getTime();
            this.formInlineAddProduct.p_type = this.p_type.value;
            this.formInlineAddProduct.p_heat = 0
            axios.request({
              method:'post',
              url:'/api/addproduct',
              data:this.formInlineAddProduct
            }).then((res)=>{
              if(res){
                window.location.href = '#/admin/products';
                this.$Message.success('提交成功!');
              }
            });
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      changeValue:function (arr,defaultValue,) {
        _.map(arr, (item) => {
          if(item.value === defaultValue.value){
            defaultValue.label = item.label
          }
        });
      }
    }
  }
</script>

<style lang="stylus" rel="sheetstyle/stylus">
  .addProduct
    width 30%
    margin 50px auto
    .ivu-form-item-content
      margin-left 80px
    .ivu-form-inline
      .ivu-form-item
        display block
</style>
