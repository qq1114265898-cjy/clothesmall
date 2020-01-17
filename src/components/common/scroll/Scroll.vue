<template>
 <!-- bs必须要有wrapper 和content 且content必须有高度 -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
 
<script>
//首先引入better scroll插件
import Bscroll from 'better-scroll'
  export default {
  name:'',
  //由外部来决定你需要的probetype 和是否使用上拉加载更多功能
  props:{
      probeType:{
          type:Number,
          default:1
      },
      pullUpLoad:{
          type:Boolean,
          default:false
      }
  },
  data() {
      return {
          scroll:null
      }
  },
  mounted() {
      //要是用BS的功能 直接new Bscroll （el, options 包括click为true probeType pullUpLoad等）
      this.scroll=new Bscroll(this.$refs.wrapper,{
          click:true,
          probeType:this.probeType,
          pullUpLoad:this.pullUpLoad
      })
    //   this.scroll.on监听Bs的事件  监听滚动为'scroll' position=>{ this.$emit(把position发出去)}
      this.scroll.on('scroll',position=>{
        //   console.log(position)
        this.$emit('scroll',position)
      })
    //   上啦监听为pullingUP
      this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
      })
  },
  }
</script>

<style>
</style>