<script>
import router from "@/routes/index.js";
import axios from 'axios';

export default {
  data() {
    return {
      currentUser: null
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      this.currentUser = null;
      delete axios.defaults.headers.common['Authorization'];
      router.push("/login");
    },
    setCurrentUser() {
      const userStr = localStorage.getItem("currentUser");
      const token = localStorage.getItem("token");

      if (userStr && token) {
        this.currentUser = JSON.parse(userStr);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        this.currentUser = null;
        router.push("Login");
      }
    },
    async validateToken() {
      try {
        await axios.get('http://127.0.0.1:3000/validate-token');
      } catch (error) {
        console.error('Token invalid:', error);
        this.logout();
      }
    },
    async login(credentials) {
      try {
        const response = await axios.post('http://127.0.0.1:3000/login', credentials);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        this.setCurrentUser();
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    }
  },
  async beforeMount() {
    this.setCurrentUser();
    if (this.currentUser) {
      await this.validateToken();
    }
    console.log(this.currentUser);
  }
}
</script>

<template>
  <div class="navbar navbar-expand-lg bg-black" style="padding-left: 5px; padding-right: 5px;">
    <div class="col-10">
      <div class="row p-3" style="width: 200px; border: #0a53be 1px solid">
        <router-link to="/" class="nav-link col" style="color: white; width: 20px; border: #0a53be 1px solid;">Home
        </router-link>
        <router-link to="/list" class="nav-link col"
                     style="color: white; width: 20px; margin-left: 10px; border: #0a53be 1px solid;">Expenses
        </router-link>

      </div>
    </div>
    <div class="col-2">
      <div class="card" style="height: 50px">
        <div class="card-body p-1 row">
          <div class="col-8 p-2" style="margin-left: 5px; text-align: center;">
            <router-link to="/profile" class="nav-link" style="font-weight: bold; font-size: 18px">My Profile</router-link>
          </div>
          <div class="col-2">
            <button @click="logout" class="btn-primary" style="margin-top: 5px;"><img src="./assets/log-out.png" alt="logout image" height="20"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <router-view></router-view>
  </div>
</template>