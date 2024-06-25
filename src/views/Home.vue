<script>
import router from "@/routes/index.js";

export default {
  name: "Home",
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
    <h1>Home page</h1>
  </div>
</template>

<style scoped>

</style>