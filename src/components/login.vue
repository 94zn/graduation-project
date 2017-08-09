<template>
  <div class="login">
    <div class="login-top">
     <h1><Icon type="ios-book"></Icon> 书箱网-Login Form</h1>
      <div class="form-div">
        <Form class="login-form" ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <Form-item prop="username">
            <Input v-model="formInline.username" autocomplete="false" size="large"placeholder="请输入用户名" style="width: 300px">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <Form-item prop="password">
            <Input v-model="formInline.password" size="large" autocomplete="false" type="password" placeholder="请输入密码" style="width: 300px">
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <div class="login-bottom">
            <Button type="primary" long @click="handleSubmit('formInline')">登录</Button>
            <!--<Button type="primary" @click="handleSubmit('formInline')">登录</Button>-->
          </div>
          <div class="login-bottom">
            <Button long @click="register">注册</Button>
            <!--<Button type="primary" @click="register">注册</Button>-->
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="sheetstyle/stylus">
  .login
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
      /*input*/
        /*padding 15px 20px*/
        /*border 1px solid #ccc*/
        /*border-radius 9px*/
        /*margin-bottom 10px*/
        /*background #CACACA*/
        /*color #818181*/
    .login-bottom
      text-align right
      button
        /*background #F45B4B*/
        border-radius 10px
        border 0px
        padding 10px 20px
    .login-form
      .login-bottom
        width 300px

</style>
<script>
  import axios from 'axios';

  export default {
    name:'login',
    data() {
      return {
        username:'',
        password:'',
        formInline:{
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
                  url: '/api/login',
                  data: {
                    userName: this.formInline.username,
                    password: this.formInline.password,
                    flag:'login'
                  }
                }).then((res) => {
                  if (res.data.length != 0) {
                    this.$Message.success('登录成功!');
                    window.location.href = "#/"
                  } else {
                    this.$Message.error('用户名或密码错误!');
                  }
                })
            }else {
              this.$Message.error('请输入正确的表单!');
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
//        this.$http.get('/api/login/getAccount')
//          .then((response) => {
//            // 响应成功回调
//            console.log(response)
//            let params = {
//              account : this.account,
//              password : this.password
//            };
//            // 创建一个账号密码
//            return this.$http.post('/api/login/createAccount',params);
//          })
//          .then((response) => {
//            console.log(response)
//          })
//          .catch((reject) => {
//            console.log(reject)
//          });
      },
      register:function(){
          /*跳转注册页面*/
          window.location.href = '#/register';
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


      api: function(url, type, dataGet, dataPost, options, success) {
        var def = $.Deferred();
        type || (type = 'get');
        if (dataGet) {
          url = url + (~url.indexOf('?') ? '&' : '?') + $.param(dataGet);
        }
        axios.request(_.extend({
          url: url,
          method: type,
          data: dataPost,
        }, options)).then(function(res) {
          if (!success || success(res)) {
            def.resolve(res)
          } else {
            def.reject(res);
          }
        }, function(err) {
          def.reject(err);
        });
        var ret = def.promise();
        return ret;

      },
    }
  }
</script>
