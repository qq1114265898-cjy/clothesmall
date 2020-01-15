<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
 
<script>
import Bscroll from 'better-scroll'
  export default {
  name:'',
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
      this.scroll=new Bscroll(this.$refs.wrapper,{
          click:true,
          probeType:this.probeType,
          pullUpLoad:this.pullUpLoad
      })
      this.scroll.on('scroll',position=>{
        //   console.log(position)
        this.$emit('scroll',position)
      })
      this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
      })
  },
  }
</script>

<style>
</style>