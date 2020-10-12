<template>
    <div class="header">
        
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
        background:#2d77ee!important;
        height:60px;
        .headerContent{
            padding:0 30px;
            font-size:18px;
            color:#fff;
            .headerLeft{
                float: left;
                height:60px;
                display: flex;
                .logo{
                    display: flex;
                    line-height: 58px;
                    margin-right:75px;
                }
            }
            .headerRight{
                float:right;
                height:60px;
                display: flex;
                align-items: center;
                // line-height: 58px;
                .imgInfor{
                    width:28px;height:28px;
                    margin-top:5px;
                    margin-right:10px;
                }
                .seatNumber{
                    padding-top:2px;
                }
                .sx{
                    margin:0 16px;
                }
                .layOut{
                    cursor: pointer;
                }
            }
            .headerLogo{
                font-size:34px;color:#fff;
                padding-right:10px;
            }
            .logoText{
                font-size:26px;
                color:#fff;
            }
            .el-menu{
                background:#2d77ee!important;
                .el-menu-item{
                    background:#2d77ee!important;
                    border-bottom:none;font-size:18px;color:#fff!important;
                    padding:0 42px;
                }
                .el-menu-item.is-active{
                    background:#5093ff!important;
                    border-bottom:none;font-size:18px;color:#fff!important;
                }
            }
        }
    }
</style>