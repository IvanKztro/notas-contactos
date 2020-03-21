<template>
    <div>
        <nav class="navbar navbar-light navbar-expand-lg d-flex justify-content-between" style="background-color: #e3f2fd;" > 
            
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#NavBar" >
                <span class="navbar-toggler-icon"></span>
            </button> 
            
            <!-- <input type="text" class="form-control" placeholder="Buscar nota" > -->
            
            <a class="navbar-brand bg-"><img alt="Vue logo" src="img/logo.png" style="height: 2.5rem"></a>
            <div id='NavBar' class="collapse navbar-collapse ">
                <!-- <input type="text" class="form-control col-lg-11 col-sm-12 bg-" placeholder="Buscar nota" > -->
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                    <router-link  class="nav-link" to="/notas">Notas<span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item active ">
                <router-link  class="nav-link" to="/contactos">Contactos<span class="badge badge-primary"></span></router-link>
                </li>

                <!-- <li class="nav-item active ">
                <router-link  class="nav-link" to="/contactos">Cerrar sesión</router-link>
                </li> -->
                
                </ul>
                <ul class="navbar-nav ">
                    <li @click="close" class="navbar-nav  active nav-link nav-text" >Cerrar sesión
                    </li>
                </ul>
               
                
            </div>
            
        </nav>
    </div>
</template>

<script>
export default {
    name: "navbarPrincipal",
    methods: {
        close(){
            localStorage.setItem('tk', '');
            localStorage.setItem('userID', '');
            this.$router.push("/");
        }
    },
}
</script>