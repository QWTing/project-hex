<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light me-3">
    <div class="container-fluid">
      <router-link
        to="/home"
        class="navbar-brand"
      >
        Front-End
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        id="navbarNav"
        class="collapse navbar-collapse "
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              to="/home"
              class="nav-link"
            >
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/products"
              class="nav-link"
            >
              Products
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/cart"
              class="nav-link"
            >
              Cart
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/admin"
              class="nav-link"
            >
              Dashboard
            </router-link>
          </li>
        </ul>
      </div>
      <div class="d-flex">
        <router-link
          to="/cart"
          class="btn btn-primary position-relative"
        >
          結帳

          <span
            class="position-absolute top-0 start-100 translate-middle
          badge rounded-pill bg-danger"
          >
            {{ carts?.carts?.length }}
            <span class="visually-hidden">unread messages</span>
          </span>
        </router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
import emitter from '@/lib/emitter';

export default {
  data() {
    return {
      carts: {},
    };
  },
  mounted() {
    this.getCart();
    emitter.on('get-cart', () => {
      this.getCart();
    });
  },
  methods: {
    getCart() {
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.carts = res.data.data;
        }).catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
