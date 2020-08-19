<template>
    <el-button plain @click="open">
        <div>
            <ul class="list">
                <ul>
                    <li>
                        <el-button type="text" class="info" v-if="isClick">{{question}}</el-button>
                    </li>
                </ul>
            </ul>
        </div>
    </el-button>
</template>

<script>
    export default {
        name: 'notification',
        props: {
            question: String,
            solution: String,
        },
        data() {
            return {
                isClick: true,
            };
        },
        methods: {
            open() {
                this.$notify({
                    title: this.question+'问题的解决方法是：',
                    message: this.solution,
                    duration: 0,
                });
            }
        }
    }
</script>

<style scoped>
    .info {
        height: 50px;
        line-height: 50px;
        margin: -30px auto;
    }
    .list {
        margin-left: -30px;
    }
</style>
<style>
    .el-notification__content {
        font-size: 20px;
        line-height: 21px;
        margin: 6px 0 0;
        color: #606266;
        text-align: justify;
    }
    .el-button--text {
        font-size: 20px;
    }
    .el-notification.right {
        right: 16px;
    }
    .el-notification {
        display: flex;
        float: right;
        width: 330px;
        padding: 14px 26px 14px 13px;
        border-radius: 8px;
        box-sizing: border-box;
        border: 1px solid #EBEEF5;
        position: fixed;
        background-color: #f6f6f6;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        transition: opacity .3s, transform .3s, left .3s, right .3s, top .4s, bottom .3s;
        overflow: hidden;
    }
    .el-notification__title {
        font-weight: 400;
        font-size: 20px;
        font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        color: #303133;
        margin: 0;
    }
    h2 {
        display: block;
        font-size: 1.5em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0;
        margin-inline-end: 0;
        font-weight: 400;
    }

    .el-notification__content p {
        font-size: 20px;
        color: #409EFF;
        margin: 5px 0 0 0;
        line-height: 25px;
    }

    p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0;
        margin-inline-end: 0;
    }
</style>