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

        this.$root.$emit('user-logged-in', response.data.user);

        router.push("/");
      } catch (error) {
        alert("Invalid credentials");
      }
    }
  }
}
</script>

<template>
  <br><br>
  <div class="cont">
    <h1>Log in to an account <br>to access your expenses data</h1>
    <div class="card ctr" style="margin-left: 5em;">
      <div class="card-body">
        <br>
        <form @submit.prevent="login">
          <input v-model="loginCredentials.email" class="input-group-text form-check-inline mb-3" placeholder="Enter your email here" maxlength="100" type="email" required/>
          <input v-model="loginCredentials.password" class="input-group-text form-check-inline mb-3" placeholder="Enter your password here/" minlength="8" maxlength="100" type="password" required/><br>
          <button type="submit" class="btn btn-success">Login</button><br><br>
          <router-link to="Register">Create an account</router-link>
          <router-link to="/reset-password" style="margin-left: 10px;">Forgot your password?</router-link><br><br>

        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cont {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ctr {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

input {
  margin: auto;
}

button {
  position: absolute;
  margin-left: 7em;
}
</style>