<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
        <tab-control :titles="['流行','新款','精选']" class="tab-control"  @tabClick="tabClick" ref='homeTabControl1' v-show="showTabControl"/>
        <scroll class="home-content" ref="homescroll" :probe-type="3" @scroll="contentScroll" @pullingUp="homeUpLoad" :pull-up-load="true" >
            <home-swiper :banners="banners" @swiperImgLoad='swiperImgLoad' ref='homeSwiper'/>
            <recommend-views :recommends="recommends"/>
            <feature-view/>
            <tab-control :titles="['流行','新款','精选']" class="tab-control"  @tabClick="tabClick" ref='homeTabControl'/>
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
            tabOffsetTop:0,
            isFixed:false,
            saveY:0
        }
    },
    created() {
        this.getHomeMultidata()
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    mounted() {
        this.$bus.$on('itemImgLoad',()=>{
            this.$refs.homescroll.scroll.refresh()
        })
    },
    activated() {
        this.$refs.homescroll.scroll.scrollTo(0,this.saveY,0)
        this.$refs.homescroll.scroll.refresh()
        this.$refs.homeSwiper.startTimer()
    },
    deactivated() {
        this.saveY= this.$refs.homescroll.scroll.y
        this.$refs.homeSwiper.stopTimer()
    },
    computed: {
        showGoods(){
            return this.goods[this.currentType].list
        },
        showBackTop(){
            return -this.currentPositionY > 1000
        },
        showTabControl(){
            return -this.currentPositionY>this.tabOffsetTop
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
            this.$refs.homeTabControl1.currentIndex=index
            this.$refs.homeTabControl.currentIndex=index
        },
        backClick(){
            this.$refs.homescroll.scroll.scrollTo(0,0,500)
        },
        contentScroll(position){
            this.currentPositionY=position.y
            this.isFixed=-(position.y)>this.tabOffsetTop
        },
        //获取上拉加载更多方法
        homeUpLoad(){
            this.getHomeGoods(this.currentType)
            //上拉方法里写再次获取商品的函数 以及获取完毕后 记得finshPullUp()
            this.$refs.homescroll.scroll.finishPullUp();
        },
        //获取offsetTop
        swiperImgLoad(){
            this.tabOffsetTop=this.$refs.homeTabControl.$el.offsetTop
        },
        // 防抖动方法
        // debounce(func,delay){
        //     let timer=null;
        //     return function(...args){
        //         if(timer) clearTimeout(timer)
        //         timer=setTimeout(()=>{
        //             func.apply(this, args)
        //         },delay)
        //     }
        // },
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
    height: 100vh;
    position: relative;
}
.home-nav{
    background-color:var(--color-tint);
    color: #ffffff;
}
.tab-control{
    position: sticky;
    top:44px;
}
.home-content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
</style>