import {debounce} from './utils'

import BackTop from 'components/content/backTop/BackTop'

export const imgLoadMixins={
    mounted() {
        //防抖动 刷新图片
        let newRefresh=debounce(this.$refs.scroll.scroll.refresh,100)
        this.Refresh = ()=>{
            newRefresh()
        }
        this.$bus.$on('itemImgLoad',this.Refresh)
    },
}

//backtop混入

export const backTopMixins={
    data() {
        return {
            currentPositionY:0
        }
    },
    components:{     
        BackTop
    },
    computed: {
        showBackTop(){
            return -this.currentPositionY > 1000
        },
    },
    methods: {
        backClick(){
            this.$refs.scroll.scroll.scrollTo(0,0,500)
        }
    },  
}