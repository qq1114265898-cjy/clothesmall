<template>
    <div>
        <div class="check-button">
            <img src="~assets/img/cart/tick.svg" alt="" :class="{active:isActive}">
        </div>
    </div>
</template>
 
<script>
  export default {
  name:'',
  props:{
      isActive:{
          type:Boolean,
          default:false 
      }
  }
  }
</script>

<style scoped>
.check-button{
    border: 2px solid rgb(228, 206, 206);
    border-radius: 50%;
}
.active{
    background-color:var(--color-tint);
    border-radius: 50%;
}
</style>