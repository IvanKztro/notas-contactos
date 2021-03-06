import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

Vue.use(VueAxios, axios)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    form: { 
      email: 'prueba@gmail.com', 
      password: '1234567'
    },
    search: '',
    searchC: '',
    notas:[],
    contactos: [],
    searchContactos: [],
    msj: {color: 'success', text: ''},
    dismissSecs: 5,
    dismissCountDown: 0,
    item: {titulo: '', description: ''}
  },
  mutations: {
    filterNotas(state){
      //console.log("dsdsdsdsd")
      const filtro = state.notas.filter(nota => {
        return nota.titulo.toLowerCase().includes(state.search.toLowerCase())
      })
      //console.log(filtro)
      return filtro;
    },
    updateSearch (state, text) {
      state.search = text
    },
    updateSearchC (state, text) {
      state.searchC = text
    }
    
  },
  actions: {
    listarNotas: async(context) => {
                                                 //{tk: localStorage.getItem('tk')}
      const us = localStorage.getItem('userID');
     // console.log(us)
      const data = await axios.post('/notas', {userID: us });
      //console.log(data)
      context.state.notas = data.data;
     // console.log(context.state.notas)
    },
     listarContactos: async (context) => {
      
      const byUser = localStorage.getItem('userID');
      try {
          const contactos = await axios.post('/contactos', {byUser_contacto: byUser});
          context.state.contactos = contactos.data;
      } catch (error) {
          console.log(error.response)
      }
      

  },
    countDownChanged(context, dismissCountDown) {
      context.state.dismissCountDown = dismissCountDown
    },
    showAlert() {
      context.state.dismissCountDown = context.state.dismissSecs
    },
    addNota: async(context) => {
        try {
            //console.log(this.item);
            const nuevaNota = await axios.post('/newNota',context.state.item)
            //console.log(nuevaNota.data);
            context.context.state.notas.push(nuevaNota.data);
            context.context.state.item.titulo = '';
            context.context.state.item.description = '';
            context.context.state.msj.color = "success"
            context.context.state.msj.text = "Nota agregada"
            context.context.dispatch.showAlert();
        } catch (error) {
            //console.log(error.response)
            context.state.msj.color = "danger"
            //if(error.response.data.error.errors.name.message)
            context.state.msj.text = error.response.data.error.errors.name.message ? 'Titulo Obligatorio': ''
           // this.msj.text = "Error al agregar nota... "
            context.dispatch.showAlert();
            
        }
    },
    deleteNota: async(context, _id) => {
        //this.axios.delete('/deleteNota/_id')
        const response = await axios.delete(`/deleteNota/${_id}`)
       // console.log(response);
        const index = context.state.notas.findIndex(item => item._id === response.data.response._id)
        context.state.notas.splice(index,1);

        context.state.msj.color = "success";
        context.state.msj.text= response.data.msj

    },
    auth: async()=>{
      
      try {
        const response = await axios.post('/auth', {tk: localStorage.getItem('tk')} );
        //console.log(response)
        //router.push('/login')
        if(!response.data.ok){
          return response.data.ok
        }else{
          return response.data.ok
        }
        //localStorage.setItem('tk',response.data.tk);
      } catch (error) {
        console.log(error.response);
        return error.response.data.ok
      }
        
    }

  },
  modules: {
  }
})
