<template>
  <div>
    <div class="drop">
      <button class="bag btn" type="button" data-toggle="modal" data-target="#cartsModal">
        <i class="text-primary fas fa-mug-hot fa-5x"></i>
        <span class="drop_badge badge-pill badge-danger">{{ carts.carts.length }}</span>
      </button>
    </div>
    <!-- cartsmodal -->
    <div id="cartsModal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold">購 物 車</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                <tr>
                  <td></td>
                  <td>品名</td>
                  <td>數量</td>
                  <td class="text-right">價錢</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cart,index) in carts.carts" :key="index">
                  <td>
                    <a href="#" class="text-danger" @click.prevent="removeCart(cart.id)">
                      <i class="fas fa-trash-alt"></i>
                    </a>
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
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">繼續選購</button>
            <router-link type="button" class="btn btn-success" to="/customerorder" data-dismiss="modal">前往付款</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carts: {
        carts: {}
      }
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(url).then(response => {
        console.log(response.data.data);
        vm.carts = response.data.data;
      });
    },
    removeCart(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/cart/${id}`;
      vm.$http.delete(url).then(response => {
        if (response.data.success) {
          this.getCart();
        }
      });
    },
  },
  created() {
    this.getCart();
  }
};
</script>
<style>
.bag {
  position: relative;
  left: 30px;
}
.drop_badge {
  position: absolute !important;
  top: 4px;
  right: 4px;
}
.drop {
  position: fixed;
  bottom: 200px;
  right:80px
}
</style>