<template>
    <div class="container col-lg-6 content-aling-center px-3 container">
        <label for="" class="mt-4">Nombre:</label>
        <input type="text" class="form-control mb-4 " v-model="contacto.name" placeholder="Nombre">
        <label for="">Apellidos:</label>
        <input type="text" class="form-control mb-4 " v-model="contacto.lastName" placeholder="Apellido">
        <label for="">Numero:</label>
        <input type="text" class="form-control mb-4 " v-model="contacto.number" placeholder="Numero">
        <label for="">Correo:</label>
        <input type="text" class="form-control mb-4 " v-model="contacto.email" placeholder="Correo">
        <button class="btn btn-success my-2 form-control" @click="modify()">Guardar</button>
    </div>
</template>

<script>
import router from "@/router/index.js"
export default {
    data(){
        return{
            contacto:{name: '', lastName: '', number: '', email:'', byUser_contacto: localStorage.getItem('userID')},
            _id: '',
            fecha: 0
        }
    },
    methods:{
        async modify(){
            
            const response = await this.axios.put(`/modifyContacto/${this._id}`,this.contacto)
            this.$router.push('/contactos')
        }
    },
   async mounted() {
        const id = router.currentRoute.params._id;
        this._id= id;
        const response = await this.axios.get(`/contacto/${id}`);
        this.contacto.name = response.data.name;
        this.contacto.lastName = response.data.lastName;
        this.contacto.number = response.data.number;
        this.contacto.email = response.data.email;
    },
}
</script>