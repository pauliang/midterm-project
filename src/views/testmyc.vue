<template>
  <div style="width: 900px; height: 100px" >
    <comment :user="user" :users="users" :comment-list="commentList"></comment>
<!--    <div v-for="o in testList" :key="o.id" >-->
<!--      <el-card style="height: 100px">{{ o[2] }}</el-card>-->
<!--    </div>-->

    <div>
<!--        <el-button @click="onSubmit(6,1,'sss')">测试提交</el-button>-->
<!--        <el-button @click="onGet(1)">获取评论</el-button>-->
    </div>
  </div>
</template>


<script>
import comment from '@/components/mycomment.vue'
export default {
  name: "test-comment",
  data(){
    return{
      user:{id:5,nickName:'rbl',avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
      users:[
        // {id:1,nickName:'花非花',avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
        // {id:2,nickName:'坏菠萝', avatar:''},
        // {id:3,nickName:'花非花花', avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
        // {id:5,nickName:'rbl',avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
      ],
      docnum:1,
      testList:[],
      commentList:[//这里的内容可以都注释掉
        // {
        //   id:1,
        //   commentUser:{id:1,nickName:'花非花',avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
        //   content:"嘿让我试试评论啊！",
        //   createDate:'2019-9-23 17:36:02',
        //   childrenList:[
        //     {
        //       id:2,
        //       commentUser:{id:2,nickName:'坏菠萝', avatar:''},
        //       targetUser:{id:1,nickName:'花非花',avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
        //       content:'真的就很棒！很Nice!',
        //       createDate:'2019-9-23 17:45:26'
        //     }
        //   ]
        // },
        // {
        //   id:3,
        //   commentUser:{id:3,nickName:'花非花花', avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
        //   content:"嘿让我试试评论啊！",
        //   createDate:'2019-9-23 17:36:02',
        //   childrenList:[
        //     {
        //       id:4,
        //       commentUser:{id:1,nickName:'花非花',avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
        //       targetUser:{id:3,nickName:'花非花花', avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
        //       content:'真的就很棒！很Nice!',
        //       createDate:'2019-9-23 17:45:26'
        //     }
        //   ]
        // },

      ]
    }
  },
  methods:{
    // onSubmit(id,docnum,content) {
    //   // console.log('submit!' + username + pwda + pwdb);
    //   // alert('上传失败');
    //   this.$axios({
    //     method: 'post',
    //     url: 'http://localhost:8000/doc/submit_comment/',
    //     data: {
    //       id:id,
    //       docnum:docnum,
    //       content:content,
    //     }
    //   }).then(
    //       response => {
    //         alert(response.data)
    //       },
    //       err => {
    //         console.log(err)
    //         alert(err)
    //       }).catch((error) => {
    //     console.log(error)
    //   })
    //
    //   this.$axios({
    //     method: 'post',
    //     url: 'http://localhost:8000/doc/get_comments/',
    //     data: {
    //       docnum:this.docnum,
    //     }
    //   }).then((res)=> {
    //         // this.testList = res.data;
    //         // console.log(this.testList)
    //         var o = {id:1,nickName:'花非花',avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'}
    //         for (var i = 0; i < res.data.length; i++) {
    //           this.commentList.push({
    //             id:res.data[i][0],
    //             commentUser:o,
    //             content:res.data[i][2],
    //             createDate:res.data[i][1],
    //             childrenList:[],
    //           })
    //         }
    //       },
    //       err => {
    //         console.log(err)
    //       }).catch((error) => {
    //     console.log(error)
    //   })
    //   console.log(this.testList.length)
    // },

  },
  components:{
    comment
  },
  // created() {
  //     // console.log('submit!' + username + pwda + pwdb);
  //     this.$axios({
  //       method: 'post',
  //       //39.97.122.202
  //       url: 'http://localhost:8000/doc/get_comments/',
  //       data: {
  //         docnum:this.docnum,
  //       }
  //     }).then((res)=> {
  //           this.testList = res.data;
  //           console.log(this.testList[0])
  //           for (var i = 0; i < this.testList.length; i++) {
  //             if (this.testList[i][5] === 0)
  //             this.commentList.push({
  //               id:this.testList[i][0],
  //               commentUser:{id:res.data[i][1],nickName: res.data[i][2],avatar:''},
  //               content:this.testList[i][3],
  //               createDate:this.testList[i][4],
  //               childrenList:[],
  //             })
  //           }
  //         },
  //         err => {
  //           console.log(err)
  //         }).catch((error) => {
  //       console.log(error)
  //     })
  //   // console.log(this.testList.length)
  //
  //     // for (let value in this.testList){
  //     //
  //     // }
  //   // this.commentList.push({
  //   //   id:'value[0]',
  //   //   commentUser:{id:1,nickName:'花非花',avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
  //   //   content:'value[2]',
  //   //   createDate:'value[1]',
  //   //   childrenList:[],
  //   // })
  // }
}
</script>

<style>
</style>