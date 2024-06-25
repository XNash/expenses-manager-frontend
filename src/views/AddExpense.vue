<script>
import axios from "axios";
import router from "@/routes/index.js";

const url = 'http://127.0.0.1:3000'

export default {
  name: "AddExpense",
  data() {
    return {
      newExpense: {
        name: '',
        amount: 0,
        date: new Date().toISOString().substr(0, 10),
        category: '',
        description: ''
      }
    }
  },
  methods: {
    async handleAddExpense() {
      try {
        await axios.post(`${url}/expenses`, this.newExpense);
        console.log("Expense added successfully");
        alert("Your expense has been added successfully");
        router.push("/list");
      } catch (error) {
        console.error("Error adding expense:", error.response ? error.response.data : error.message);
        alert("Failed to add expense. Please try again.");
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <h1>Add a new expense</h1>
    <form @submit.prevent="handleAddExpense">
      <input v-model="newExpense.name" type="text" class="input-group-text form-check-inline mb-3" style="width: 50%"
             placeholder="Expense name" required/>
      <input v-model.number="newExpense.amount" type="number" class="input-group-text form-check-inline mb-3" style="width: 50%"
             placeholder="Amount" required/>
      <input v-model="newExpense.date" type="date" class="input-group-text form-check-inline mb-3" required/>
      <input v-model="newExpense.category" type="text" class="input-group-text form-check-inline mb-3" style="width: 50%"
             placeholder="Category"/>
      <textarea v-model="newExpense.description" class="input-group-text form-check-inline mb-3" style="width: 50%"
                placeholder="Description"></textarea>

      <button type="submit" class="btn btn-success">Add expense</button>
    </form>
  </div>
</template>

<style scoped>
</style>