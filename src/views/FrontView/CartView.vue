<template>
  <h1 class="text-center">
    Cart
  </h1>
  <div class="container w300">
    <div class="row justify-content-center">
      <table class="table align-middle text-center">
        <thead>
          <tr>
            <th class="col-1" />
            <th class="col-3">
              品名
            </th>
            <th class="col-2">
              數量
            </th>
            <th class="col-2">
              單價
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in carts.carts"
            :key="item.id"
          >
            <th>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="removeCart(item.id)"
              >
                移除購物車
              </button>
            </th>
            <th>{{ item.product.title }}</th>
            <th>{{ item.qty }} / 個</th>
            <th>{{ item.total }}</th>
          </tr>
        </tbody>
        <tfoot>
          <tr class="text-end">
            <th
              colspan="3"
            >
              總計
            </th>
            <th>{{ carts.total }}</th>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="home">
      <Form
        ref="form"
        v-slot="{ errors }"
        @submit="onSubmit"
      >
        <!-- Email -->
        <div class="mb-3">
          <label
            for="email"
            class="form-label"
          >Email</label>

          <Field
            id="email"
            v-model="order.user.email"
            name="email"

            type="email"
            class="form-control"

            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
          />

          <error-message
            name="email"
            class="invalid-feedback"
          />
        </div>
        <!-- 姓名 -->
        <div class="mb-3">
          <label
            for="email"
            class="form-label"
          >收件人姓名</label>

          <Field
            id="name"
            v-model="order.user.name"
            name="姓名"

            type="text"
            class="form-control"

            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入 姓名"
            rules="required"
          />

          <error-message
            name="姓名"
            class="invalid-feedback"
          />
        </div>
        <!-- 收件人電話 -->
        <div class="mb-3">
          <label
            for="tel"
            class="form-label"
          >收件人電話</label>

          <Field
            id="name"
            v-model="order.user.tel"
            name="電話"

            type="text"
            class="form-control"

            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入 收件人電話"
            :rules="isPhone"
          />

          <error-message
            name="電話"
            class="invalid-feedback"
          />
        </div>
        <!-- 收件人地址 -->
        <div class="mb-3">
          <label
            for="email"
            class="form-label"
          >收件人地址</label>

          <Field
            id="name"
            v-model="order.user.address"
            name="地址"

            type="text"
            class="form-control"

            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入 地址"
            rules="required"
          />

          <error-message
            name="地址"
            class="invalid-feedback"
          />
        </div>
        <div class="mb-3">
          <label
            for="message"
            class="form-label"
          >留言</label>
          <textarea
            id="message"
            v-model="order.message"
            name=""
            class="form-control"
            cols="30"
            rows="10"
          />
        </div>
        <div class="text-end">
          <button
            class="btn btn-primary"
            type="submit"
          >
            送出訂單
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import emitter from '@/lib/emitter';

export default {
  data() {
    return {
      carts: {},
      order: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  mounted() {
    this.getCart();
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
    removeCart(id) {
      console.log(id);
      this.$http.delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then((res) => {
          this.getCart();
          emitter.emit('get-cart');
        }).catch((err) => {
          console.log(err);
        });
    },
    removeallCart() {
      this.$http.delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`)
        .then((res) => {
          this.getCart();
          emitter.emit('get-cart');
        }).catch((err) => {
          console.log(err);
        });
    },
    onSubmit() {
      const data = this.order;
      this.$http.post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`, { data })
        .then((res) => {
          this.$refs.form.resetForm();
          emitter.emit('get-cart');
          this.getCart();
        }).catch((err) => {
          console.log(err);
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },
  },
};
</script>
