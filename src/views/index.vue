<template>
  <div>
    <div class="topInfor">
      <div class="mainWidth ">
        <div class="search">
          <div class="logo">logo</div>
          <div class="searchInput">
            <el-input
              :placeholder="placeHolder"
              v-model="search"
              style="width:500px;"
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="mainContent">
      <div class="mainWidth ">
        <div class="hot">
          <div class="hotImg"><img src="@/assets/images/hot.png" alt=""></div>
          <div>
            <div class="title">热卖榜</div>
            <div class="subTitle">引领购物潮流</div>
          </div>
        </div>
        <div class="hotContent">
          <div class="jd">
            <div v-for="item in 4" :key="item" class="good">
              <div class="topNum" :class="item==1?'topNum1':item==2?'topNum2':item==3?'topNum3':'topnum'">{{item}}</div>
              <div class="pic"><img src="@/assets/images/pic.png" alt=""></div>
              <div></div>
            </div>
          </div>
          <div class="sn">
            <div v-for="item in 4" :key="item" class="good">
              <div class="topNum" :class="item==1?'topNum1':item==2?'topNum2':item==3?'topNum3':'topnum'">{{item}}</div>
              <div class="pic"><img src="@/assets/images/pic.png" alt=""></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      placeHolder: "动态数据"
    };
  }
};
</script>
<style lang="scss" scoped>
.topInfor {
  background: #fff;
}
.search {
  height: 120px;
  margin-top: 15px;
  .logo {
    width: 120px;
    height: 120px;
    background: red;
    position: absolute;
  }
  .searchInput {
    text-align: center;
    line-height: 120px;
  }
}
.mainContent {
  margin-top:15px;
  .hot{
    background:#fff;
    display: flex;
    align-items: center;
    padding:10px;
    color:#e1251b;
    border-bottom:1px solid #c5c5c5;
    box-shadow: #c5c5c5 0 0 30px 0px;
    margin-bottom: 3px;
    .hotImg{
      width:60px;
      img{
        width:60px;
      }
    }
    .title{
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 5px;
    }
    .subTitle{
      color:#999999;
      font-size:14px;
    }
  }
}
.hotContent{
  background:#fff;
  .jd{
    width:710px;
    height:300px;
    float: left;
  }
  .sn{
    width:710px;
    height:300px;
    float: right;
  }
  .good{
    padding:20px 30px;
    height:140px;
    background: #fff;
    margin-bottom: 10px;
    position: relative;
    .topNum{
      width:30px;
      height:30px;
      background:#dccaa9;
      color:#fff;
      line-height: 30px;
      text-align: center;
      font-weight: 600;
      position: absolute;
      top:0;
      left:-2px;
    }
    .topNum::after{
      content: "";
      position: absolute;
      left: 0;
      top: 30px;
      width: 0;
      height: 0;
      border: 1px solid #dccaa9;
    }
    .topNum1{
      background:#ee3333;
    }
    .topNum2{
      background:#ff9250;
    }
    .topNum3{
      background:#ffbd37;
    }
    .pic{
      width:100px;
      height:100px;
      overflow: hidden;
      img{
        width:100px;
        height:100px;
      }
      img{width:100%;transition: all 0.6s;}
      img:hover{transform: scale(1.2);}
    }
  }
}
</style>