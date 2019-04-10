<template>
  <div>
    <div class="container">
      <div class="row py-4">
        <div class="col-md-6 px-0">
          <div>
            <div
              class="bg-cover"
              :style="{backgroundImage:`url(${product.imageUrl})`}"
              style="height:380px"
            ></div>
          </div>
        </div>
        <div class="col-md-6 pl-5">
          <div>
            <h1 class="mt-4">{{product.title}}</h1>
            <h4 class="mt-3">{{product.price|currency}}/{{product.unit}}</h4>
            <hr>
            <p class="h5">{{product.content}}</p>
            <select name class="form-control mt-3" v-model="product.num">
              <option
                :value="num"
                v-for="(num,index) in 10"
                :key="index"
              >選購 {{num}} {{product.unit}}</option>
            </select>
            <div class="modal-footer">
              <div class="text-muted text-nowrap mr-3">
                小計
                <strong>{{ product.num * product.price }}</strong> 元
              </div>
              <button
                type="button"
                class="btn btn-primary"
                @click="addtoCart(product.id, product.num)"
              >
                <i v-if="loaddingfile===product.id" class="fas fa-spinner fa-spin"></i>
                加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- btm -->
      <div class="h4 text-primary line pt-5">
        <i class="fas fa-mug-hot mr-3"></i>
        <span class="text-dark h2 font-weight-bold">猜你喜歡</span>
      </div>
      <div class="row pb-3">
        <div class="like col-3" v-for="(card,index) in randomp" :key="index">
          <router-link
            class="product-card card border-0 shadow-sm h-100"
            :to="'/product/' + card.id"
          >
            <div
              style="height: 200px; background-size: cover; background-position: center"
              :style="{backgroundImage:`url(${card.imageUrl})`}"
            ></div>
            <div class="card-body text-center">
              <h5 class="card-title">
                <a href="#" class="text-dark">{{card.title}}</a>
              </h5>
              
              <div class="d-flex justify-content-center">
                <div class="h5" v-if="card.price">NT {{ card.price | currency}}</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <drop ref="drop"/>
  </div>
</template>
<script>
import drop from "../drop";
export default {
  data() {
    return {
      id: "",
      product: {},
      cart: {},
      loaddingfile: "",
      products: [],
      randomp: []
    };
  },
  methods: {
    getProduct(id) {
      let vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/product/${id}`;
      vm.$http.get(url).then(response => {
        vm.product = response.data.product;
      });
    },

    addtoCart(id, qty = 1) {
      let vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      let cart = {
        product_id: id,
        qty
      };
      vm.loaddingfile = id;
      vm.$http.post(url, { data: cart }).then(response => {
        console.log(response.data);
        vm.$refs.drop.getCart();
        vm.loaddingfile = "";
      });
    },
    getRandom() {
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/products`;
      const vm = this;
      vm.$http.get(api).then(response => {
        response.data.products.forEach(item => {
          if (item.is_enabled === 1) {
            vm.products.push(item);
          }
        });
        let i = 0;
        for (i = 0; i < 4; i++) {
          let random = Math.floor(Math.random() * `${this.products.length}`);
          vm.randomp.push(vm.products[random]);
        }
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
  watch: {
    $route(to, from) {
      const vm = this;
      vm.id = to.params.id;
      vm.getProduct(vm.id);
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getProduct(this.id);
    this.getRandom();
  },
  components: {
    drop
  }
};
</script>   
<style scope>
.like {
  height: 300px;
}
</style>