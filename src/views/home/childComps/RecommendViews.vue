<template>
    <div class="recommend">
        <div v-for="item in recommends" :key='item.id' class="recommends-item">
            <a href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>
 
<script>
  export default {
  name:'',
  props:{
      recommends:{
          type:Array,
          default(){
              return []
          }
      }
  }
  }
</script>

<style>
.recommend{
    display: flex;
    text-align: center;
    font-size: 13px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
}
.recommends-item{
    flex: 1
}
.recommends-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 3px;
}
</style>