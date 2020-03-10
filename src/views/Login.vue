<template>
  <div class="d-flex justify-content-center bg-success body ">

        <div class="col-lg-4 login-box">
            <img src="@/assets/logo.png" class="img-logo" alt="">
            <form @submit.prevent="login()">
                <div class="form-group pt-5 mt-4 formLogin">
                    <label>Correo:</label>
                    <input class="form-control " type="text"  v-model="form.email">
                    <label>Contraseña:</label>
                    <input class="form-control " type="password" v-model="form.password">
                     <button class="btn btn-success form-control mb-4 mt-3 " >Acceder</button>
                    <router-link  class="a-login nav-link" to="/registrar">Registrarse</router-link>
                </div>
                <!-- <div>
                    {{form.email}} --- {{form.password}}
                </div> -->
                
            </form>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {
    name: 'Login',
    data(){
        return{
            title: "Login"
        }
    },
    computed: {
        ...mapState(['form'])
    },
    methods:{
          async login(){
              try {
                const response = await axios.post('/login',this.form);
                if(response.data.ok){
                    localStorage.setItem('tk',response.data.tk);
                    this.$router.push('/notas')
                }
                
              } catch (error) {
                console.log(error.response);
              }
                
        },
       
    }
   /* methods:{
        async registrar(){
            console.log(this.nuevoUser)
            const response = await this.axios.post('/newUser', this.nuevoUser);
            console.log(data)
        }
    }*/
}
</script>