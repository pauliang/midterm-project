<template>
    <el-container>
        <el-main class="main">
            <el-tabs class="titles">
                <el-col :span="6">
                    <div class="grid-content bg-purple delete">团队邀请通知</div>
                </el-col>
                <el-col v-for="invite in invitations" :key="invite.mid">
                    <new_invi @del="del($event)" @deal="deal($event)" :mid="invite.mid" :sendid="invite.sendid" :send="invite.send" :accept="invite.accept" :acceptid="invite.acceptid" :message="invite.msg" :time="invite.time" :isHandle_t="invite.isHandle" class="message"></new_invi>
                </el-col>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<script>
    import new_invi from "@/components/new_invitation";

    export default {
        name: "invi_note",
        components: {
            new_invi
        },
        props: {
            choice: Number,
            msg: String
        },
      methods:{
        del(mid){
          var i = this.invitations.findIndex((item)=> item.mid === mid)
          this.invitations.splice(i, 1);
        },
      },
        data() {
            return {
                localStorageID: 0,
                localStorageName: '',
                group_num: 0,
                invitations: [],
                // invitations: [{
                //     send: '团队A',
                //     accept: '当前用户',
                //     msg: '加入团队邀请',
                //     // time: new Date()
                //   time: '2020-08-19T02:11:39',
                // }, {
                //     send: '团队B',
                //     accept: '当前用户',
                //     msg: '加入团队邀请',
                //     // time: new Date()
                //   time: '2020-08-19T02:11:39',
                // }, {
                //     send: '团队C',
                //     accept: '当前用户',
                //     msg: '加入团队邀请',
                //     // time: new Date()
                //   time: '2020-08-19T02:11:39',
                // }]
            }
        },
        created() {
            var id = localStorage.getItem('userID');
            if (id == null)
                this.longjmp('Login');
            this.localStorageID = localStorage.getItem('userID');
            this.localStorageName = localStorage.getItem('username');
            // alert(id)
          //39.97.122.202
            var msg_url = 'http://39.97.122.202/group/get_invitation_a/';
            this.$axios({
                method: 'post',
                url: msg_url, //此处不传data
                data: {
                    id: this.localStorageID,
                    //op: 0,
                }
            }).then(
                response => {
                  // console.log(response.data)
                  this.invitations = [];
                  for (var i = 0; i < response.data.length; i++)
                    this.invitations.push({
                      mid:response.data[i][0],
                      sendid:response.data[i][2],
                      send:response.data[i][3],
                      accept:this.localStorageName,
                      acceptid:this.localStorageID,
                      msg:'加入团队邀请',
                      time:response.data[i][5],
                      isHandle:response.data[i][4],
                    });
                },
                err => {
                    console.log(err);
                }).catch((error) => {
                console.log(error);
            });
        }
    }
</script>
<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 220px;
        min-height: 600px;
    }

    .head .welcome {
        position: absolute;
        float: right;
    }

    .head .wel_text {
        position: absolute;
        width: 400px;
        height: 30px;
        color: #fbfcfe;
        float: right;
        margin-right: 20px;
        margin-top: 5px;
        line-height: 30px;
    }

    .head .avator {
        position: relative;
        width: 150px;
        height: 40px;
        float: right;
        margin-right: 100px;
    }

    .head .welcome {
        position: absolute;
        float: right;
    }

    .head .wel_text {
        position: absolute;
        width: 400px;
        height: 30px;
        color: #fbfcfe;
        float: right;
        margin-right: 20px;
        margin-top: 5px;
        line-height: 30px;
    }

    .head .avator {
        position: relative;
        width: 150px;
        height: 40px;
        float: right;
        margin-right: 100px;
    }

    li {
        list-style: none;
        display: inline-block;
    }

    .main .titles {
        margin-left: 0;
        margin-top: 10px;
    }

    .container .el-main {
        position: relative;
    }

    .container .toolbar {
        margin: 10px auto;
        height: 40px;
        width: 750px;
        border: 1px solid #f6f6f6;
    }

    .container .text {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        border: 1px solid #f6f6f6;
        width: 816px;
        height: 1172px;
        background-color: #fff;
    }

    .introduce .intro1 {
        font-size: 12px;
        color: #a5a5a5;
        -webkit-font-smoothing: antialiased;
    }

    .introduce .intro2 {
        fill: #4a5056 !important;
    }

    .main {
        position: relative;
        height: 800px;
    }

    .bg-purple {
        background: transparent;
        text-align: center;
        font-size: 20px;
        line-height: 10px;
        margin-right: 160px;
        margin-bottom: 30px;
        margin-top: 20px;
        font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        color: #4d4d4d;
        font-weight: 400;
        border: none;
    }

    .el-footer img {
        display: block;
        width: 100%;
    }

    .cardtxt {
        text-align: center;
    }

    .cardbox {
        width: 200px;
    }
</style>
<style>
    .new_message {
        margin-right: 50px;
    }

    .titles .el-tabs__item {
        padding: 0 20px;
        height: 40px;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 20px;
        font-family: "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-weight: 400;
        color: #303133;
        position: relative;
    }
</style>