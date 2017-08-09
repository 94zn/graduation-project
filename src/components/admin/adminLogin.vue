<template>
  <div class="admin-login">
    <div class="login-top">
      <h1>书箱网后台系统登录</h1>
      <div>
        <Form class="login-form" ref="formInlineAD" :model="formInlineAD" :rules="ruleInline" inline>
          <Form-item prop="username">
            <Input v-model="formInlineAD.username"  size="large"placeholder="请输入管理员账号" autocomplete="off" style="width: 300px">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <Form-item prop="password">
            <Input v-model="formInlineAD.password" size="large" type="password" autocomplete="off" placeholder="请输入密码" style="width: 300px">
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <div class="login-bottom">
            <Button type="success" long @click="handleSubmit('formInlineAD')">登录</Button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="sheetstyle/stylus">
  .admin-login
    width 35%
    margin 100px auto
    box-shadow 0 0 25px #cac6c6
    .login-top
      padding 40px 60px
      border-radius 10px
      text-align center
      h1
        margin 0 0 20px 0
    .login-bottom
      /*text-align right*/
      width 300px
      margin-left 46px
      button
        background #39f
        border-radius 10px
        border 0px
        padding 10px 20px

    .ivu-form-item
      width 387px
    .ivu-form-item-content
      margin-left 44px

</style>
<script>
  import axios from 'axios';

  export default {
    name:'login',
    data() {
      return {
        username:'',
        password:'',
        formInlineAD:{
          username:'',
          password:'',
        },
        ruleInline:{
          username:[
            { required: true, message: ' 请输入账号名', trigger: 'blur' },
            { type: 'string', min: 3, message: '  账户名不能少于三个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请填写用户ID', trigger: 'blur' },
            { type: 'string', min: 3, message: '  密码长度不能小于3位', trigger: 'blur' }
          ]
        },
        handleSubmit:function(name){
          this.$refs[name].validate((valid) => {
            if (valid) {
              axios.request({
                method: 'post',
                url: '/api/adminLogin',
                data: {
                  name: this.formInlineAD.username,
                  password: this.formInlineAD.password,
                }
              }).then((res) => {
                if (res.data.length != 0) {
                  this.$Message.success('登录成功!');
                  window.location.href = "#/admin"
                } else {
                  this.$Message.error('账户名或密码错误!');
                }
              })
            }else {
              this.$Message.error('请输入正确信息!');
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
