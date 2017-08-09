<template>
  <div :data="getData" >
    <Modal
      class="modifyDialog"
      v-model="ctrlShow"
      title="修改商品信息"
      width="500"
      :mask-closable="false"
      @on-cancel="close"
    >
      <div>
        <Form ref="modify" :model="modify" :rules="ruleInline" inline>
          <Form-item prop="p_name" label="书名">
            <Input type="text" v-model="modify.p_name" disabled placeholder="name">
            </Input>
          </Form-item>
          <Form-item prop="p_type" label="类别">
            <Input type="text" v-model="modify.p_type" disabled placeholder="name">
            </Input>
          </Form-item>
          <Form-item prop="p_author" label="作者">
            <Input text="text" v-model="modify.p_author" disabled placeholder="作者">

            </Input>
          </Form-item>
          <Form-item prop="p_price" label="价格">
            <Input text="text" v-model="modify.p_price" placeholder="价格">
            </Input>
          </Form-item>
          <Form-item label="数量">
            <!--<Input text="text" v-model="modify.p_num" placeholder="数量">-->
            <!--</Input>-->
            <Input-number :max="10" :min="0" v-model="p_num"></Input-number>
          </Form-item>
          <Form-item>
            <Button type="primary" @click="handleSubmit('modify')">提交</Button>
          </Form-item>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
  import axios from 'axios';
  export default{
      name:'modify',
      data(){
          return{
            modify :{
                p_name:'',
                p_author:'',
                p_price:'',
                p_discribe:'',
                p_time:'',
                p_type:'',
                p_heat:'',
                p_id:''
            },
            ruleInline:{
              p_name:[
                { required:false,message:'请输入商品名称',trigger:'blur'}
              ],
              p_type:[
                { required:false,message:'',trigger:'blur'}
              ],
              p_author:[
                { required:false,message:'请输入作者姓名',trigger:'blur'}
              ],
              p_price:[
                { required:true,message:'请输入书籍价格',trigger:'blur'}
              ],
              p_num:[
                { required:true,message:'请输入库存数量',trigger:'blur'}
              ],
              p_discribe:[
                { required:true,message:'请输入简介信息',trigger:'blur'}
              ],
            },
            p_num:''
          }
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
            console.log(this.data);
            this.modify.p_name = this.data.name;
            this.modify.p_author = this.data.author;
            this.modify.p_price = this.data.price;
            this.modify.p_type = this.data.type;
            this.p_num = this.data.num;
            this.modify.p_id = this.data._id;
            return this.data;
        }
      },
      methods:{

        handleSubmit (name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
                this.submits();
            } else {
//              this.$emit('on-show-change', false);
              this.$Message.error('表单验证失败!!!!');
            }
          })
        },
        handleReset (name) {
            var name = 'modify';
          this.$refs[name].resetFields();
        },
        submits() {
          console.log('modify：',this.modify);
          axios.request({
            method:'post',
            url:'/api/modify',
            data:{
                id:this.modify.p_id,
                price:this.modify.p_price,
                num:this.p_num
              }
            }
          ).then((res)=>{
              console.log('modify-res',res);
              if(res.data.ok ==1){
                this.$Message.success('修改成功!');
                this.close();

              }else{
                this.$Message.error('修改失败!');
              }

          },(err)=>{
              console.log('err',err);
          });
        },
        close() {
          this.$emit('on-show-change', false);
          window.location.href = '#/admin/products';
          this.handleReset();
        }
      }
  }
</script>
<style lang="stylus" rel="sheetstyle/stylus">
  .modifyDialog
    .ivu-form
      padding 0 100px
    .ivu-form-item-content
      margin-left 72px
    .ivu-modal
      .ivu-modal-footer
          .ivu-btn-primary
            display none
</style>
