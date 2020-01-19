export default{
    addCart(context,payload){ 
        // state.cartList.push(payload)
        // 判断商品是否相同 相同数量就加一
        let exsitProduct=null
        for(let i of context.state.cartList){
            if(i.iid == payload.iid){
                exsitProduct=i
            }
        }
            if(exsitProduct){
                context.commit('addCount',exsitProduct)
            }else{
                payload.count=1
                context.commit('addToCart',payload)
        }
    }
}