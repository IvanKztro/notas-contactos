<template>
    <div>
        <nav class="navbar navbar-light fixed-bottom" style="background-color: #e3f2fd;">
            <span>Notas: {{notas.length}}</span>sdsd
            <router-link class="btn btn-outline-success  my-2 my-sm-0 " to="/newNota">Nueva nota</router-link>
        </nav>
    </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
export default {
    name: "navbarDown",
    computed: {
        ...mapState(['notas'])
    }
}
</script>