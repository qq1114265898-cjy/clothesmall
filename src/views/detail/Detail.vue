<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
        <scroll class="detail-scroll" @imageLoad="imageLoad" ref="scroll">
            <detail-swiper :topImages="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shopInfo"></detail-shop-info>
            <detail-goods-info :detailInfo="detailGoodsInfo"></detail-goods-info>
            <detail-param-info :paramInfo="goodsParam"></detail-param-info>
            <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
        </scroll>
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

import Scroll from 'components/common/scroll/Scroll';

import {getDetailDate, goods, shopInfo, goodsParam} from 'network/detail'
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
          commentInfo:{}
      }
  },
  components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo
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
      })
  },
  methods: {
      imageLoad(){
          this.$refs.scroll.scroll.refresh()
      }
  },
  beforeMount() {
      
  },
  mounted() {
      this.$refs.scroll.scroll.refresh()
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
    height: calc(100% - 44px);
}
</style>