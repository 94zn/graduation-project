<template>
  <div :data="getData" >
    <Modal
      class="buyDialog"
      v-model="ctrlShow"
      title="填写个人信息"
      width="500"
      :mask-closable="false"
      @on-cancel="close"
    >
      <div>
        <Form ref="formBuy" :model="formBuy" :rules="ruleInline" inline>
          <Form-item prop="b_name" label="收货人姓名">
            <Input type="text" v-model="formBuy.b_name"  placeholder="收货人姓名">
            </Input>
          </Form-item>
          <Form-item prop="b_address" label="收货地址">
            <Input type="text" v-model="formBuy.b_address" placeholder="收货地址">
            </Input>
          </Form-item>
          <Form-item prop="b_phone" label="联系方式">
            <Input text="text" v-model="formBuy.b_phone"  placeholder="联系方式">
            </Input>
          </Form-item>
          <Form-item  label="价格">
            <Input text="text" v-model="formBuy.b_price" disabled placeholder="价格">
            </Input>
          </Form-item>
          <Form-item prop="b_num" label="购买数量">
            <Input-number :max="maxValue" :min="minValue" v-model="num" @on-change="changeNum"></Input-number>
          </Form-item>
          <Form-item>
            <Button type="primary" @click="handleSubmit('formBuy')">提交</Button>
          </Form-item>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
  import axios from 'axios';
  export default{
    name:'buy',
    data(){
      return{
        formBuy:{
          b_name:'',
          b_address:'',
          b_price:'',
          b_phone:'',
          b_num:'',
          b_discribe:'',
          b_status:'未发货'
        },
        ruleInline:{
          b_name:[
            { required:true,message:'请输入收货人姓名',trigger:'blur'}
          ],
          b_address:[
            { required:true,message:'请输入收货地址',trigger:'blur'}
          ],
          b_phone:[
            { required:true,message:'请输入联系方式',trigger:'blur'}
          ],
          b_price:[
            { required:false,message:'请输入书籍价格',trigger:'blur'}
          ],
        },
        num:'1', //够买的数量
        amount:'',
        price:'', //单价
        minValue:'1',
        maxValue:'10'
      }
    },
    mounted(){
//      console.log(this.data,'aaa');
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
//        columns: {
//          type: Array,
//          default: []
//        },
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
//        console.log('获取到的aaaa数据',this.data);
        this.formBuy.b_bookName = this.data.name;
        this.formBuy.b_discribe = this.data.discribe;
        this.formBuy.b_author = this.data.author;
        this.formBuy.b_price = this.data.price;
        this.price = this.data.price;
        this.amount = this.data.num;
        this.maxValue= this.data.num;
        this.formBuy.b_time = this.data.time;
        this.formBuy.b_type = this.data.type;
        this.formBuy.b_order_id = this.data.id;
        this.formBuy.b_userName = this.data.userName;
//        console.log(this.formBuy);
        return this.data;
      }
    },

    methods:{
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
              if(Number(this.maxValue) ==0){
                  this.$Message.error('商品售罄')
              }else{
                this.submits();
              }

          } else {
//            this.$emit('on-show-change', false);
            this.$Message.error('请填写完整的收货信息');
          }
        })
      },
      handleReset (name) {
        var name = 'formBuy';
        this.$refs[name].resetFields();
      },
      submits(name) {
        this.formBuy.b_saveTime = new Date(this.formBuy.b_time).getTime();
        console.log('formBuy',this.formBuy);
        axios.request({
            method:'post',
            url:'/api/buy',
            data:this.formBuy
          }
        ).then((res)=>{
          console.log(res);
          if(res.data.status ==1){
            this.$Message.error('请登录!');
            window.location.href = '#/login'
          }else{
            this.$Message.success('购买成功!');
//            this.handleReset();
          }
        });
        this.$emit('on-show-change', false);
      },
      close() {
        this.$emit('on-show-change', false);
        this.handleReset();
      },
      changeNum(){
          if(this.num >this.maxValue){
              this.num = this.maxValue
          }
          this.formBuy.b_price = Number(this.num) * this.price;
      }
    }
  }
</script>
<style lang="stylus" rel="sheetstyle/stylus">
  .buyDialog
    .ivu-form
      padding 0 100px
    .ivu-form-item-content
      margin-left 88px
    .ivu-modal
      .ivu-modal-footer
        .ivu-btn-primary
          display none
</style>
