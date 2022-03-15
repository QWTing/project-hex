<template>
  <div class="container">
    <h2 class="text-center">
      Products
    </h2>
    <table class="table align-middle">
      <thead>
        <tr class="text-center">
          <th class="col-1 text-start">
            Pictrue
          </th>
          <th class="col-3">
            Product
          </th>
          <th class="col-3">
            Price
          </th>
          <th class="col-3" />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in products"
          :key="item.id"
          class="text-center"
        >
          <td>
            <div
              style="
                width: 200px;
                height: 150px;
                background-size: cover;
                background-position: center;
              "
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            />
          </td>
          <td class="fs-5">
            {{ item.title }}
          </td>
          <td>
            <p
              v-if="item.price === item.origin_price"
              class="fs-5"
            >
              售價：{{ item.price }}
            </p>
            <div v-else>
              <p class="fs-6 text-decoration-line-through">
                原價 {{ item.origin_price }} 元
              </p>
              <p class="fs-5">
                現在只要 {{ item.price }} 元
              </p>
            </div>
          </td>
          <td class="text-end">
            <div class="btn-group btn-group-sm">
              <button
                class="btn btn-outline-secondary"
                @click="getProduct(item.id)"
              >
                更多資訊
              </button>
              <button
                class="btn btn-outline-danger"
                @click="AddtoCart(item.id)"
              >
                加入購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ProductModal
      ref="productmodal"
      :product="product"
      @add-to-cart="AddtoCart"
    />
  </div>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue';
import emitter from '@/lib/emitter';

export default {
  components: { ProductModal },
  data() {
    return {
      products: [],
      product: {},
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      this.$http(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products;
        }).catch((err) => {
          console.log(err);
        });
    },
    getProduct(id) {
      this.$http(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product;
          this.$refs.productmodal.openModal();
        }).catch((err) => {
          console.log(err);
        });
    },
    AddtoCart(id, qty = 1) {
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`, { data: cart })
        .then((res) => {
          emitter.emit('get-cart');
          this.$refs.productmodal.hideModal();
        }).catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
