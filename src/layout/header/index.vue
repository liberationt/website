<template>
    <div class="header">
        <div class="mainWidth">
            <span>注册</span>
            <span>登录</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            activeIndex:'1',
            routeList:[],
            menuList:[],
            seatNumber:''
        }
    },
    methods:{
        handleSelect(key, keyPath) {
        },
        layOut(){
            this.$confirm('确认退出登录？', '退出登录', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.logout()
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消退出登录'
                })
            })
        },
        async logout() {
            await this.$store.dispatch('logout')
            await this.pushLogin()
        },
        pushLogin() {
            return new Promise((resolve, reject) => {
                this.$router.push(`/login`)
            })
        },
    },
    mounted(){
        this.menuList = this.$router.options.routes[0].children
        // this.seatNumber = JSON.parse(localStorage.getItem('LoginSelf')).seatNumber || localStorage.getItem('seatNumber')
        this.seatNumber = localStorage.getItem('seatNumber')
    }
}
</script>
<style lang="scss" scope>
    .header{
        height:45px;
        text-align: right;
        width:100%;
        background:#f0f3f6;
        .mainWidth{
            padding:0 10px;
            line-height: 50px;
            width:1440px;
            margin:0 auto;
            cursor: pointer;
            span{
                padding:0 10px;
                color:#6e7d81
            }
            span:hover{
                color:red
            }
        }
    }
</style>