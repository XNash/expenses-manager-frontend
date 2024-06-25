<template>
  <div class="container">
    <h1>Send Expense Report</h1>
    <form @submit.prevent="sendReport">
      <div class="form-group">
        <label for="email">Email address:</label>
        <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            required
        >
      </div>
      <div class="form-group">
        <label for="startDate">Start Date:</label>
        <input
            type="date"
            class="form-control"
            id="startDate"
            v-model="startDate"
            required
        >
      </div>
      <div class="form-group">
        <label for="endDate">End Date:</label>
        <input
            type="date"
            class="form-control"
            id="endDate"
            v-model="endDate"
            required
        >
      </div>
      <button type="submit" class="btn btn-primary">Send Report</button>
    </form>
    <div v-if="message" class="alert" :class="{'alert-success': !error, 'alert-danger': error}" role="alert">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SendExpenseReport',
  data() {
    return {
      email: '',
      startDate: '',
      endDate: '',
      message: '',
      error: false
    }
  },
  methods: {
    async sendReport() {
      try {
        const response = await axios.post('http://localhost:3000/send-expense-report', {
          email: this.email,
          startDate: this.startDate,
          endDate: this.endDate
        });
        this.message = 'Report sent successfully!';
        this.error = false;
      } catch (error) {
        console.error('Error sending report:', error);
        this.message = 'Failed to send report. Please try again.';
        this.error = true;
      }
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>