<template>
    <div>
        <edt :msg="fmsg" class="title">
            <board :choice="choice"></board>
        </edt>
        <edt :title="ftitle" class="content"></edt>
    </div>
</template>

<script>
    // @ is an alias to /src
    import board from '@/components/board.vue'
    import edt from '@/components/edt.vue'

    export default {
        name: 'test1',
        data() {
            return {
                fmsg: '',
                ftitle: '',
                choice: 1,
            }
        },
        components: {
            board,
            edt
        }
    }
</script>