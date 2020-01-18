import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        //定义一个数组 数组里面放的商品又是一个个对象
        cartList:[]
    },
    mutations:{
        addCart(state,payload){
            
            // state.cartList.push(payload)
            // 判断商品是否相同 相同数量就加一
            let exsitProduct=null
            for(let i of state.cartList){
                if(i.iid == payload.iid){
                    exsitProduct=i
                }
            }
                if(exsitProduct){
                    exsitProduct.count+=1
                }else{
                    payload.count=1
                    state.cartList.push(payload)
                }
            }
        }
})


export default store