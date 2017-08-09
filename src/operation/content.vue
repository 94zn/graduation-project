<template>
  <div :data="getData" >
    <Modal
      class="contentDialog"
      v-model="ctrlShow"
      title="所有评论"
      width="500"
      :mask-closable="false"
    >

      <Table border :columns="contentColumns" :data="contentData"></Table>
    </Modal>
  </div>
</template>
<script>
  export default {
      data(){
          return{
            contentColumns:[
              {
                  title:'用户',
                  key:'user'
              },
              {
                  title:'评论内容',
                  key:'content'
              }
            ],
            contentData:[],
          }
      },
      props: {
        show: {
          type: Boolean,
          default: false
        },
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
        console.log('content:::',this.data);
        this.contentData = []
        _.map(this.data.content,(item)=>{
            this.contentData.push({
              'user':item.name,
              'content':item.content[0]
            });
        });
        return this.data;
      },
      closes() {
        this.$emit('on-show-change', false);
      },
    },
  }
</script>
