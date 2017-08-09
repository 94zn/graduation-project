<template>
  <div class="register">
    <div class="login-top">
      <h1>Register Form</h1>
      <div class="form-div">
        <Form class="login-form" ref="formInlineRe" :model="formInlineRe" :rules="ruleInline" inline>
          <Form-item prop="username">
            <Input v-model="formInlineRe.username"  size="large"placeholder="请输入用户名" style="width: 300px">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <Form-item prop="password">
            <Input v-model="formInlineRe.password" size="large" placeholder="请输入密码" type="password" style="width: 300px">
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <div class="login-bottom">
            <Button type="primary" long @click="handleSubmit('formInlineRe')">注册</Button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="sheetstyle/stylus">
  .register
    width 35%
    margin 100px auto
    box-shadow 0 0 25px #cac6c6
    .form-div
      margin-left 32px
    .login-top
      background #fff
      padding 40px 60px
      border-radius 10px
      h1
        margin 0 0 20px 0
        text-align center
    .login-bottom
      text-align right
      button
        /*background #F45B4B*/
        border-radius 10px
        border 0px
        padding 10px 20px
    .login-form
      label
  /*float left*/

</style>
<script>
  import axios from 'axios';

  export default {
    name:'login',
    data() {
      return {
        username:'',
        password:'',
        formInlineRe:{
          username:'',
          password:'',
        },
        ruleInline:{
          username:[
            { required: true, message: '请填写用户ID', trigger: 'blur' },
            { type: 'string', min: 3, message: '用户名不能少于三个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请填写用户ID', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
        },
        handleSubmit:function(name){
          this.$refs[name].validate((valid) => {
            if (valid) {
              axios.request({
                method: 'post',
                url: '/api/checkUserName',
                data: {
                  userName: this.formInlineRe.username,
                  password: this.formInlineRe.password
                }
              }).then((res) => {
                if (res.data.num != 0) {

                  this.$Message.error('用户名存在!');
                } else {
                    axios.request({
                      method:'post',
                      url:'/api/register',
                      data: {
                        userName: this.formInlineRe.username,
                        password: this.formInlineRe.password,
                      }
                    }).then((res)=>{
                      if(res.data.length != 0) {
                        this.$Message.success('创建成功!');
                        window.location.href = "#/"
                      } else {
                        this.$Message.error('用户名或密码错误!');
                      }
                    });
                }
              })
            }else {
              this.$Message.error('表单验证失败!');
            }
          })
        },
      }
    },
    methods:{
      login() {
        // 获取已有账号密码
        axios.get('/api/login').then((res)=>{
          console.log('res',res.data)
        })

      },

      request:function(){
        axios.get('/login',{
          params:{
            username:this.username,
            password:this.password
          }
        }).then((res) =>{

        },()=>{

        })
      },

    }
  }
</script>
