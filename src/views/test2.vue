<template>
  <div>    
    <edt :msg="fmsg"></edt>
  </div>
</template>

<script>
    import edt from '@/components/edt.vue'
    export default {
        name: 'test2',
        data(){
            return{
                fmsg:'俺是父组件传的值，部署时为该文档原内容'
            }
        },
        components:{
            edt
        }
    }
</script>
<style scoped>
</style>