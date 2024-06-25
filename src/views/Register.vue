<script>
import axios from "axios";
import router from "@/routes/index.js";

const url = 'http://127.0.0.1:3000'

export default {
  name: "Register",
  data() {
    return {
      newUser: {name: '', email: '', password: ''}
    }
  },
  methods: {
    async handleRegister() {
      try {
        const response = await axios.post(`${url}/register`, this.newUser);
        console.log("User registered successfully");
        alert("Your account has been created successfully");

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        router.push("/");
      } catch (error) {
        console.error("Registration error:", error.response ? error.response.data : error.message);
        alert("Registration failed. Please try again.");
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <h1>Create an account</h1>
    <form @submit.prevent="handleRegister">
      <input v-model="newUser.name" type="text" class="input-group-text form-check-inline mb-3" style="width: 50%"
             placeholder="Enter your name" required/>
      <input v-model="newUser.email" type="email" class="input-group-text form-check-inline mb-3" style="width: 50%"
             placeholder="Your email" required/>
      <input v-model="newUser.password" type="password" class="input-group-text form-check-inline mb-3" style="width: 50%"
             placeholder="Your password" required/>

      <button type="submit" class="btn btn-success">Create account</button>
    </form>
    <p>Already have an account? <router-link to="/login">Login here</router-link></p>
  </div>
</template>

<style scoped>
</style>