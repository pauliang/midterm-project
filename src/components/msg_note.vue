<template>
    <el-container>
        <el-main class="main">
            <el-tabs class="titles">
                <el-col :span="6">
                    <div class="grid-content bg-purple delete">团队消息提醒</div>
                </el-col>
                <el-col v-for="message in list" :key="message.nid">
                    <new_msg @del="del($event)" :content="message.content" :time="message.time" :nid="message.nid" class="message"></new_msg>
                </el-col>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<script>
    import new_msg from "./new_msg";

    export default {
        name: "msg_note",
        components: {
            new_msg
        },
        props: {
            choice: Number,
            msg: String
        },
      methods:{
          del(nid){
            var i = this.list.findIndex((item)=> item.nid === nid)
            this.list.splice(i, 1);
          }
      },
        data() {
            return {
                localStorageID: 0,
                localStorageName: '',
                list: []
            }
        },
        created() {
            var id = localStorage.getItem('userID');
            if (id == null)
                this.longjmp('Login');
            this.localStorageID = localStorage.getItem('userID');
            this.localStorageName = localStorage.getItem('username');
            var msg_url = 'http://39.97.122.202/notice/get_notice/';
            this.$axios({
                method: 'post',
                url: msg_url, //此处不传data
                data: {
                    id: this.localStorageID,
                    op: 2
                }
            }).then(
                response => {
                  console.log(response.data);
                    var messages = response.data;
                    this.list = [];
                    for (var i = 0; i < messages.length; i++){
                      // if (messages[i][0] === 2)
                      this.list.push({
                        content:messages[i][1],
                        time:messages[i][2],
                        nid:messages[i][0],
                      })
                    }
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