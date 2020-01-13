import {Request} from './request'

export function getHomeMultidata(){
    return Request({
        url:'/home/multidata'
    })
}