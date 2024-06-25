<script>
import router from "@/routes/index.js";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      loginCredentials: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://127.0.0.1:3000/login", this.loginCredentials);
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("currentUser", JSON.stringify(user));

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        router.push("List");
      } catch (error) {
        alert("Identifiants invalides");
      }
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h1>Log in to an account to access your expenses data</h1>
      <br><br><br>
      <form @submit.prevent="login">
        <input v-model="loginCredentials.email" class="input-group-text form-check-inline mb-3" placeholder="Enter your email here" maxlength="100" type="email" required/>
        <input v-model="loginCredentials.password" class="input-group-text form-check-inline mb-3" placeholder="Enter your password here" minlength="8" maxlength="100" type="password" required/>
        <button type="submit" class="btn btn-success">Login</button><br>
        <router-link to="Register">register</router-link>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>