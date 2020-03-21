<template>
    <div>
        <b-alert
        :show="dismissCountDown"
        dismissible
        :variant="msj.color"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged">
        {{msj.text}} {{dismissCountDown}}
        </b-alert>
        <h3>Nuevo contacto</h3>
        <form @submit.prevent="addContactos()">
            <div class="form-group">
            <label for="inputTitulo" class="text-left">Nombre: </label>
            <input id="inputTitulo" type="text" class="form-control mb-4" placeholder="Ej: Jose " v-model="contacto.name">
             <!-- contacto: {name: '', lastName: '', number: '', email: ''}, -->
            <label for="" class="text-left">Apellidos: </label>
            <input id="" type="text" class="form-control mb-4" placeholder="Ej: Garcia " v-model="contacto.lastName">

            <label for="" class="text-left">Numero: </label>
            <input id="" type="text" class="form-control mb-4" placeholder="Ej: 2442334454" v-model="contacto.number">

            <label for="" class="text-left">Email: </label>
            <input id="" type="text" class="form-control mb-4" placeholder="Ej: example@gmail.com " v-model="contacto.email">
            <button class="btn btn-success btn-block my-2" type="">Agregar</button>
            </div>
        </form>
        
    </div>
</template>

<script>
export default {

     data(){
        return{
            
            msj: {color: 'success', text: ''},
            dismissSecs: 5,
            dismissCountDown: 0,
            contacto: {
                name: '', 
                lastName: '', 
                number: '', 
                email: '', 
                byUser_contacto: localStorage.getItem('userID')
                }
           
        }
    },
    computed:{
        //...mapState(['notas'])
    },
    methods:{
        //...mapActions(['listarNotas'])
    
    
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    async addContactos(){
        try {
            //console.log(this.item);}
            //headers: {'X-Custom-Header': 'foobar'}
            const nuevaNota = await this.axios.post('/newContacto',this.contacto)
            
            //this.notas.push(nuevaNota.data);
            // this.item.titulo = '';
            // this.item.description = '';
            //contacto: {name: '', lastName: '', number: '', email: ''},
            this.contacto.name = "";
            this.contacto.lastName = "";
            this.contacto.number = "";
            this.contacto.email = "";
            this.msj.color = "success"
            this.msj.text = "Contacto agregado"
            this.showAlert();
        } catch (error) {
            console.log(error.response)
            this.msj.color = "danger"
            //if(error.response.data.error.errors.name.message)
            this.msj.text = error.response.statusText ? 'Titulo Obligatorio': ''
           // this.msj.text = "Error al agregar nota... "
            this.showAlert();
            
        }
        
        
    }

    }
}
</script>