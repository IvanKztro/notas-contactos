<template>
    <div>
        <nav class="navbar navbar-light fixed-bottom" style="background-color: #e3f2fd;">
            <span>Contatos: {{contactos.length}}</span>
            <router-link class="btn btn-outline-success  my-2 my-sm-0 " to="/newContacto">Nuevo</router-link>
        </nav>
    </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
export default {
    name: "navbarDown",
    computed: {
        ...mapState(['contactos'])
    }
}
</script>