<template>
    <div class="d-flex justify-content-center align-items-center body">
        <div class="col-lg-6">
            <b-alert
            class=""
            :show="dismissCountDown"
            dismissible
            :variant="color"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            <div v-for="(e, index) in errores" :key="index">
                <p>-{{e.error}}... {{dismissCountDown}}</p>
            </div>
            </b-alert>
            
            <form @submit.prevent="registrar()" class="register-box ">
                <h3 class="text-center pt-4 bg-success" style="color:white">REGISTRO</h3>

                <div class="form-group pt-2  mt-4 formLogin justify-content-center align-items-center px-4 mx-4">
                    <div :class="{'form-group--error': $v.nuevoUser.name.$error}">
                        <input type="text" class=" form-control" @change="setName($event.target.value)"
                        placeholder="Nombre"  v-model.trim="$v.nuevoUser.name.$model"  >
                    </div>
                    <div class="error" v-if="!$v.nuevoUser.name.minLength">Nombre: minimo {{$v.nuevoUser.name.$params.minLength.min}} letras requeridas.</div>
                    <div class="error" v-if="!$v.nuevoUser.name.required">Nombre requerido</div>
                

                    <div :class="{'form-group--error': $v.nuevoUser.lastName.$error}">
                        <input type="text" class=" form-control" @change="setLastName($event.target.value)"
                        placeholder="Apellidos" v-model.trim="nuevoUser.lastName"   >
                    </div>
                    <div class="error" v-if="!$v.nuevoUser.lastName.required">Apellidos requeridos</div>

                     

                    <div :class="{'form-group--error': $v.nuevoUser.userName.$error}">
                        <input type="text" class=" form-control" @change="setUserName($event.target.value)"
                        placeholder="Usuario" v-model.trim="nuevoUser.userName"   >
                    </div>
                    <div class="error" v-if="!$v.nuevoUser.userName.minLength">Usuario: minimo {{$v.nuevoUser.userName.$params.minLength.min}} letras requeridas.</div>
                    <div class="error" v-if="!$v.nuevoUser.userName.required">Usuario requerido</div>

                    <div :class="{'form-group--error': $v.nuevoUser.email.$error}">
                        <input type="text" class=" form-control" @change="setEmail($event.target.value)"
                        placeholder="Email" v-model.trim="nuevoUser.email"   >
                    </div>
                    <div class="error" v-if="!$v.nuevoUser.email.required">Email requerido</div>
                    <div class="error" v-if="!$v.nuevoUser.email.email">Email No válido</div>
                    
                    <div :class="{'form-group--error': $v.nuevoUser.password.$error}">
                        <input type="password" class=" form-control" @change="setPassword($event.target.value)"
                        placeholder="Contraseña" v-model.trim="nuevoUser.password"  >
                    </div>
                    <div class="error" v-if="!$v.nuevoUser.password.required">Contraseña requerido</div>
                    <div class="error" v-if="!$v.nuevoUser.password.minLength">Contraseña: minimo {{$v.nuevoUser.password.$params.minLength.min}} caracteres requeridas.</div>

                    <div :class="{'form-group--error': $v.nuevoUser.repeatPassword.$error}">
                        <input type="password" class=" form-control" 
                        placeholder="Repetir contraseña" v-model.trim="$v.nuevoUser.repeatPassword.$model"   >
                    </div>
                    <div class="error" v-if="!$v.nuevoUser.repeatPassword.sameAsPassword">contraseñas no son iguales</div> 
               
               
                
                
               
                <button class="btn btn-success form-control">Registrar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import {required, minLength, maxLength, between, email, sameAs} from 'vuelidate/lib/validators'


export default {
    name: "Registrar",
    data(){
        return{
            nuevoUser: {
                name: "",
                lastName: "",
                userName: "",
                email: "",
                password: "",
                repeatPassword: '',
            },
            nuevoUserENV: {
                name: "",
                lastName: "",
                userName: "",
                email: "",
                password: ""
                // name: this.nuevoUser.name,
                // lastName: this.nuevoUser.lastName,
                // userName: this.nuevoUser.userName,
                // email: this.nuevoUser.email,
                // password: this.nuevoUser.password
            },
            errores: [],
             color: 'success',
            dismissSecs: 5,
            dismissCountDown: 0
        }
    },
    validations:{
        nuevoUser:{
                name:{ required, minLength: minLength(3)},
                lastName:{required},
                userName: {required, minLength: minLength(6)},
                email: {required, email},
                password: {required, minLength: minLength(7)},
                repeatPassword: { sameAsPassword: sameAs('password')}
        },

         
        
    },
    methods:{
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
        this.dismissCountDown = this.dismissSecs
        },
         setName(value) {
             this.nuevoUserENV.name = value
             this.$v.nuevoUser.name.$touch()
         },
         setLastName(value) {
             this.nuevoUserENV.lastName = value
             this.$v.nuevoUser.lastName.$touch()
         },
         setUserName(value) {
             this.nuevoUserENV.userName = value
             this.$v.nuevoUser.userName.$touch()
         },
         setEmail(value) {
             this.nuevoUserENV.email = value
             this.$v.nuevoUser.email.$touch()
         },
         setPassword(value) {
             this.nuevoUserENV.password = value
             this.$v.nuevoUser.password.$touch()
         },
        async registrar(){

        if (this.$v.$invalid) {
        console.log("errorres");
        console.log(this.$v);
        alert("complete el formulario");
        return;
        }
        
            try {
                const data = await this.axios.post('/newUser', this.nuevoUserENV);
                this.$router.push("/login");
                console.log(data) 
                alert("Datos enviados");
            } catch (error) {   
                //console.log( error.response.data.error.keyValue)
                this.errores= [];
                this.color = "danger"
                const e = error.response.data.error.keyValue
                for (let clave in e){
                        //console.log(e[clave])
                        this.errores.push({error: `${e[clave]} ya existe en el sistema`})
                }
                this.showAlert();
                
               
            }
            
        }
    }
}
</script>

<style>
    .error{
        color: #FA5858;
    }
</style>