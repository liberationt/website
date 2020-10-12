<template>
    <div>
        <Navbar></Navbar>
        <appMain></appMain>
    </div>
</template>
<script>
import Navbar from './header'
import appMain from './content'
export default {
    components:{Navbar,appMain},
    data(){
        return{

        }
    }
}
</script>
<style lang="scss" scoped>
    
</style>