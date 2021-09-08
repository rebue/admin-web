<template>
    <div>demo test dialog
        <a-button @click="closeDialog">close</a-button>
        <a-button @click="ok">ok</a-button>
    </div>
</template>
<script>
export default {
    methods:{
        ok(){
            
            this.submit()
            //then
            this.callback('hello world')
            this.closeDialog()
        },
        submit(){console.log('---child submit')}
    },
    mounted(){
        console.log('---child', this.closeDialog)
    }

}
</script>
