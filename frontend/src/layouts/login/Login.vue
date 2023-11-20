<script setup>
import {api} from "@/services/api";

const apiService = new api();

async function login() {
  try {
    apiService.login(document.getElementById("Username").value, document.getElementById("Password").value)
        .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        window.location.href = '/';
      });
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div id="login" class="container">
    <div class="col-4 mx-auto mt-5">
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Username</span>
        <input
          id="Username"
          type="text"
          class="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
    </div>
    <div class="col-4 mx-auto mt-3">
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Password</span>
        <input
          id="Password"
          type="password"
          class="form-control"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
        />
      </div>
    </div>
    <button
      class="col-4 mt-4 mx-auto d-block btn btn-primary"
      @click="login()"
      type="submit"
    >
      Login
    </button>
  </div>
</template>

<style>
  #login {
    margin: 100px auto;
  }
</style>
