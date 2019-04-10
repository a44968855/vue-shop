<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light sticky-top">
      <router-link to="/home">
        <img src="../assets/logo.png" alt height="60">
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse pl-5" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link
            class="pb-0 nav-item nav-link active h5 text-primary font-weight-bold pr-3"
            to="/home"
          >
            <i class="fas fa-store mr-1"></i>首頁
          </router-link>
          <router-link
            class="pb-0 nav-item nav-link h5 text-primary font-weight-bold pr-3"
            to="/productOrder"
          >
            <i class="fas fa-coffee mr-1"></i>嚴選商品
          </router-link>
          <router-link
            class="pb-0 nav-item nav-link h5 text-primary font-weight-bold"
            to="/customerorder"
          >
            <i class="fas fa-shopping-cart mr-1"></i>購物車
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carts: {
        product: {}
      }
    };
  },
  methods: {
    getCart() {
      let vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(url).then(response => {
        console.log(response.data.data);
        vm.carts = response.data.data;
      });
    }
  },
  created() {
    this.getCart();
  }
};
</script>
<style>
</style>