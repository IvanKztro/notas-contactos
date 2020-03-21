<template>
    <div>
        <div class="navbar navbar-light navbar-expand-lg" style="background-color: #e3f2fd;" > 
            <div class=" row col-lg-12  bg-">
                <div class="bg- col-lg-12 col-12">
                    <input v-model="setterSeachC" type="text" class="form-control  mx- " placeholder="Buscar contacto" >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
    name: "navbarSearchContactos",
    data() {
        return {
            bus: ''
        }
    },
    computed: {
        ...mapState(['searchC']),
        setterSeachC: {
            get () {
                return this.searchC
            },
            set (value) {
                this.updateSearchC(value)
            }
        }
    },
    methods: {
        ...mapMutations(['updateSearchC'])
    },
}
</script>