<template>
    <div class="goods-list">
        <goods-list-item v-for="item in goods" :goodsItem="item" :key="item.id"  />
    </div>
</template>
 
<script>
import goodsListItem from './goodsListItem'
  export default {
  name:'',
  props:{
      goods:{
          type:Array,
          default(){
              return []
          }
      }
  },
  components:{
    goodsListItem
  }
  }
</script>

<style>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around
}
</style>