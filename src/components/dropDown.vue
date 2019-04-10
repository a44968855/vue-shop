<template>
  <div>
    <div class="dropdown">
      <button class="bag btn" type="button" data-toggle="dropdown">
        <i class="text-primary fas fa-mug-hot fa-5x"></i>
        <span class="badge badge-pill badge-danger">{{ carts.carts.length }}</span>
      </button>
      <div
        class="dropdown-menu dropdown-menu-right p-3"
       style="min-width: 300px;"
        aria-labelledby="dropdownMenu2"
      >
        <h6>購物車</h6>
        <table class="table">
          <thead>
            <tr>
              <td></td>
              <td>品名</td>
              <td>數量</td>
              <td>價錢</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cart,index) in carts.carts" :key="index">
              <td>
                <i class="fas fa-trash-alt"></i>
              </td>
              <td>{{cart.product.title}}</td>
              <td>{{cart.qty}}</td>
              <td class="text-right">{{cart.total|currency}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="text-right" colspan="3">總計</td>
              <td class="text-right">{{carts.final_total|currency}}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        carts:{
            carts:{}
        }
    };
  },
  methods:{
      getCart() {
      let vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(url).then(response => {
        console.log(response.data.data);
        vm.carts = response.data.data;
      });
    },
  },
  created(){
      this.getCart()
  },
};
</script>
<style>
.bag{
    position: relative;
    left:30px;
}
.badge{
    position:absolute !important;
    top:4px;
    right:4px
}
</style>