<template>
  <div class="mt-5 container">
    <form>
      <div class="mb-3">
        <label
          for="exampleInputEmail1"
          class="form-label"
        >Email address</label>
        <input
          id="exampleInputEmail1"
          v-model="user.username"
          type="email"
          class="form-control"
          aria-describedby="emailHelp"
        >
        <div
          id="emailHelp"
          class="form-text"
        />
      </div>
      <div class="mb-3">
        <label
          for="exampleInputPassword1"
          class="form-label"
        >Password</label>
        <input
          id="exampleInputPassword1"
          v-model="user.password"
          type="password"
          class="form-control"
        >
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click="login"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      Checklogin: false,
    };
  },
  mounted() {
  },
  methods: {
    login() {
      const data = this.user;
      console.log(data);
      this.$http.post(`${process.env.VUE_APP_API}admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token};expired=${new Date(expired)}; `;
          this.$router.push('/admin/backproducts');
          this.Checklogin = true;
        }).catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
