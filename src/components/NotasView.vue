<template>
    <div class="" style="margin-top: 1%; margin-bottom: 4%">
        <div class=" container col-lg-12 col-12  pr-1 bg.danger "  v-for="(nota, index) in filterNotas" :key="index"  >
            <div class="d-flex justify-content-between  nota"  >
                <router-link class="col-lg-6 col-6 bg" :to="{name: 'EditNota', params:{_id: nota._id} }">
                    {{nota.titulo}}
                </router-link>
                <router-link class="col-lg-5 col-4 bg" style="font-size: 13px;" :to="{name: 'EditNota', params:{_id: nota._id} }">
                    {{localTime(nota.date)}}
                </router-link>
                <div class="col-lg-1 col-2 bg" >
                    <div class="d-flex">
                    <!-- <b-button class="btn-warning btn-sm mx-1" :to="{name: 'EditNota', params:{_id: nota._id} }" >A</b-button> -->
                    <b-button class="btn-danger btn-sm mx-1"  @click="deleteNota(nota._id)">x</b-button>
                    </div>
                </div>
                
            </div>
            <hr>
        </div>
        
    </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';
export default {
    name: "notasView",
    computed:{
        ...mapState(['notas','search']),
        filterNotas(state){
            const filtro = state.notas.filter(nota => {
                
                return nota.titulo.toLowerCase().includes(state.search.toLowerCase())
            })
            //console.log(filtro);
            return filtro;
                
            
        },
        message: {
            get () {
                return this.search
            },
            set (value) {
                this.filterNotas(value)
            }
        }
        
    },
    methods:{
        ...mapActions(['deleteNota']),
        ...mapMutations(['filterNotas2']),
        localTime(date) {
            const fecha = new Date(date);
            return fecha.toLocaleString()
        }
    }
}
</script>

