<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
let token = ref(localStorage.getItem("token"));
function logout() {
  token = ""
  localStorage.removeItem("token");
  router.push({name: "Login"})
}
</script>

<template>
  <nav class="navbar w-100">
    <div class="container-fluid">
      <router-link class="btn btn-nav pe-5" to="/" tag="button">
        <div class="logo">
          <img class="ms-3 me-2" src="../../img/lamaaaaaaa.png" />
          La Tambouille
        </div>
      </router-link>
      <form class="d-flex" role="search">
        <router-link class="btn btn-nav pe-5" to="/" tag="button">Accueil</router-link>
        <router-link v-if="token" class="btn btn-nav pe-5" to="/form-add" tag="button">Créer un article</router-link>
        <router-link v-if="!token" class="btn btn-nav pe-5" to="/login" tag="button">Login</router-link>
        <button v-else class="btn btn-nav pe-5" @click="logout" tag="button">Logout</button>
      </form>
    </div>
  </nav>
</template>
