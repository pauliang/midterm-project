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
        data(){
            return{
                label:"评论达人",
                placeholder:"说点什么吧",
                minRows:4,
                maxRows:8,
                commentNum:2,
                avatar:require('@/assets/group.png'),
                commentList:[
                    {
                        id:1,
                        commentUser:{
                            id:1,
                            nickName:'花非花',
                            avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'
                        },
                        content:"嘿让我试试评论啊！",
                        createDate:'2019-9-23 17:36:02',
                        childrenList:[
                            {
                                id:2,
                                commentUser:{
                                    id:2,
                                    nickName:'坏菠萝',
                                    avatar:''
                                },
                                targetUser:{
                                    id:1,
                                    nickName:'花非花',
                                    avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'
                                },
                                content:'真的就很棒！很Nice!',
                                createDate:'2019-9-23 17:45:26'
                            }
                        ]
                    },

                ]
            }
        },
        components: {
            comment,
        },
        methods:{
            doSend(content){
                console.log("初始发送按钮点击事件："+content);
                this.commentList.push({id:1,
                        commentUser:{
                            id:1,
                        },
                        content:content,
                        childrenList:[]});
                this.commentNum++;
            },
            doChidSend(args){
                var i = this.commentList.findIndex((item) => item.id === args[2]);
                console.log("父级评论id="+i);
                this.commentList[i].childrenList.push({
                    id:2,
                    commentUser:{
                        id:2,
                        nickName:'坏菠萝',
                        avatar:''
                    },
                    targetUser:{
                        id:1,
                        nickName:'花非花',
                        avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'
                    },
                    content:args[0],
                    createDate:'2019-9-23 17:45:26'});
                console.log("评论区发送按钮点击事件：");
                console.log("content="+args[0]);
                console.log("targetUserId="+args[1]);
                console.log("父级评论id="+args[2]);
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
