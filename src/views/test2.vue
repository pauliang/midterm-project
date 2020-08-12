<template>
  <div>    
    <edt :msg="fmsg" class="title"></edt>
    <edt :title="ftitle" class="content"></edt>
    <div>

    </div>
  </div>
</template>

<script>
    import edt from '@/components/edt.vue'
    export default {
        name: 'test2',
        data() {
            return{
                fmsg: '',
                ftitle: ''
            }
        },
        components: {
            edt
        }
    }
</script>
<style scoped>
  .title {
    text-align: center;
  }
  .content {
    text-align: left;
  }

</style>