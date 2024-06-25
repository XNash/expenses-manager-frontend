<script>
import axios from 'axios'
import router from "@/routes/index.js";
const url = 'http://127.0.0.1:3000'

export default {
  data() {
    return {
      searchText: '',
      expenses: [],
      currentUser: null
    }
  },
  methods: {
    async getAllExpenses() {
      try {
        const res = await axios.get(`${url}/expenses`);
        console.log("getting all expenses...")
        this.expenses = res.data.filter(expense => expense.userId === this.currentUser.id);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        if (error.response && error.response.status === 401) {
          this.handleUnauthorized();
        }
      }
    },
    async handleDeleteExpense(id) {
      try {
        await axios.delete(`${url}/expenses/${id}`);
        console.log("expense deleted successfully");
        this.getAllExpenses();
      } catch (error) {
        console.error("Error deleting expense:", error);
        if (error.response && error.response.status === 401) {
          this.handleUnauthorized();
        }
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
  beforeMount() {
    this.setCurrentUser();
    this.getAllExpenses();
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10">
        <h1 class="mb-lg-5">List of expenses</h1>
        <div style="border: rgba(0,0,0,0.07) 2px solid">
          <table class="table table-responsive-lg table-striped border-1">
            <thead>
            <tr>
              <td>Name</td>
              <td>Amount</td>
              <td>Date</td>
              <td>Category</td>
              <td>Actions</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="expense in expenses" :key="expense.id">
              <td>{{ expense.name }}</td>
              <td>{{ expense.amount }} MGA</td>
              <td>{{ expense.date }}</td>
              <td>{{ expense.category }}</td>
              <td>
                <router-link :to="{name: 'EditExpense', params: {id: expense.id}}" class="btn btn-sm btn-primary">Edit</router-link>
                <button class="btn btn-sm btn-danger" style="margin-left: 2px;" @click="handleDeleteExpense(expense.id)">Delete</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-2">
        <h3 style="margin-top: 10px; margin-left: 40px;">Options</h3>
        <div class="row mt-3">
          <input v-model="searchText" type="text" class="input-group-text form-check-inline mb-2" style="width: 100%" placeholder="Search name..."/>
          <router-link to="/list/add" class="btn btn-success mb-md-2">Add expense</router-link>
          <router-link to="/send-report" class="btn btn-info">Send Expense Report</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  color: white;
}
</style>