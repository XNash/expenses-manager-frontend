<script>
import axios from "axios";
import router from "@/routes/index.js";

export default {
  name: "UserProfile",
  data() {
    return {
      user: {
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    async getUserProfile() {
      try {
        const response = await axios.get('http://127.0.0.1:3000/user-profile');
        this.user.name = response.data.name;
        this.user.email = response.data.email;
      } catch (error) {
        console.error("Error fetching user profile:", error);
        this.errorMessage = "Failed to fetch user profile.";
      }
    },
    async updateUserProfile() {
      if (this.user.newPassword !== this.user.confirmNewPassword) {
        this.errorMessage = "New passwords do not match.";
        return;
      }

      try {
        const payload = {
          name: this.user.name,
          email: this.user.email,
          currentPassword: this.user.currentPassword,
          newPassword: this.user.newPassword || undefined
        };

        await axios.put('http://127.0.0.1:3000/user-profile', payload);
        this.successMessage = "Profile updated successfully";
        this.errorMessage = '';
        this.user.currentPassword = '';
        this.user.newPassword = '';
        this.user.confirmNewPassword = '';

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        currentUser.name = this.user.name;
        currentUser.email = this.user.email;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

      } catch (error) {
        console.error("Error updating user profile:", error);
        this.errorMessage = error.response?.data?.error || "Failed to update profile. Please try again.";
        this.successMessage = '';
      }
    },
    setCurrentUser() {
      let user = localStorage.getItem("currentUser");
      this.currentUser = JSON.parse(user);
      if (this.currentUser == null) {
        this.handleUnauthorized();
      }
    },
    handleUnauthorized() {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      router.push("/login");
    }
  },
  mounted() {
    this.setCurrentUser();
    this.getUserProfile();
  }
}
</script>

<template>
  <div class="container">
    <h1>Edit Profile</h1>
    <form @submit.prevent="updateUserProfile">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input v-model="user.name" type="text" class="form-control" id="name" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input v-model="user.email" type="email" class="form-control" id="email" required>
      </div>
      <div class="mb-3">
        <label for="currentPassword" class="form-label">Current Password</label>
        <input v-model="user.currentPassword" type="password" class="form-control" id="currentPassword" required>
      </div>
      <div class="mb-3">
        <label for="newPassword" class="form-label">New Password (leave blank to keep current)</label>
        <input v-model="user.newPassword" type="password" class="form-control" id="newPassword">
      </div>
      <div class="mb-3">
        <label for="confirmNewPassword" class="form-label">Confirm New Password</label>
        <input v-model="user.confirmNewPassword" type="password" class="form-control" id="confirmNewPassword">
      </div>

      <button type="submit" class="btn btn-primary">Update Profile</button>
    </form>

    <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
    <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
  </div>
</template>

<style scoped>
</style>