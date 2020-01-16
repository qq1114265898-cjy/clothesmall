<template>
    <div>
        <detail-nav-bar></detail-nav-bar>
    </div>
</template>
 
<script>
import DetailNavBar from './childComps/DetailNavBar'
  export default {
  name:'',
  data() {
      return {
          iid:null
      }
  },
  components:{
      DetailNavBar
  },
  created() {   
      this.iid=this.$route.params.iid
  },
  }
</script>

<style scoped>
</style>