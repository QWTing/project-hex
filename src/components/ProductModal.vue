<template>
  <div
    id="productmodal"
    ref="modal"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            id="staticBackdropLabel"
            class="modal-title"
          >
            {{ product.title }}
          </h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img
                class="img-fluid"
                :src="product.imageUrl"
                alt=""
              >
            </div>
            <div class="col-sm-6">
              <div class="badge bg-secondary">
                {{ product.category }}
              </div>
              <div class="h6">
                商品描述：尺寸：{{ product.description }}
              </div>
              <div class="h6">
                商品內容：{{ product.content }}
              </div>
              <div>
                <p
                  v-if="product.price === product.origin_price"
                  class="fs-5"
                >
                  售價：{{ product.price }}
                </p>
                <div v-else>
                  <p class="fs-6 text-decoration-line-through">
                    原價 {{ product.origin_price }} 元
                  </p>
                  <p class="fs-5">
                    現在只要 {{ product.price }} 元
                  </p>
                </div>
              </div>
              <div>
                <div class="input-group">
                  <input
                    v-model="qty"
                    type="number"
                    class="form-control"
                  >
                  <button
                    class="btn btn-primary"
                    @click="$emit('add-to-cart',product.id,qty)"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['add-to-cart'],
  data() {
    return {
      status: {},
      modal: '',
      qty: 1,
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static',
    });
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
};
</script>
