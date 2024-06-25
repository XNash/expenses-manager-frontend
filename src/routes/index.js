import {createRouter, createWebHistory} from "vue-router"
import Home from '@/views/Home.vue'
import List from "@/views/List.vue";
import AddExpense from "@/views/AddExpense.vue";
import EditExpense from "@/views/EditExpense.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import SendExpenseReport from "@/views/SendExpenseReport.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: '/list',
        name: "List",
        component: List,
    },
    {
        path: '/list/add',
        name: 'AddExpense',
        component: AddExpense
    },
    {
        path: '/list/edit/:id',
        name: 'EditExpense',
        component: EditExpense,
        props: true
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/send-report',
        name: 'SendExpenseReport',
        component: SendExpenseReport
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router