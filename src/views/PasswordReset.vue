<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="mb-4">Reset Password</h2>
        <form @submit.prevent="requestReset">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" v-model="email" required>
          </div>
          <button type="submit" class="btn btn-primary">Request Password Reset</button>
          <router-link to="Login" class="btn btn-success" style="margin-left: 15px;">Login page</router-link>
        </form>
        <div v-if="message" class="alert" :class="{'alert-success': !error, 'alert-danger': error}" role="alert">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      message: '',
      error: false
    }
  },
  methods: {
    async requestReset() {
      try {
        const response = await axios.post('http://127.0.0.1:3000/forgot-password', { email: this.email });
        this.message = 'If an account with that email exists, we have sent a new password.';
        this.error = false;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.message = 'No account found with that email address.';
        } else {
          this.message = 'An error occurred. Please try again.';
        }
        this.error = true;
        console.error('Error requesting password reset:', error);
      }
    }
  }
}
</script>