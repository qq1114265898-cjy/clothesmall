<template>
    <div>
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <shop-cart-list/>
        <cart-button-bar/>
    </div>
</template>
 
<script>
import NavBar from 'components/common/navbar/NavBar'

import ShopCartList from './childComps/ShopCartList'
import CartButtonBar from './childComps/CartButtonBar'
//将getters映射在computed内
import { mapGetters } from 'vuex';

export default {
name:'Shopcart',
components:{
    NavBar,
    ShopCartList,
    CartButtonBar
},
//购物车商品数量(不含重复)
computed: {
    ...mapGetters(['cartLength'])
},
}
</script>

<style scoped>
.nav-bar{
    background-color:var(--color-tint);
    color: #ffffff;
    position: relative;
    z-index: 9;
}
</style>