<template>
  <div>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="(card,index) in products" :key="index">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage:`url(${card.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{card.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{card.title}}</a>
            </h5>
            <p class="card-text">{{card.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!card.price">{{ card.origin_price }} 元</div>
              <del class="h6" v-if="card.price">原價 {{ card.origin_price }} 元</del>
              <div class="h4" v-if="card.price">現在只要 {{ card.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(card.id)"
            >
              <i v-if="status.loadingfile === card.id" class="fas fa-spinner fa-spin"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(card.id,product.num)"
            >
              <i v-if="status.loadingfile === card.id" class="fas fa-spinner fa-spin"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="40"></th>
            <th width="200">品名</th>
            <th width="40">數量</th>
            <th class="text-right" width="40">價格</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in cart.carts" :key="item.id">
            <td>
              <a href="javascript:;" @click.prevent="removeCart(item.id)">
                <i class="fas fa-trash"></i>
              </a>
            </td>
            <td>
              {{item.product.title}}
              <div class="text-success" v-if="item.coupon">已套用優惠券</div>
            </td>
            <td>{{item.qty}}</td>
            <td class="text-right">{{item.final_total | currency}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="text-right" colspan="3">總共</td>
            <td class="text-right">{{cart.total}}</td>
          </tr>
          <tr>
            <td class="text-right text-success" colspan="3">折扣價</td>
            <td class="text-right text-success">{{cart.final_total}}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="請輸入優惠碼"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          v-model="coupon_code"
        >
        <div class="input-group-append">
          <button class="btn input-group-text" id="basic-addon2" @click="addCouponCode">套用優惠碼</button>
        </div>
      </div>
    </div>
    <!-- 表單 -->
    <div class="my-5 row justify-content-center" >
      <form class="col-md-6" @submit.prevent="createdOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            v-model="form.user.email"
            placeholder="請輸入 Email"
            required
            v-validate="'required|email'"
          >
          <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="username"
            v-model="form.user.name"
            placeholder="輸入姓名"
            v-validate="'required'"
            :class="{'is-invalid':errors.has('name')}"
          >
          <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            type="tel"
            class="form-control"
            id="usertel"
            v-model="form.user.tel"
            placeholder="請輸入電話"
          >
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="text"
            class="form-control"
            name="address"
            id="useraddress"
            v-model="form.user.address"
            placeholder="請輸入地址"
          >
          <span class="text-danger">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
    <!-- modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt>
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
            </select>
          </div>
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
              <i v-if="status.loadingfile" class="fas fa-spinner fa-spin"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      products: [],
      product: {},
      cart: [],
      status: {
        loadingfile: ""
      },
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          aaddress: ""
        },
        message: ""
      }
    };
  },
  methods: {
    getProducts(page) {
      let vm = this;
      let api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/admin/products?page=${page}`;
      vm.$http.get(api).then(response => {
        vm.products = response.data.products;
      });
    },
    getProduct(id) {
      let vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/product/${id}`;
      vm.status.loadingfile = id;
      vm.$http.get(url).then(response => {
        vm.product = response.data.product;
        $("#productModal").modal("show");
        vm.status.loadingfile = "";
        console.log(response.data);
      });
    },
    addtoCart(id, qty = 1) {
      let vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      let cart = {
        product_id: id,
        qty
      };
      vm.status.loadingfile = id;
      vm.$http.post(url, { data: cart }).then(response => {
        vm.status.loadingfile = "";
        console.log(response.data);
        vm.getCart();
      });
    },
    getCart() {
      let vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(url).then(response => {
        vm.cart = response.data.data;
      });
    },
    removeCart(id) {
      let vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/cart/${id}`;
      vm.$http.delete(url).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.getCart();
        }
      });
    },
    addCouponCode() {
      let vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code
      };
      vm.$http.post(url, { data: coupon }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.getCart();
        }
      });
    },
    createdOrder() {
      let vm = this;
      const order = vm.form;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      vm.$http.post(url, { data: order }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push(`/simulate_orderout/${response.data.orderId}`)
        }
      });
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>