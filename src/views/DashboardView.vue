<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light me-3">
    <div class="container-fluid">
      <router-link
        to="/home"
        class="navbar-brand"
      >
        Back-End
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
              to="/products"
              class="nav-link"
            >
              Front
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/admin/backproducts"
              class="nav-link"
            >
              Products
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/admin/backorders"
              class="nav-link"
            >
              Orders
            </router-link>
          </li>
          <li class="nav-item ">
            <a
              href="#"
              class="nav-link"
              @click.prevent="logout"
            >Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>
<script>
export default {
  data() {
    return {
      token: '',
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      // eslint-disable-next-line no-useless-escape
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = `${this.token}`;
      this.$http.post(`${process.env.VUE_APP_API}api/user/check`)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
        }).catch((err) => {
          console.log(err);
          this.$router.push('/login');
        });
    },
    logout() {
      this.$http.post(`${process.env.VUE_APP_API}logout`)
        .then((res) => {
          console.log(res);
          document.cookie = 'hexToken=;expires=;';
          this.$router.push('/login');
        }).catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
