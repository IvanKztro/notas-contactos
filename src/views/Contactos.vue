<template>
    <div class=" ">
        <navbarPrincipal class="" />
        <navbarSearchContactos class="pb-1"/>
        
        <div class=" col-lg-12  contacto"  v-if= "(!searchC)"  v-for="(contacto,index) in sortContactos" :key="index">
            <div style="background-color:#F2F2F2" class=" col-12" v-if="letraTitle(contacto.name.charAt(0))">
                <strong>{{contacto.name.charAt(0)}}</strong>
            </div>
            <router-link :to="{name: 'EditContacto', params:{_id: contacto._id }}" >
                <div><strong>{{contacto.name}}</strong></div>
                <hr>
            </router-link> 
        </div>
        <div v-if= "(searchC)">
            <h3>Resultados..</h3>
            <div class=" col-lg-12  contacto" v-for="(contacto,index) in filterContactos" :key="index">
                <router-link :to="{name: 'EditContacto', params:{_id: contacto._id }}" >
                    <div><strong>{{contacto.name}}</strong></div>
                    <hr>
                </router-link> 
            </div>
        </div>
        <navbarDownContactos/>
         
        
    </div>
</template>
<script>
import navbarPrincipal from '@/components/NavbarPrincipal.vue'
import navbarDownContactos from '@/components/NavbarDownContactos.vue'
import navbarSearchContactos from '@/components/NavbarSearchContactos.vue'
import {mapActions, mapState, mapMutations} from 'vuex'
let letraS = null;
export default {
    name: "contactos",
    data(){
        return{
        }
        
    },
    computed:{
        ...mapState(['contactos', 'searchContactos','searchC']),
        sortContactos(){
            let json = this.contactos;
            return json.sort( (a,b) => 
            { return a.name < b.name ? -1 : 1  })
        },
        filterContactos(){
            const filter =  this.contactos.filter(contacto => {
                return contacto.name.toLowerCase().includes(this.searchC.toLowerCase())
            } )
            return filter
        }
        
    },
    methods:{
        ...mapActions(['listarContactos','auth','authentication']),
    
        letraTitle( contacto){
           // return (contacto == this.firstL)? false: true
           let g = letraS
             if(g == contacto)
                 return false;
             else{
                 letraS = contacto;
                 return true;
             }
        }
        
    },
    components:{
        navbarPrincipal,
        navbarDownContactos,
        navbarSearchContactos
    },
    mounted(){
       // console.log(this.searchContactos.length)
        this.listarContactos();
    }
}
</script>