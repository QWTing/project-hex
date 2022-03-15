<template>
  <div
    id="exampleModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5
            id="productModalLabel"
            class="modal-title"
          >
            <span v-if="!tempproduct.id">新增產品
            </span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <!-- 新增相片 -->
              <div class="mb-2">
                <!-- 主圖 -->
                <div class="mb-3">
                  <label
                    for="imageUrl"
                    class="form-label"
                  >主圖</label>
                  <input
                    v-model="tempproduct.imageUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  >
                  <img
                    class="img-fluid"
                    :src="tempproduct.imageUrl"
                  >
                </div>
                <!-- 多圖 -->
                <div
                  v-if="Array.isArray(tempproduct.imagesUrl)"
                  class="mb-3"
                >
                  <p>多圖</p>
                  <template
                    v-for="(img ,key) in tempproduct.imagesUrl"
                    :key="key+ '123' "
                  >
                    <p>圖片{{ key +1 }}</p>
                    <input
                      v-model="tempproduct.imagesUrl[key]"
                      type="text"
                      class="form-control mb-2"
                      placeholder="請輸入圖片連結"
                    >
                    <img
                      class="img-fluid mb-2"
                      :src="tempproduct.imagesUrl[key]"
                    >
                  </template>
                  <!-- 新增按鈕 -->
                  <div>
                    <button
                      v-if="!tempproduct.imagesUrl.length ||
                        tempproduct.imagesUrl[tempproduct.imagesUrl.length -1 ]"
                      class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="tempproduct.imagesUrl.push('')"
                    >
                      新增圖片
                    </button>
                    <!-- 刪除按鈕 -->
                    <button
                      v-else
                      class="btn btn-outline-danger btn-sm d-block w-100"
                      @click="tempproduct.imagesUrl.pop('')"
                    >
                      刪除圖片
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <!-- 標題 -->
              <div class="mb-3">
                <label
                  for="title"
                  class="form-label"
                >標題</label>
                <input
                  id="title"
                  v-model="tempproduct.title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                >
              </div>
              <!-- 分類 -->
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label
                    for="category"
                    class="form-label"
                  >分類</label>
                  <input
                    id="category"
                    v-model="tempproduct.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  >
                </div>
                <div class="mb-3 col-md-6">
                  <label
                    for="price"
                    class="form-label"
                  >單位</label>
                  <input
                    id="unit"
                    v-model="tempproduct.unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                  >
                </div>
              </div>
              <!-- 原價 售價 -->
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label
                    for="origin_price"
                    class="form-label"
                  >原價</label>
                  <input
                    id="origin_price"
                    v-model="tempproduct.origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                  >
                </div>
                <div class="mb-3 col-md-6">
                  <label
                    for="price"
                    class="form-label"
                  >售價</label>
                  <input
                    id="price"
                    v-model="tempproduct.price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                  >
                </div>
              </div>
              <hr>
              <!-- 產品描述 -->
              <div class="mb-3">
                <label
                  for="description"
                  class="form-label"
                >產品描述</label>
                <textarea
                  id="description"
                  v-model="tempproduct.description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                />
              </div>
              <!-- 說明內容 -->
              <div class="mb-3">
                <label
                  for="content"
                  class="form-label"
                >說明內容</label>
                <textarea
                  id="description"
                  v-model="tempproduct.content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                />
              </div>
              <!-- 是否啟用 -->
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    v-model="tempproduct.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  >
                  <label
                    class="form-check-label"
                    for="is_enabled"
                  >是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            v-if="!tempproduct.id"
            type="button"
            class="btn btn-primary"
            @click="addProduct(tempproduct)"
          >
            新增
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            @click="updataProduct(tempproduct)"
          >
            更新
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
    tempproduct: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      modal: '',
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
    addProduct(item) {
      this.$http.post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`, { data: item })
        .then((res) => {
          console.log(res);
          this.$emit('getProducts');
          this.hideModal();
        }).catch((err) => {
          console.log(err);
        });
    },
    updataProduct(item) {
      console.log(item);
      this.$http.put(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`, { data: item })
        .then((res) => {
          console.log(res);
          this.$emit('getProducts');
          this.hideModal();
        }).catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
