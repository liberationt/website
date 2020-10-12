<template>
    <div class="content">
        <router-view  :key="key" />
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    computed:{
        key() {
            return this.$route.fullPath
        }
    }
}
</script>
<style lang="scss" scope>
    .content{
        min-height:calc(100vh - 60px);
        position: absolute;
        top:60px;
        left: 0;
        right:0;
        background:#f0f3f6;
        padding:20px 30px;
    }
</style>