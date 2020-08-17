<template>
    <el-container>
        <el-row>
            <el-col :span="8">
                <el-card :body-style="{ padding: '0px' }" class="card">
                    <div style="padding: 14px;">
                        <i class="el-icon-chat-dot-round img"></i>
                        <span class="topic">{{name}}</span>
                        <div class="bottom clearfix">
                            <time class="time">{{ currentDate }}</time>
                            <el-button type="text" class="button">{{url}}</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
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
        methods: {},
        props: {
            name: String,
            url: String
        }
    }
</script>

<style scoped>
    .card {
        display: block;
        margin: 0 50px 20px 0;
        width: 500px;
        height: 70px;
    }

    .topic {
        position: absolute;
        margin-right: 75px;
        margin-left: -300px;
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
        margin-right: 50px;
        float: right;
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