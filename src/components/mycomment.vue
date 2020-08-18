<template>
    <div id="app">
        <div>
            <comment @doSend="doSend($event)" @doChidSend="doChidSend(arguments)" :commentList="commentList"
                     :commentNum="commentNum" :label="label" :avatar="avatar" :placeholder="placeholder"
                     :minRows="minRows" :maxRows="maxRows"></comment>
        </div>
    </div>
</template>

<script>
    import comment from 'hbl-comment'; // 开发文件
    export default {
        name: 'test-remark',
        props: {
            user: Object,
            users: Array,
            commentList: Array
        },
        data() {
            return {
                label: "评论达人",
                placeholder: "说点什么吧",
                minRows: 4,
                maxRows: 8,
                commentId: 0,
                docnum: 1,
                commentNum: 0,
                avatar: require('@/assets/group.png'),
            }
        },
        components: {
            comment,
        },
        methods: {
            doSend(content) {
                console.log("初始发送按钮点击事件：" + content);
                //提交到数据库
                this.$axios({
                    method: 'post',
                    url: 'http://localhost:8000/doc/submit_comment/',
                    data: {
                        f_cid: 0,
                        f_uid: 0,
                        f_name: '',
                        cid: this.commentId,
                        uid: this.user.id,
                        docnum: this.docnum,
                        content: content,
                        commenttime: new Date().toLocaleString()
                    }
                }).then(
                    response => {
                        if (response.data === 1) {
                            //取新加入的评论加入组件中的数组
                            this.$axios({
                                method: 'post',
                                url: 'http://localhost:8000/doc/get_comments/',
                                data: {
                                    docnum: this.docnum,
                                }
                            }).then((res) => {
                                    // this.testList = res.data;
                                    // console.log(this.testList)
                                    // var o = {id:1,nickName:'花非花',avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'}
                                    for (var i = this.commentList.length; i < res.data.length; i++) {
                                        var tmpUser = {id: res.data[i][1], nickName: res.data[i][2], avatar: ''}
                                        if (!this.users.includes(tmpUser)) {
                                            this.users.push(tmpUser)
                                        }
                                        this.commentList.push({
                                            id: res.data[i][0],
                                            commentUser: {id: res.data[i][1], nickName: res.data[i][2], avatar: ''},
                                            content: res.data[i][3],
                                            createDate: res.data[i][4],
                                            childrenList: [],
                                        })
                                    }
                                },
                                err => {
                                    console.log(err)
                                }).catch((error) => {
                                console.log(error)
                            })
                        }
                    },
                    err => {
                        console.log(err)
                        alert(err)
                    }).catch((error) => {
                    console.log(error)
                })
                // this.commentList.push({
                //   id:this.commentId,
                //   commentUser:this.user,
                //   content:content,
                //   childrenList:[]});
                this.commentNum = this.commentList.length
                this.commentId++;
            },
            doChidSend(args) {
                var i = this.commentList.findIndex((item) => item.id === args[2]);
                var tmp = this.users[this.users.findIndex((item) => item.id === args[1])].nickName;
                var tmptime = new Date().toLocaleString();
                // this.commentList[i].childrenList.push({
                //   id:this.commentId,
                //   commentUser:this.user,
                //   targetUser:{
                //     id:args[1],
                //     nickName:tmp,
                //     avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'
                //   },
                //   content:args[0],
                //   createDate:new Date().toLocaleString()});
                this.$axios({
                    method: 'post',
                    url: 'http://localhost:8000/doc/submit_comment/',
                    data: {
                        f_cid: args[2],
                        f_uid: args[1],
                        f_name: tmp,
                        cid: this.commentId,
                        uid: this.user.id,
                        docnum: this.docnum,
                        content: args[0],
                        commenttime: tmptime,
                    }
                }).then(
                    response => {
                        if (response.data === 1) {
                            this.commentList[i].childrenList.push({
                                id: this.commentId,
                                commentUser: this.user,
                                targetUser: {
                                    id: args[1],
                                    nickName: tmp,
                                    avatar: ''
                                },
                                content: args[0],
                                createDate: tmptime
                            });
                        }
                    },
                    err => {
                        console.log(err)
                        alert(err)
                    }).catch((error) => {
                    console.log(error)
                })
                this.commentId++;
                console.log("评论区发送按钮点击事件：");
                console.log("content=" + args[0]);
                console.log("targetUserId=" + args[1]);
                console.log("父级评论id=" + args[2]);
            }
        },
        created() {
            // console.log('submit!' + username + pwda + pwdb);
            this.$axios({
                method: 'post',
                //39.97.122.202
                url: 'http://localhost:8000/doc/get_comments/',
                data: {
                    docnum: this.docnum,
                }
            }).then((res) => {
                    // this.testList = res.data;
                    // console.log(this.testList[0])
                    for (var i = 0; i < res.data.length; i++) {
                        var tmpUser = {id: res.data[i][1], nickName: res.data[i][2], avatar: ''}
                        if (!this.users.includes(tmpUser)) {
                            this.users.push(tmpUser)
                        }
                        if (res.data[i][5] === 0) {
                            this.commentList.push({
                                id: res.data[i][0],
                                commentUser: {id: res.data[i][1], nickName: res.data[i][2], avatar: ''},
                                content: res.data[i][3],
                                createDate: res.data[i][4],
                                childrenList: [],
                            });
                        } else {
                            var j = this.commentList.findIndex((item) => item.id === res.data[i][5]);
                            var f_uid = this.commentList[j].commentUser.id;
                            this.commentList[j].childrenList.push({
                                id: res.data[i][0],
                                commentUser: {id: res.data[i][1], nickName: res.data[i][2], avatar: ''},
                                targetUser: {
                                    id: f_uid,
                                    nickName: res.data[i][6],
                                    avatar: ''
                                },
                                content: res.data[i][3],
                                createDate: res.data[i][4],
                            });
                        }
                    }
                },
                err => {
                    console.log(err)
                }).catch((error) => {
                console.log(error)
            })
            // console.log(this.testList.length)
            // for (let value in this.testList){
            //
            // }
            // this.commentList.push({
            //   id:'value[0]',
            //   commentUser:{id:1,nickName:'花非花',avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'},
            //   content:'value[2]',
            //   createDate:'value[1]',
            //   childrenList:[],
            // })
        },
        mounted() {
            // if (!this.users.includes(this.user)){
            //   this.users.push(this.user)
            // }
            this.$axios({
                method: 'post',
                url: 'http://localhost:8000/doc/get_comments/',
                data: {
                    docnum: this.docnum,
                }
            }).then((res) => {
                    this.commentId = res.data.length + 1;
                    this.commentNum = res.data.length;
                },
                err => {
                    console.log(err)
                }).catch((error) => {
                console.log(error)
            })
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