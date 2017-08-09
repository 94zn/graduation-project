<template>
  <div>
    <Table :columns="userListName" :data="dataList"></Table>
  </div>
</template>
<script>
  import axios from 'axios';
  export default{
      data(){
          return {
              userListName:[
                {
                    title:'用户名',
                    key:'user'
                },
              ],
              dataList:[],
          }
      },
      mounted(){
        axios.get('/api/userList').then((res)=>{
            this.data = [];
            _.map(res.data,(item)=>{
              this.dataList.push({
                'user':item.userName
              });
            });

        });
      },
      methods:{

      }
  }
</script>
