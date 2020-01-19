<template>
    <div class="shop-cart-list">
        <scroll class="cart-scroll">
            <shop-cart-item v-for="(item, index) in cartList" :item-info="item" :key="index"/>
        </scroll>
    </div>
</template>
 
<script>
import { mapGetters } from 'vuex'

import ShopCartItem from './ShopCartItem';

import Scroll from 'components/common/scroll/Scroll'
  export default {
  name:'',
  components: {
      Scroll,
      ShopCartItem
  },
  computed: {
      ...mapGetters(['cartList'])
  },
  }
</script>

<style scoped>
.shop-cart-list{
    height: 100vh;
}
.cart-scroll{
    overflow: hidden;
    height: calc(100% - 113px)
}
</style>