import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/pages/Login";
import Dashboard from "@/components/dashboard";
import Products from "@/components/pages/products";
import Order from "@/components/pages/order";
import coupon from "@/components/pages/coupon";
import simulateOrder from "@/components/pages/simulateOrder";
import simulateOrderout from "@/components/pages/simulateOrderout";
import Homedashboard from "../components/pages/Homedashboard";
import home from "../components/pages/home";
import productOrder from "../components/pages/productOrder";
import product from "../components/pages/product";
import CustomerOrder from "../components/pages/CustomerOrder";
import OrderOut from "../components/pages/OrderOut";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "home"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    // admin
    {
      path: "/admin",
      name: "admin",
      component: Dashboard,
      children: [
        {
          path: "products",
          name: "products",
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: "order",
          name: "Order",
          component: Order,
          meta: { requiresAuth: true }
        },
        {
          path: "coupon",
          name: "coupon",
          component: coupon,
          meta: { requiresAuth: true }
        },
        {
          path: "simulate_order",
          name: "simulateOrder",
          component: simulateOrder
        },
        {
          path: "simulate_orderout/:orderId",
          name: "simulateOrderout",
          component: simulateOrderout
        }
      ]
    },
    // 
    {
      path: "/",
      name: "Homedashboard",
      component: Homedashboard,
      children: [
        {
          path: "/home",
          name: "Home",
          component: home
        },
        {
          path:'productOrder',
          name:'productOrder',
          component:productOrder
        },
        {
          path:'product/:id',
          name:'product',
          component:product
        },
        {
          path: "customerorder",
          name: "CustomerOrder",
          component: CustomerOrder
        },
        {
          path: "orderout/:orderId",
          name: "orderout",
          component: OrderOut
        },
      ]
    },
  ]
});
