<template>
    <div class="outer" @mouseover="overShow" @mouseout="shut">
        <el-card :body-style="{ padding: '0px', height:'180px'}" shadow="hover"
                 class="card">

            <i class="el-icon-document" style="font-size:90px;margin-top:20px" v-if="ishover"></i>
            <i class="el-icon-document-checked" style="font-size:90px;margin-top:20px" v-if="!ishover"></i>
            <el-button v-popover:popover class="posi" type="primary" icon="el-icon-more" size="small"></el-button>

            <div style="padding: 14px;">
                <div class="bottom clearfix">
                    <el-button v-if="doc.stat>=0 || user === doc.author" type="text" class="button" @click="jmp(url)">
                        {{doc.docname}}
                    </el-button>
                    <el-button v-else disabled type="text" class="button">{{doc.docname}}</el-button>
                    <br>
                    <span class="date">{{dateFormat(doc.lasttime)}}</span>
                </div>
            </div>

        </el-card>
        <el-popover ref="popover" placement="bottom" trigger="click">
            <div>
                <el-button v-if="doc.stat==3 || doc.stat==0 || user==doc.author" class="option el-icon-share"
                           type="text" size="small" @click="generateQR(url)">&nbsp;分享
                </el-button>
                <el-button v-else disabled class="option el-icon-share" type="text" size="small">&nbsp;分享</el-button>
            </div>
            <div>
                <el-button v-if="!doc.isCollected" class="option el-icon-star-off" type="text" size="small"
                           @click="collectItem(doc.docnum)">收藏
                </el-button>
                <el-button v-else class="option el-icon-star-on" type="text" size="small"
                           @click="cancelCollectItem(doc.docnum)">已收藏
                </el-button>
            </div>
            <div>
                <el-button v-if="this.user==doc.author" class="option el-icon-delete" type="text" size="small"
                           @click="removeItem(doc.docnum)">删除
                </el-button>
                <el-button v-else disabled class="option el-icon-delete" type="text" size="small">删除</el-button>
            </div>
        </el-popover>
        <el-dialog center title="二维码" :visible.sync="isShow" width="300px" append-to-body=true>
            <img style="display: block; margin: 0 auto 20px;" :src="def" alt="二维码">
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "card",
        props: {
            doc: Object,
            // docname: String,
            url: String,
            // docnum: Number,
            user: String,
            // author: Number,
            // isCollected: Boolean,
        },
        data() {
            return {
                ishover: true,
                def: '',
                isShow: false,
            };
        },
        methods: {
            dateFormat: function (time) {
                var date = new Date(time);
                var year = date.getFullYear();
                var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                // 拼接
                return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
            },
            overShow() {
                this.ishover = false;
            },
            shut() {
                this.ishover = true;
            },
            jmp(addr) {
                let x = this.$router.resolve({
                    path: addr
                });
                window.open(x.href);
            },
            generateQR(url) {
                var baseurl = 'http://118.31.175.39';
                var docurl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + baseurl + url;
                this.$axios.get(docurl, {
                    responseType: 'arraybuffer'
                })
                    .then(response => {
                        return 'data:image/png;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) =>
                            data + String.fromCharCode(byte), ''));
                    })
                    .then(data => {
                        this.def = data;
                        console.log(data);
                    })
                this.isShow = true;
            },
            removeItem(docnum) {
                this.$emit('remove-event', docnum);
                this.doc.stat = -2;
            },
            collectItem(docnum) {
                this.$emit('collect-event', docnum);
                this.doc.isCollected = true;
            },
            cancelCollectItem(docnum) {
                this.$emit('cancel-event', docnum);
                this.doc.isCollected = false;
            },
        },
    };
</script>

<style scoped>
    .card {
        position: relative;
        border-radius: 10px;
        border: 1px rgb(199, 199, 204) solid;
        height: 200px;
    }
    .outer :hover {
        background: rgb(228, 228, 233);
    }
    .el-button--text {
        font-size: 15px;
    }
    /*日期样式*/
    .bottom .date {
        font-size: 12px;
        color: gray;
    }
    .posi {
        position: absolute;
        right: 0;
        top: 0;
    }
    .el-button--primary {
        color: #000000;
        background-color: transparent;
        /* border-color: #8B83D2; */
        border: none;
    }
    .option {
        width: 150px;
        height: 25px;
        line-height: 25px;
    }
</style>
<style>
    .el-popover {
        position: absolute;
        background: #FFF;
        width: 40px;
        min-width: 100px;
        /* height: 100px; */
        border: 1px solid #EBEEF5;
        padding: 10px 0;
        z-index: 2000;
        color: #606266;
        line-height: 1.4;
        text-align: justify;
        font-size: 14px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        word-break: break-all;
    }
    /* .el-popover, .el-time-panel {
         -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
     } */
    .option {
        color: #409EFF;
        background: 0 0;
        padding-left: 0;
        padding-right: 50px;
    }
</style>
