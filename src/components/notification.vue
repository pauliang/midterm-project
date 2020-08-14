<template>
    <el-button plain @click="open">
        <div>
            <el-button type="text" class="info">{{question}}</el-button>
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
        methods: {
            open() {
                this.$notify({
                    title: this.question+'问题的解决方法是：',
                    message: this.solution,
                    duration: 0
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
    .el-button--text {
        font-size: 20px;
    }
    element.style {
        top: 16px;
        font-size: 20px;
        z-index: 2001;
    }
     .el-notification.right {
         right: 16px;
     }
     .el-notification {
         display: flex;
         width: 330px;
         padding: 14px 26px 14px 13px;
         border-radius: 8px;
         box-sizing: border-box;
         border: 1px solid #EBEEF5;
         position: fixed;
         background-color: #FFF;
         box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
         transition: opacity .3s, transform .3s, left .3s, right .3s, top .4s, bottom .3s;
         overflow: hidden;
     }
    .el-notification__title {
        font-weight: 700;
        font-size: 16px;
        color: #303133;
        margin: 0;
    }
    h2 {
        display: block;
        font-size: 1.5em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }
    .el-notification__content p {
        margin: 0;
        font-size: 20px;
    }
    p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
</style>