<template>
    <div>
        <el-container class="whole w container">
            <my_header></my_header>
            <el-container>
                <el-aside class="aside">
                    <el-menu :default-active="emm" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                        :collapse="isCollapse">

                        <el-row class="nav title">金石模板</el-row>

                        <el-menu-item index="2" class="nav all" @click="shortjmp('model_all')">
                            <span slot="title">全部模板</span>
                        </el-menu-item>

                        <el-menu-item index="3" class="nav third" @click="shortjmp('model_efficiency')">
                            <span slot="title">工作效率</span>
                        </el-menu-item>

                        <el-menu-item index="4" class="nav" @click="shortjmp('model_cooperation')">
                            <span slot="title">团队协作</span>
                        </el-menu-item>

                        <el-menu-item index="5" class="nav" @click="shortjmp('model_life')">
                            <span slot="title">生活出行</span>
                        </el-menu-item>

                        <el-menu-item index="6" class="nav" @click="shortjmp('model_study')">
                            <span slot="title">学生必备</span>
                        </el-menu-item>

                        <el-menu-item index="7" class="nav" @click="shortjmp('model_vocation')">
                            <span slot="title">行业模板</span>
                        </el-menu-item>
                    </el-menu>

                </el-aside>

                <model_all v-if="which === 'model_all'" :emm="emm"></model_all>
                <model_efficiency v-else-if="which === 'model_efficiency'"></model_efficiency>
                <model_cooperation v-else-if="which === 'model_cooperation'"></model_cooperation>
                <model_life v-else-if="which === 'model_life'"></model_life>
                <model_study v-else-if="which === 'model_study'"></model_study>
                <model_vocation v-else-if="which === 'model_vocation'"></model_vocation>

            </el-container>
            <el-footer>
                <img src="../assets/footer.png">
            </el-footer>
        </el-container>

    </div>
</template>

<script>
    import my_header from "../components/my_header";
    import model_all from "../components/model_all";
    import model_efficiency from "../components/model_efficiency";
    import model_cooperation from "../components/model_cooperation";
    import model_life from "../components/model_life";
    import model_study from "../components/model_study";
    import model_vocation from "../components/model_vocation";

    export default {
        name: 'models',
        components: {
            my_header,
            model_all,
            model_efficiency,
            model_cooperation,
            model_life,
            model_study,
            model_vocation
        },
        data() {
            return {
                which: 'model_all',
                islogin: true,
                emm: 'model_all',
                isCollapse: false,
                localStorageName: '',
                localStorageID: '',
                board_list: [{
                        name: '空白模板'
                    },
                    {
                        name: '会议纪要模板',
                        url: require('@/assets/model1.png')
                    },
                    {
                        name: '康奈尔笔记法',
                        url: require('@/assets/model2.png')
                    },
                    {
                        name: '四象限法则',
                        url: require('@/assets/model3.png')
                    },
                    {
                        name: '阅读笔记模板',
                        url: require('@/assets/model4.png')
                    },
                    {
                        name: '项目策划模板',
                        url: require('@/assets/model5.png')
                    }
                ]
            }
        },
        methods: {
            goBoard(name) {
                this.$router.push({
                    name: 'Model1',
                    params: {
                        id: name
                    }
                })
            },
            goBack() {
                this.$router.push({
                    name: 'Page',
                })
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            zipornot() {
                this.isCollapse = !this.isCollapse;
            },
            shortjmp(which) {
                this.which = which
            },
            longjmp(name) {
                if (localStorage.getItem('groupid') != null)
                    localStorage.removeItem('groupid');
                this.$router.push({
                    name: name,
                })
            },
            logout() {
                this.islogin = false;
                localStorage.removeItem('userID');
                localStorage.removeItem('username');
                this.longjmp("Login");
            },
        },
        created() {
            var userID = localStorage.getItem('userID');
            if (userID != null) {
                this.islogin = true;
                this.localStorageName = localStorage.getItem('username');
                this.localStorageID = userID;
            } else {
                //暂时修改
                // localStorage.getItem('aaa');
                this.longjmp("Login");
            }
            if (localStorage.getItem('docid') != null)
                localStorage.removeItem('docid');
        },
        props: {
            choice: Number,
            msg: String
        }
    }
</script>
<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 220px;
        min-height: 600px;
    }

    .whole {
        height: 1500px;
    }

    .w {
        height: 700px;
    }

    .container {
        background-color: #f2f2f2;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 220px;
        min-height: 600px;
    }

    .el-container {
        position: relative;
    }

    .el-divider--horizontal {
        margin-bottom: 1px !important;
        margin-top: 0 !important;
    }

    .el-link--default {
        color: #303133;
        font-size: 17px;
    }

    .el-row {
        margin-bottom: 20px;
    }

    .el-col {
        margin-top: 5px;
        border-radius: 4px;
    }

    li {
        list-style: none;
        display: inline-block;
    }

    .left {
        position: absolute;
        top: 0;
        left: 0;
    }

    .right {
        position: absolute;
        top: 0;
        right: 20px;
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

    .el-menu {
        background-color: #f2f2f2;
    }

    .introduce {
        padding: 10px 0 0;
        color: #616161;
        text-align: center;
    }

    .introduce .intro1 {
        font-size: 12px;
        color: #a5a5a5;
        -webkit-font-smoothing: antialiased;
    }

    .introduce .intro2 {
        fill: #4a5056 !important;
    }

    .nav {
        display: block;
        margin: 0 auto 0 auto;
        line-height: 56px;
        height: 56px;
        text-align: center;
        color: #898c8f;
        font-size: 16px;
    }

    .title {
        margin-top: 15px;
        font-size: 18px;
        font-weight: 700;
        color: #53575c;
        width: 150px;
    }

    .all {
        width: 150px;
        border-bottom: 1px solid #d0d1d2;
        border-top: 1px solid #d0d1d2;
        padding-bottom: 15px;
    }

    .third {
        margin-top: 15px;
    }

    .main {
        position: relative;
        height: 800px;
    }

    .choice {
        text-align: left;
    }

    .box {
        float: left;
        margin: 15px 15px;
        width: 220px;
        height: 300px;
    }

    .b_name {
        margin: 8px -10px;
        width: 180px;
    }

    .plus {
        font-size: 180px;
        height: 220px;
        margin-top: 4px;
        color: #959da5;
        font-weight: 400;
    }

    .pic {
        padding: 0;
        position: relative;
        margin: 0 12px 20px;
    }

    .content {
        margin: 0 60px 10px 9px;
        width: 200px;
        height: 20px;
        background-color: #ffffff;
    }

    .bg-purple {
        background: #f2f2f2;
        text-align: center;
        font-size: 18px;
        line-height: 10px;
        color: #4d4d4d;
        font-weight: 400;
    }

    .el-footer {
        padding: 0 0;
    }

    .el-footer img {
        display: block;
        width: 100%;
    }
</style>