<template>
  <div>
    <div class="container pt-4">
      <div class="row pt-3">
        <div class="col-3">
          <div class="list-group list-top">
            <a
              data-toggle="list"
              class="list-group-item list-group-item-action active text-center"
              href="javascript:;"
              @click.prevent="btnsearchs='' "
            >全部</a>
            <a
              data-toggle="list"
              href="javascript:;"
              @click.prevent="btnsearchs=`${category}`"
              class="list-group-item list-group-item-action text-center"
              v-for="(category,index) in categorys"
              :key="index"
            >{{category}}</a>
          </div>
        </div>
        <div class="col-9">
          <div class="row">
            <h2 class="text-dark" v-if="searchProduct.length ===0">努力規劃中，敬請期待。</h2>
            <div class="col-md-6 mb-4 px-2" v-for="(card,index) in searchProduct" :key="index">
              <div class="product-card card border-0 shadow-sm h-100">
                <div
                  style="height: 200px; background-size: cover; background-position: center"
                  :style="{backgroundImage:`url(${card.imageUrl})`}"
                ></div>
                <div class="card-body">
                  <span class="badge badge-secondary float-right ml-2">{{card.category}}</span>
                  <h5 class="card-title">
                    <span href="#" class="text-dark">{{card.title}}</span>
                  </h5>
                  <p class="card-text">{{card.content}}</p>
                  <div class="">
                    <div class="h4 text-right text-danger" >售價 NT{{ card.price | currency }}/{{card.unit}}</div>
                  </div>
                </div>
                <div class="card-footer d-flex">
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-sm"
                    @click="createdProduct(card.id)"
                  >
                    <i v-if="loaddingFile===card.id" class="fas fa-spinner fa-spin"></i>
                    查看更多
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm ml-auto"
                    @click="addtoCart(card.id,products.num)"
                  >
                    <i v-if="loaddingFile===card.id" class="fas fa-spinner fa-spin"></i>
                    加到購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pagination
      v-if="pagination.total_pages>1"
      class="d-flex justify-content-center"
      :pagination="pagination"
      @getpagination="getOrderList"
    ></pagination>

    <drop ref="drop"></drop>
  </div>
</template>
<script>
import pagination from "../pagination";
import drop from "../drop";
export default {
  data() {
    return {
      products: [],
      btnsearchs: "",
      category: [],
      loaddingFile: "",
      pagination: {}
    };
  },
  methods: {
    getProducts(item = 1) {
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/products?page=${item}`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
        response.data.products.forEach(item => {
          vm.category.push(item.category);
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
      vm.loaddingFile = id;
      vm.$http.post(url, { data: cart }).then(response => {
        vm.$refs.drop.getCart();
        console.log(response.data);
        vm.loaddingFile = "";
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
  computed: {
    searchProduct() {
      let vm = this;
      return vm.products.filter(item => {
        return item.category.match(vm.btnsearchs);
      });
    },
    categorys() {
      const vm = this;
      return vm.category.filter(function(element, index, arr) {
        return arr.indexOf(element) === index;
      });
    }
  },
  created() {
    this.getProducts();
  },
  components: {
    drop,
    pagination
  }
};
</script>
<style>
.product-card {
  transition: all 0.3s;
}
.product-card:hover {
  transform: scale(1.05);
  box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 1) !important;
}
.list-top{
  position: sticky;
  top:80px;
  z-index: 50;
}
.list-top>a{
  cursor: pointer;
}
</style>