<template>
  <div class="container">
    <div class="text-end mt-4">
      <button
        class="btn btn-primary"
        @click="openmodal('New')"
      >
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in products"
          :key="item.id"
        >
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">
            {{ item.origin_price }}
          </td>
          <td class="text-end">
            {{ item.price }}
          </td>
          <td>
            <span
              v-if="item.is_enabled"
              class="text-success"
            >啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openmodal('edit',item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openmodal('delete',item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <AddProductModal
      ref="addproductmodal"
      :tempproduct="tempproduct"
      @get-products="getproducts"
    />
  </div>
</template>
<script>
import AddProductModal from '@/components/AddProductModal.vue';

export default {
  components: { AddProductModal },
  data() {
    return {
      products: {},
      tempproduct: {
        imagesUrl: [],
      },
    };
  },
  mounted() {
    this.getproducts();
  },
  methods: {
    getproducts() {
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`)
        .then((res) => {
          this.products = res.data.products;
          console.log(this.products);
        }).catch((err) => {
          console.log(err);
        });
    },
    openmodal(isNew, item) {
      if (isNew === 'New') {
        this.$refs.addproductmodal.openModal();
        this.tempproduct = {
          imagesUrl: [],
        };
      } else if (isNew === 'edit') {
        this.tempproduct = {
          ...item,
          imagesUrl: [],
        };
        console.log(this.tempproduct);
        this.$refs.addproductmodal.openModal();
      } else if (isNew === 'delete') {
        this.$refs.addproductmodal.openModal();
      }
    },
  },
};
</script>
