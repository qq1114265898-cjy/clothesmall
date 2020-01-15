<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
        <scroll class="home-content" ref="homescroll" :probe-type="3" @scroll="contentScroll" @pullingUp="homeUpLoad" :pull-up-load="true" >
            <home-swiper :banners="banners"/>
            <recommend-views :recommends="recommends"/>
            <feature-view/>
            <tab-control :titles="['流行','新款','精选']" class="tab-control"  @tabClick="tabClick"/>
            <goods-list :goods="showGoods"/>
        </scroll>   
        <back-top v-show="showBackTop" @click.native="backClick"/>
    </div>
</template>
 
<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendViews from './childComps/RecommendViews'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl'
import goodsList from 'components/content/goods/goodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home';
    export default {
    name:'Home',
    components:{
        HomeSwiper,
        RecommendViews,
        FeatureView,
        NavBar,
        TabControl,
        goodsList,
        Scroll,
        BackTop
    },
    data(){
        return{
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]},
            },
            currentType:'pop',
            currentPositionY:0,
        }
    },
    created() {
        this.getHomeMultidata()
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    computed: {
        showGoods(){
            return this.goods[this.currentType].list
        },
        showBackTop(){
            return -this.currentPositionY > 1000
        }
    },
    methods: {
        //监听事件相关的方法
        tabClick(index){
            switch(index){
                case 0:
                    this.currentType='pop';
                    break
                case 1:
                    this.currentType='new';
                    break
                case 2:
                    this.currentType='sell';
                    break
            }
        },
        backClick(){
            this.$refs.homescroll.scroll.scrollTo(0,0,500)
        },
        contentScroll(position){
            this.currentPositionY=position.y
        },
        homeUpLoad(){
            console.log("上啦加载更多")
            this.getHomeGoods(this.currentType)
            this.$refs.homescroll.scroll.finishPullUp();
        },
        //请求网络相关的方法
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

<style scoped>
#home{
    padding-top:44px;
    height: 100vh;
    position: relative;
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
.home-content{
    /* height: calc(100% - 49px); */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
</style>