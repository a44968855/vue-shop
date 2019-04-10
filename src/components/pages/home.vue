<template>
  <div>
    <section class="container">
      <div class="h4 text-primary line pt-2">
        <i class="fas fa-mug-hot mr-3"></i>
        <span class="text-dark h2 font-weight-bold">主廚推薦 Menu</span>
      </div>
      <div class="row mt-4">
        <div class="col-md-4 mb-4" v-for="(card,index) in products" :key="index">
          <div class="card border-0 shadow-sm" v-if="index<3&card.is_enabled">
            <div
              style="height: 150px; background-size: cover; background-position: center"
              :style="{backgroundImage:`url(${card.imageUrl})`}"
            ></div>
            <div class="card-body">
              <span class="badge badge-secondary float-right ml-2">{{card.category}}</span>
              <h5 class="card-title">
                <p class="text-dark font-weight-bold">{{card.title}}</p>
              </h5>
              <p class="card-text">{{card.content}}</p>
              <div class="">
                <div class="h4 text-danger text-right" v-if="card.price"> 售價 NT{{ card.price | currency}}/{{card.unit}} </div>
              </div>
            </div>
            <div class="card-footer d-flex">
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm"
                @click="createdProduct(card.id)"
              >
                <i v-if="loddingFile===card.id" class="fas fa-spinner fa-spin"></i>
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm ml-auto"
                @click="addtoCart(card.id,card.num)"
              >
                <i v-if="loddingFile===card.id" class="fas fa-spinner fa-spin"></i>
                加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container my-5">
      <div class="row">
        <div class="col-6">
          <div
            class="bg-cover"
            style="background-image:url(https://images.unsplash.com/photo-1519656919827-59c35dd3ce77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=681&q=80);height:380px"
          ></div>
        </div>
        <div class="col-6">
          <div class="h4 text-primary font-weight-bold d-flex line mt-2">
            <i class="fas fa-mug-hot mr-3"></i>
            <span class="text-dark">最新消息 News</span>
          </div>
          <div class="h-100">
            <h2 class="text-center font-weight-bold mt-4">歡慶開幕</h2>
            <p class="h5 mx-4 coupon_text">歡慶開幕，本周全館商品只要輸入優惠碼皆可享有5折優惠。<br>優惠碼 : open </p>
            <router-link class="btn btn-primary coupon_btn" to="/productorder">前往選購</router-link>
          </div>
        </div>
      </div>
    </div>
    <drop ref="drop"></drop>
  </div>
</template>
<script>
import drop from "../drop";
export default {
  data() {
    return {
      products: [],
      loddingFile: ""
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/products`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then(response => {
        response.data.products.forEach(item => {
          if (item.is_enabled === 1) {
            vm.products.push(item);
          }
        });
      });
    },
    addtoCart(id, qty = 1) {
      let vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      let cart = {
        product_id: id,
        qty
      };
      vm.loddingFile = id;
      vm.$http.post(url, { data: cart }).then(response => {
        vm.$refs.drop.getCart();
        console.log(response.data);
        vm.loddingFile = "";
      });
    },
    createdProduct(id) {
      let vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/product/${id}`;
      vm.$http.get(url).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push(`/product/${id}`);
        }
      });
    }
  },
  created() {
    this.getProducts();
  },
  components: {
    drop
  }
};
</script>
<style>
</style>