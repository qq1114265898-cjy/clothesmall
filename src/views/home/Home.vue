<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
        <home-swiper :banners="banners"/>
        <recommend-views :recommends="recommends"/>
        <feature-view/>
        <tab-control :titles="['流行','新款','精选']" class="tab-control"/>
        <goods-list :goods="goods['pop'].list"/>
        <ul>
            <li>列表1</li>
            <li>列表2</li>
            <li>列表3</li>
            <li>列表4</li>
            <li>列表5</li>
            <li>列表6</li>
            <li>列表7</li>
            <li>列表8</li>
            <li>列表9</li>
            <li>列表10</li>
            <li>列表11</li>
            <li>列表12</li>
            <li>列表13</li>
            <li>列表14</li>
            <li>列表15</li>
            <li>列表16</li>
            <li>列表17</li>
            <li>列表18</li>
            <li>列表19</li>
            <li>列表20</li>
            <li>列表11</li>
            <li>列表12</li>
            <li>列表13</li>
            <li>列表14</li>
            <li>列表15</li>
            <li>列表16</li>
            <li>列表17</li>
            <li>列表18</li>
            <li>列表19</li>
            <li>列表20</li>
            <li>列表11</li>
            <li>列表12</li>
            <li>列表13</li>
            <li>列表14</li>
            <li>列表15</li>
            <li>列表16</li>
            <li>列表17</li>
            <li>列表18</li>
            <li>列表19</li>
            <li>列表20</li>
        </ul>
    </div>
</template>
 
<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendViews from './childComps/RecommendViews'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl'
import goodsList from 'components/content/goods/goodsList'

import {getHomeMultidata,getHomeGoods} from 'network/home';
    export default {
    name:'Home',
    components:{
        HomeSwiper,
        RecommendViews,
        FeatureView,
        NavBar,
        TabControl,
        goodsList
    },
    data(){
        return{
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]},
            }
        }
    },
    created() {
        this.getHomeMultidata()
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    methods: {
        getHomeMultidata(){
            getHomeMultidata()
            .then(res=>{
                this.banners=res.data.banner.list
                this.recommends=res.data.recommend.list
            })
        },
        //type是一个对象，对应上面的'pop'参数，pop里面有很多东西
        getHomeGoods(type){
            const page=this.goods[type].page + 1
            getHomeGoods(type,page)//这里的type 就是pop里面的type和page了
            .then(res=>{
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page+=1;
            })
        }
    }
}
</script>

<style>
#home{
    padding-top:44px;
}
.home-nav{
    background-color:var(--color-tint);
    color: #ffffff;

    position: fixed;
    left: 0;
    right: 0;
    top:0;
    z-index:9;
}
.tab-control{
    position: sticky;
    top:44px;
}

</style>