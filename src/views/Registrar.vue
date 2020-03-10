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
                <input type="text" class="form-control" placeholder="Nombre" v-model="nuevoUser.name" required>
                <input type="text" class="form-control" placeholder="Apellidos" v-model="nuevoUser.lastName" required>
                <input type="text" class="form-control" placeholder="Usuario" v-model="nuevoUser.userName" required>
                <input type="text" class="form-control" placeholder="Correo" v-model="nuevoUser.email" required>
                <input type="text" class="form-control" placeholder="Contraseña" v-model="nuevoUser.password" required>
               
                <button class="btn btn-success form-control">Registrar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "Registrar",
    data(){
        return{
            nuevoUser: {
                name: "",
                lastName: "",
                userName: "",
                email: "",
                password: ""
            },
            errores: [],
             color: 'success',
            dismissSecs: 5,
            dismissCountDown: 0
        }
    },
    methods:{
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
        this.dismissCountDown = this.dismissSecs
        },
        async registrar(){
            try {
                const data = await this.axios.post('/newUser', this.nuevoUser);
                //console.log(data) 
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