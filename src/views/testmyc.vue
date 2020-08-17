<template>
  <div style="width: 900px; height: 100px" >
    <comment :user="user" :users="users" :comment-list="commentList"></comment>
  </div>
</template>


<script>
import comment from '@/components/mycomment.vue'
export default {
  name: "test-comment",
  data(){
    return{
      user:{id:6,nickName:'父组件测试',avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
      users:[
        {id:1,nickName:'花非花',avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
        {id:2,nickName:'坏菠萝', avatar:''},
        {id:3,nickName:'花非花花', avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
      ],
      commentList:[//这里的内容可以都注释掉
        {
          id:1,
          commentUser:{id:1,nickName:'花非花',avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
          content:"嘿让我试试评论啊！",
          createDate:'2019-9-23 17:36:02',
          childrenList:[
            {
              id:2,
              commentUser:{id:2,nickName:'坏菠萝', avatar:''},
              targetUser:{id:1,nickName:'花非花',avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
              content:'真的就很棒！很Nice!',
              createDate:'2019-9-23 17:45:26'
            }
          ]
        },
        {
          id:3,
          commentUser:{id:3,nickName:'花非花花', avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
          content:"嘿让我试试评论啊！",
          createDate:'2019-9-23 17:36:02',
          childrenList:[
            {
              id:4,
              commentUser:{id:1,nickName:'花非花',avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
              targetUser:{id:3,nickName:'花非花花', avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
              content:'真的就很棒！很Nice!',
              createDate:'2019-9-23 17:45:26'
            }
          ]
        },

      ]
    }
  },
  components:{
    comment
  }
}
</script>

<style>
</style>