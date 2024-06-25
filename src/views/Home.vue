<script>
import router from "@/routes/index.js";

export default {
  name: "Home",
  data() {
    return {
      currentUser: {}
    }
  },
  methods: {

    setCurrentUser() {
      let user = localStorage.getItem("currentUser")
      user = JSON.parse(user)
      if(user == null){
        router.push("Login")
      }
      else {
        this.currentUser = user
      }
    }
  },
  beforeMount() {
    this.setCurrentUser()
  }
}

</script>

<template>
  <div class="container">
    <h1>Welcome, {{currentUser.name}}!</h1>
    <br><br>
    <h3>Keep your expenses under control with Nasshu's Expense manager!</h3><br>
    <router-link to="List" class="btn btn-primary">Get started</router-link>
  </div>
</template>

<style scoped>
  h1 {
    margin: auto;
  }
</style>