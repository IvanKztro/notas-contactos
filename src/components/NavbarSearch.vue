<template>
    <div>
        <div class="navbar navbar-light navbar-expand-lg" style="background-color: #e3f2fd;" > 
            <div class=" row col-lg-12  bg-">
                <div class="bg- col-lg-12 col-12">
                    <input v-model="message" type="text" class="form-control  mx- " placeholder="Buscar nota" >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
    name: "navbarSearch",
    data() {
        return {
            bus: ''
        }
    },
    computed: {
        ...mapState(['search','notas']),
        message: {
            get () {
                return this.search
            },
            set (value) {
                this.updateSearch(value)
            }
        }
    },
    methods: {
        ...mapMutations(['updateSearch'])
    },
}
</script>