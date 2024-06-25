<script>
import axios from "axios";
import router from "@/routes/index.js";

export default {
  name: "EditExpense",
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      expense: {
        id: '',
        name: '',
        amount: 0,
        date: '',
        category: '',
        description: ''
      }
    }
  },
  methods: {
    async getTargetedExpense() {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/expenses/${this.id}`);
        this.expense = response.data;
      } catch (error) {
        console.error("Error fetching expense:", error);
        alert("Failed to fetch expense details.");
      }
    },
    async updateTargetExpense() {
      try {
        await axios.put(`http://127.0.0.1:3000/expenses/${this.id}`, this.expense);
        alert("Expense updated successfully");
        router.push("/list");
      } catch (error) {
        console.error("Error updating expense:", error);
        alert("Failed to update expense. Please try again.");
      }
    }
  },
  beforeMount() {
    this.getTargetedExpense();
  }
}
</script>

<template>
  <div class="container">
    <h1>Edit an expense</h1>
    <form @submit.prevent="updateTargetExpense">
      <input v-model="expense.name" type="text" class="input-group-text form-check-inline mb-3" style="width: 50%"
             placeholder="Expense name" required/>
      <input v-model.number="expense.amount" type="number" class="input-group-text form-check-inline mb-3"
             style="width: 50%" placeholder="Amount" required/>
      <input v-model="expense.date" type="date" class="input-group-text form-check-inline mb-3"
             required/>
      <input v-model="expense.category" type="text" class="input-group-text form-check-inline mb-3" style="width: 50%"
             placeholder="Category"/>
      <textarea v-model="expense.description" class="input-group-text form-check-inline mb-3" style="width: 50%"
                placeholder="Description"></textarea>

      <button type="submit" class="btn btn-success">Save changes</button>
    </form>
  </div>
</template>

<style scoped>
</style>