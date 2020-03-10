<template>
    <div class="  ">
        
        <navbarPrincipal/>
        <navbarSearch/>
        <notasView/>
        <navbarDown/>
        
        
    </div>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import navbarPrincipal from '@/components/NavbarPrincipal.vue'
import navbarSearch from '@/components/NavbarSearch.vue'
import notasView from '@/components/NotasView.vue'
import navbarDown from '@/components/NavbarDown.vue'

export default {
    name: "Principal",
    components: {
        navbarPrincipal,
        navbarSearch,
        notasView,
        navbarDown
    },
    computed:{
        ...mapState(['notas'])
    },
    methods:{
        ...mapActions(['listarNotas','auth','authentication']),
    },
    mounted() {
     // console.log("sdsd")
       this.listarNotas();
      // const route =  this.$router
       //this.auth(route);
      // this.authentication();
       //this.$router.push("/login")

    }
}
</script>

