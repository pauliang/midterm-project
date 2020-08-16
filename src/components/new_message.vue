<template>
    <el-container>
        <el-row :span="8" class="outer">
            <el-card :body-style="{ padding: '0px' }" class="card">
                <div style="padding: 14px;">
                    <i class="el-icon-chat-dot-round img"></i>
                    <span class="topic">{{name}}</span>
                    <div class="bottom clearfix">
                        <time class="time">{{ dateFormat(currentDate) }}</time>
                        <el-button type="text" class="button">{{url}}</el-button>
                    </div>
                </div>
            </el-card>
        </el-row>
    </el-container>
</template>

<script>
    export default {
        name: 'new_message',
        data() {
            return {
                currentDate: new Date()
            };
        },
        methods: {
            dateFormat: function(time) {
                var date=new Date(time);
                var year=date.getFullYear();
                var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
                var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
                var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
                var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
                var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
                // 拼接
                return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
            }
        },
        props: {
            name: String,
            url: String
        }
    }
</script>

<style scoped>
    .outer {
        /*position: relative;*/
    }
    .card {
        /*position: absolute;*/
        display: block;
        margin: 20px 50px 20px 0;
        width: 500px;
        height: 70px;
    }

    .topic {
        position: absolute;
        margin-right: 75px;
        margin-left: -300px;
        margin-top: 5px;
        font-size: 16px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    .time {
        position: absolute;
        font-size: 13px;
        color: #999;
        margin-top: 20px;
        margin-left: -300px;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        margin-top: -10px;
        margin-right: 15px;
        float: right;
        font-size: 14px;
    }

    .img {
        width: 100%;
        display: inline-block;
        float: left;
        font-size: 30px;
        margin: 10px 10px 0 -200px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>