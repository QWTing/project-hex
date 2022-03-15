import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [

  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: 'home',
        component: HomeView,
      },
      {
        path: 'products',
        component: () => import('../views/FrontView/ProductsView.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/FrontView/CartView.vue'),
      },
      {
        path: '/login',
        component: () => import('../views/Dashboard/LoginView.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'backproducts',
        component: () => import('../views/Dashboard/Back-Product.vue'),
      },
      {
        path: 'backorders',
        component: () => import('../views/Dashboard/BackOrders.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
