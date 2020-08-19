<template>
  <el-container>
    <el-row :span="8" class="outer">
      <el-card :body-style="{ padding: '0px' }" class="card">
        <div style="padding: 14px;" v-if="!isRead">
          <i class="el-icon-chat-dot-round img"></i>
          <span class="topic">{{this.content}}</span>
          <el-button type="text" class="button" @click="markAs()">标为已读</el-button>
          <el-button type="text" class="button2" @click="deleteMe()">删除消息</el-button>
          <div class="bottom clearfix">
            <!--                        <time class="time">{{ dateFormat(time) }}</time>-->
            <time class="time">{{ this.time }}</time>
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

  </el-container>
</template>

<script>
export default {
  name: 'new_msg',
  props: {
    nid: Number,
    content: String,
    time: String,
  },
  data() {
    return {
      isRead: false,
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
    deleteMe(){
      var msg_url = 'http://39.97.122.202/notice/delete_notice/';
      this.$axios({
        method: 'post',
        url: msg_url, //此处不传data
        data: {
          nid: this.nid,
        }
      }).then(
          response => {
            if (response.data === 1){
              this.$emit('del',this.nid);
            }
          },
          err => {
            console.log(err);
          }).catch((error) => {
        console.log(error);
      });
    },
    markAs() {
      this.isRead = !this.isRead;
    }
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
  margin: 32px 16px 0 -195px;
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