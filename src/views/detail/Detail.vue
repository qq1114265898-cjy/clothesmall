<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <ul>
            <li v-for="item in $store.state.cartList">{{item}}</li>
        </ul>
        <scroll class="detail-scroll" @imageLoad="imageLoad" ref="scroll" @scroll="scroll" :probe-type="3">
            <detail-swiper :topImages="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shopInfo"></detail-shop-info>
            <detail-goods-info :detailInfo="detailGoodsInfo"></detail-goods-info>
            <detail-param-info ref="param" :paramInfo="goodsParam"></detail-param-info>
            <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
            <goods-list ref="recommend" :goods="recommends"></goods-list>
        </scroll>
        <detail-bottom-bar @addToCart="addCart"/>
        <back-top v-show="showBackTop" @click.native="backClick"/>
    </div>
</template>
 
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import goodsList from 'components/content/goods/goodsList'
import Scroll from 'components/common/scroll/Scroll';

import {debounce} from '@/common/utils';
import {backTopMixins} from '@/common/mixin';

import {getDetailDate,getRecommend, goods, shopInfo, goodsParam} from 'network/detail'
  export default {
  name:'Detail',
  data() {
      return {
          iid:null,
          topImages:null,
          goods:{},
          shopInfo:{},
          detailGoodsInfo:{},
          goodsParam:{},
          commentInfo:{},
          recommends:[],
          Refresh:null,
          themeOffsetY:[],
          currentIndex:0,
          detailRefresh:null
      }
  },
  mixins:[backTopMixins],
  components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      goodsList,
      DetailBottomBar,
  },
  created() { 
      //保存iid
      this.iid=this.$route.params.iid
      getDetailDate(this.iid).then(res=>{  
          const data=res.result
          console.log(res)
        //   详情页轮播图
          this.topImages=data.itemInfo.topImages
          console.log(this.topImages)
        //   获取商品信息
          this.goods=new goods(data.itemInfo,data.columns,data.shopInfo.services)
        //   创建店铺信息
          this.shopInfo=new shopInfo(data.shopInfo)
        //   获取商品详细信息
          this.detailGoodsInfo=data.detailInfo
        // 获取商品参数
          this.goodsParam=new goodsParam(data.itemParams.info,data.itemParams.rule)
        //获取评论数据
        if(data.rate.cRate !==0){
            this.commentInfo=data.rate.list[0]
        }
        //获取推荐数据
        getRecommend().then(res=>{
            // console.log(res)
            this.recommends=res.data.list
        })
      })
  },
  methods: {
      imageLoad(){
          this.$refs.scroll.scroll.refresh();
      },
      titleClick(index){
          console.log(index)
          console.log(this.themeOffsetY)
        
          this.$refs.scroll.scroll.scrollTo(0, -this.themeOffsetY[index], 200);
      },
      //滑动定位主题
      scroll(position){
          const positionY=-position.y
          //拿positionY和themeOffsetY[index]作对比
          let length=this.themeOffsetY.length
          for(let i=0;i<length-1;i++){
              if((this.currentIndex!==i) && (positionY>this.themeOffsetY[i] && positionY<this.themeOffsetY[i+1])){
                  this.currentIndex=i
                  this.$refs.nav.currentIndex=this.currentIndex
              }
          }
          //backtop mixin缺少的方法
          this.currentPositionY=position.y
      },
      addCart(){
          const product={}
          product.image=this.topImages[0];
          product.title=this.goods.title;
          product.desc=this.goods.desc;
          product.price=this.realPrice;
          product.iid=this.iid
          //把数据提交到vuex里
          this.$store.commit('addCart',product)
          console.log(this.$store.state.cartList)
      }
  },
  //点击导航栏跳转到对应主题
  updated() {
          this.themeOffsetY=[];
          this.themeOffsetY.push(0);
          this.themeOffsetY.push(this.$refs.param.$el.offsetTop);
          this.themeOffsetY.push(this.$refs.comment.$el.offsetTop);
          this.themeOffsetY.push(this.$refs.recommend.$el.offsetTop);
          this.themeOffsetY.push(Number.MAX_VALUE)
  },
    mounted() {
        this.detailRefresh=()=>{
            this.$refs.scroll.scroll.refresh()
        }
        this.$bus.$on('itemImgLoad',this.detailRefresh)
    },
    destroyed() {
        this.$bus.$off('itemImgLoad',this.detailRefresh)
    },
}
</script>

<style scoped>
#detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
}
.detail-nav-bar{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
.detail-scroll{
    height: calc(100% - 44px - 49px);
}
</style>