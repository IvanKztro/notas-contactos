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
        <h3>Agregar nueva nota</h3>
        <form @submit.prevent="addNota()">
            <div class="form-group">
            <label for="inputTitulo" class="text-left">Titulo: </label>
            <input id="inputTitulo" type="text" class="form-control mb-4" placeholder="Ej: Comprar gas" v-model="item.titulo">
            <label for="">Descripción:</label>
            <!--<input type="text" class="form-control my-2">-->
            <textarea name="" id="" cols="30" rows="7" class="form-control mb-4" placeholder="" v-model="item.description"></textarea>
            <button class="btn btn-success btn-block my-2" type="">Agregar</button>
            </div>
        </form>
        
    </div>
</template>

<script>
export default {

     data(){
        return{
            notas:[],
            msj: {color: 'success', text: ''},
            dismissSecs: 5,
            dismissCountDown: 0,
            item: {titulo: '', description: '', byUser_Nota: localStorage.getItem('userID')}
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
    async addNota(){
        try {
            //console.log(this.item);}
            //headers: {'X-Custom-Header': 'foobar'}
            const nuevaNota = await this.axios.post('/newNota',this.item)
            
            this.notas.push(nuevaNota.data);
            this.item.titulo = '';
            this.item.description = '';
            this.msj.color = "success"
            this.msj.text = "Nota agregada"
            this.showAlert();
        } catch (error) {
            console.log(error.response)
            this.msj.color = "danger"
            //if(error.response.data.error.errors.name.message)
            this.msj.text = error.response.data.error.errors.name.message ? 'Titulo Obligatorio': ''
           // this.msj.text = "Error al agregar nota... "
            this.showAlert();
            
        }
        
        
    }

    }
}
</script>