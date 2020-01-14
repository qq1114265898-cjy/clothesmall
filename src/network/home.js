import {Request} from './request'

export function getHomeMultidata(){
    return Request({
        url:'/home/multidata'
    })
}
export function getHomeGoods(type,page){
    return Request({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}