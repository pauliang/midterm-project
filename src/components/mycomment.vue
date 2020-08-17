<template>
  <div id="app">
    <div>
      <comment @doSend="doSend($event)"  @doChidSend="doChidSend(arguments)" :commentList="commentList" :commentNum="commentNum" :label="label" :avatar="avatar" :placeholder="placeholder" :minRows="minRows" :maxRows="maxRows"></comment>
    </div>
  </div>
</template>

<script>

import comment from 'hbl-comment'; // 开发文件

export default {
  name: 'test-remark',
  props:{
    user:Object,
    users:Array,
    commentList:Array,
  },
  data(){
    return{
      label:"评论达人",
      placeholder:"说点什么吧",
      minRows:4,
      maxRows:8,
      commentId: 5,
      commentNum: this.commentList.length,
      avatar:require('@/assets/group.png'),
    }
  },
  components: {
    comment,
  },
  methods:{
    doSend(content){
      console.log("初始发送按钮点击事件："+content);

      this.commentList.push({
        id:this.commentId,
        commentUser:this.user,
        content:content,
        childrenList:[]});

      this.commentNum=this.commentList.length
      this.commentId++;
    },
    doChidSend(args){
      var i = this.commentList.findIndex((item) => item.id === args[2]);
      console.log("父级评论id="+i);
      var tmp = this.users[this.users.findIndex((item) => item.id === args[1])].nickName;
      this.commentList[i].childrenList.push({
        id:this.commentId,
        commentUser:this.user,
        targetUser:{
          id:args[1],
          nickName:tmp,
          avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'
        },
        content:args[0],
        createDate:'2019-9-23 17:45:26'});
      this.commentNum=this.commentList.length
      this.commentId++;
      console.log("评论区发送按钮点击事件：");
      console.log("content="+args[0]);
      console.log("targetUserId="+args[1]);
      console.log("父级评论id="+args[2]);
    }
  },
  mounted() {
    if (!this.users.includes(this.user)){
      this.users.push(this.user)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
