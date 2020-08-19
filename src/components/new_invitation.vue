<template>
  <el-container>
    <el-row :span="8" class="outer">
      <el-card :body-style="{ padding: '0px' }" class="card">
        <div style="padding: 14px;" v-if="!isRead" @click="openInvite()">
          <i class="el-icon-chat-dot-round img"></i>
          <span class="topic">{{"消息："+ accept + "收到了来自" + send + "的" + message}}</span>
          <el-button type="text" class="button" @click="markAs()">标为已读</el-button>
          <el-button type="text" class="button2" @click="deleteMe()">删除消息</el-button>
          <div class="bottom clearfix">
            <!--                        <time class="time">{{ dateFormat(time) }}</time>-->
            <time class="time">{{ time }}</time>
          </div>
        </div>
        <div style="padding: 14px;" v-if="isRead" class="read">
          <i class="el-icon-chat-dot-round img"></i>
          <span class="topic">{{"消息："+ accept + "收到了来自" + send + "的" + message}}</span>
          <el-button type="text" class="button" @click="markAs()">标为未读</el-button>
          <el-button type="text" class="button2" @click="deleteMe()">删除消息</el-button>
          <div class="bottom clearfix">
            <!--                        <time class="time2">{{ dateFormat(time) }}</time>-->
            <time class="time">{{ time }}</time>
          </div>
        </div>
      </el-card>

    </el-row>
    <el-dialog
        title="邀请信息"
        :visible.sync="dialogVisible"
        width="30%">
      <span>{{msg}}</span>
      <span slot="footer" class="dialog-footer" v-if="isHandle===0">
              <el-button @click="handleInvite(2)">拒绝</el-button>
              <el-button type="primary" @click="handleInvite(1)">接受</el-button>
            </span>
    </el-dialog>

  </el-container>
</template>

<script>
export default {
  name: 'new_invi',
  props: {
    sendid: Number,
    send: String,
    accept: String,
    acceptid: String,
    message: String,
    time: String,
    isHandle_t: Number,
    mid: Number,
  },
  data() {
    return {
      isRead: false,
      dialogVisible:false,
      msg:'',
      isHandle:this.isHandle_t,
    }
  },
  methods: {
    // dateFormat: function (time) {
    //     var date = new Date(time);
    //     var year = date.getFullYear();
    //     var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    //     var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    //     var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    //     var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    //     var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    //     // 拼接
    //     return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    // },
    markAs() {
      this.isRead = !this.isRead;
    },
    handleInvite(op){
      this.dialogVisible = false;
      this.$axios({
        method: 'post',
        url: 'http://39.97.122.202/group/handle_invitation/', //此处不传data
        data: {
          id: this.acceptid,
          op: op.toString(),
          groupnum:this.sendid,
        }
      }).then(
          response => {
            console.log(response.data)
          },
          err => {
            console.log(err);
          }).catch((error) => {
        console.log(error);
      });
      this.isHandle = op;
      switch (this.isHandle) {
        case 0:
          this.msg='是否接受'+this.send+'的邀请';
          break;
        case 1:
          this.msg='您已接受了'+this.send+'的邀请';
          break;
        case 2:
          this.msg='您已拒绝了'+this.send+'的邀请';
          break;
      }
    },
    openInvite(){
      this.dialogVisible = true;
      switch (this.isHandle) {
        case 0:
          this.msg='是否接受'+this.send+'的邀请';
          break;
        case 1:
          this.msg='您已接受了'+this.send+'的邀请';
          break;
        case 2:
          this.msg='您已拒绝了'+this.send+'的邀请';
          break;
      }
    },
    deleteMe(){
      var msg_url = 'http://127.0.0.1:8000/group/delete_invitation/';
      this.$axios({
        method: 'post',
        url: msg_url, //此处不传data
        data: {
          mid: this.mid,
        }
      }).then(
          response => {
            if (response.data === 1){
              this.$emit('del',this.mid);
            }
          },
          err => {
            console.log(err);
          }).catch((error) => {
        console.log(error);
      });
    },
  },
}
</script>

<style scoped>

.card {
  /*position: absolute;*/
  display: block;
  margin: 20px 50px 20px 0;
  width: 500px;
  height: 70px;
  cursor: pointer;
}

.topic {
  position: absolute;
  margin: 0 75px 0 -300px;
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}


.time {
  position: absolute;
  font-size: 13px;
  color: #999;
  margin: 20px 0 0 -285px;
  width: 200px;
  height: 10px;
  border: 2px;
}
.time2 {
  position: absolute;
  font-size: 13px;
  color: #f2f2f2;
  margin: 20px 0 0 -285px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  margin: 32px 165px 0 -195px;
  float: right;
  font-size: 14px;
}

.button2 {
  color: #f56c6c;
  padding: 0;
  margin: 32px 16px 0 0px;
  float: right;
  font-size: 14px;
}

.img {
  width: 100%;
  display: inline-block;
  float: left;
  font-size: 30px;
  margin: 5px 10px 0 -200px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
.read {
  color: #f2f2f2;
}
</style>