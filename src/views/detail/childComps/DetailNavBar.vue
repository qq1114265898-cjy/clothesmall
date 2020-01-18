<template>
    <div>
        <nav-bar>
            <div slot="left" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="" class="back">
            </div>
            <div slot="center" class="titles">
                <div v-for="(item,index) in titles" class="titles-item" :class="{active:currentIndex==index}"
                @click="titleClick(index)">{{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>
 
<script>
import NavBar from 'components/common/navbar/NavBar'
  export default {
  name:'',
  data() {
      return {
          titles:['商品','参数','评价','推荐'],
          currentIndex:0
      }
  },
  components:{
      NavBar
  },
  methods: {
      titleClick(index){
          this.currentIndex=index
          this.$emit('titleClick',index)
      },
      backClick(){
          this.$router.back()
      }
  },
  }
</script>

<style scoped>
.back{
    margin-top:11px
}
.titles{
    display: flex;
}
.titles-item{
    flex:1;
}
.active{
    color: var(--color-tint)
}
</style>