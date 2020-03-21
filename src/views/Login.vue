<template>
<div class="body">
    <div class="py-3 bg-danger" style="opacity: 0.8; border-radius: 12px;" v-if="errorL">
        <div>
            <h5 class="text-center" style="color: white">Correo o contraseña incorrecta</h5>
        </div>
    </div>
  <div class="d-flex justify-content-center">
        
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
  </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapActions} from 'vuex'

export default {
    name: 'Login',
    data(){
        return{
            title: "Login",
            errorL: false
        }
    },
    computed: {
        ...mapState(['form'])
    },
    methods:{
        ...mapActions(['auth']),
            async login (){
              try {
                const response = await axios.post('/login',this.form);
                if(response.data.ok){
                    //const storage =  await JSON.stringify(response.data)
                    localStorage.setItem('tk',response.data.tk);
                    localStorage.setItem('userID',response.data.userID);
                    this.$router.push('/notas')
                }
                
              } catch (error) {
                console.log(error.response);
                this.errorL = true
              }
                
        },
       
    },
    async beforeMount(){
        // const validate = await this.auth();
        // if(validate)
        // this.$router.push("/notas")
        // console.log(validate);
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