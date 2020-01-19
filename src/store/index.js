import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const state={
    //定义一个数组 数组里面放的商品又是一个个对象
    cartList:[]
}

const store=new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})


export default store