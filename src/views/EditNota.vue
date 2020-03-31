<template>
    <div class="container col-lg-6 content-aling-center px-3">
        <!-- <h4 class="text-center">{{fecha}}</h4> -->
        <h4 class="text-center">{{nota.date}}</h4>
        <input type="text" class="form-control my-2 " v-model="nota.titulo">
        <textarea name="" id="" cols="30" rows="18" class="form-control my-2 " v-model="nota.description"></textarea>
        <button class="btn btn-success my-2 form-control" @click="modify()">Guardar</button>
    </div>
</template>

<script>
import router from "@/router/index.js"
export default {
    data(){
        return{
            nota:{titulo: '', description: '', date:  {type: Date}},
            _id: '',
            fecha: 0
        }
    },
    methods:{
        async modify(){
            this.nota.date = await new Date();
            //console.log(this.nota.date.Date)
            const response = await this.axios.put(`/modifyNota/${this._id}`,this.nota)
            //console.log(response)
            this.nota.date = await new Date().toLocaleString();
            this.$router.push("/notas");
        }
    },
   async mounted() {
        const id = router.currentRoute.params._id;
        this._id= id;
        const response = await this.axios.get(`/nota/${id}`);
        //console.log(response);
        this.nota.titulo = response.data.titulo;
        this.nota.description = response.data.description;
        const fecha = new Date(response.data.date);
        this.nota.date = fecha.toLocaleString();
        
        
    },
}
</script>