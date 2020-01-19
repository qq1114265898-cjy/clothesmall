<template>
    <div class="button-bar">
        <!-- 全选 -->
        <div class="all-check"> 
            <check-button class="button-check"/>
            <span>全选</span>
        </div>
        <!-- 总价格 -->
        <div class="total-price">
            <span>总价格:{{totalPrice}}</span>
        </div>
        <!-- 去结算 -->
        <div class="calculate">
            去结算({{totalCount}})
        </div>
    </div>
</template>
 
<script>
import CheckButton from 'components/content/checkButton/CheckButton'
  export default {
  name:'',
  components: {
      CheckButton
  },
  computed: {
      //计算总价格
      totalPrice(){
          return this.$store.state.cartList.filter(item=>{
              return item.isActive
          }).reduce((preValue, item)=>{
              return preValue + item.price * item.count
          },0).toFixed(2)
      },
      //计算总数量
      totalCount(){
          return this.$store.state.cartList.filter(item=>item.isActive).length
      }
  },
  }
</script>

<style scoped>
.button-bar{
    position: fixed;
    left: 0;
    right: 0;
    bottom:49px;
    display: flex;
    align-items: center;
    background-color:#eee;
    height: 40px;
}
.all-check{
    display: flex;
    padding: 0 5px;
    align-items: center;
    line-height: 40px;
    width: 80px;
}
.all-check span{
    margin-left: 5px;
}
.button-check{
    width: 20px;
    height: 20px;
    display: flex;
    line-height: 20px;
}
.total-price{
    flex: 1;
}
.calculate{
    width: 90px;
    height: 36px;
    line-height: 36px;
    background-color: rgb(255, 0, 0);
    color: #fff;
    text-align: center;
}
</style>