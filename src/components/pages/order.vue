<template>
  <div>
    <table class="table mt-4">
      <thead>
        <tr>
          <td>訂購日期</td>
          <td class="text-center">訂單編號</td>
          <td class="text-center">客戶姓名</td>
          <td class="text-center">購買項目</td>
          <td class="text-right">金額</td>
          <td>是否付款</td>
          <!-- <td>編輯</td> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order,key) in orderList" :key="key">
          <td>{{order.create_at | timedate}}</td>
          <td class="text-center">{{order.id}}</td>
          <td>
            <div class="text-center" v-if="order.user">{{order.user.name}}</div>
          </td>
          <td class="text-center">
            <ul v-for="order2 in order.products" :key="order2.id" style="list-style:none">
              <li>{{order2.product.title}} 數量：{{order2.qty}}{{order2.product.unit}}</li>
            </ul>
          </td>
          <td class="text-right">{{order.total|currency}}</td>
          <td>
            <span class="text-success" v-if="order.is_paid">已付款</span>
            <span class="text-danger" v-else>尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- modal -->
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title d-flex w-100" id="exampleModalLabel">
              <span>明細</span>
              <span class="ml-auto"></span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="create">建立日期</label>
                <input
                  type="text"
                  class="form-control"
                  id="create"
                  placeholder="建立日期"
                  :value="tempOrder.create_at | timedate"
                  disabled
                >
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="origin_price">訂單價錢</label>
                <input
                  type="number"
                  class="form-control"
                  id="origin_price"
                  placeholder="請輸入原價"
                  v-model="tempOrder.total"
                >
              </div>
            </div>
            <hr>
            <h6 class="h6">訂購人資訊</h6>
            <div v-if="tempOrder.user">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="description">姓名</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="請輸入訂購人資訊"
                    v-model="tempOrder.user.name"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-dark" @click="editOrder(tempOrder.id)">確認</button>
          </div>
        </div>
      </div>
    </div>
    <pagination
      class="d-flex justify-content-center"
      :pagination="pagination"
      @getpagination="getOrderList"
    ></pagination>
  </div>
</template>
<script>
import $ from "jquery";
import pagination from "../pagination";
export default {
  data() {
    return {
      orderList: {
        products: {}
      },
      pagination: {},
      tempOrder: {}
    };
  },
  methods: {
    getOrderList(page = 1) {
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/admin/orders?page=${page}`;
      const vm = this;
      vm.$http.get(api).then(response => {
        console.log(response);
        vm.orderList = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(order) {
      const vm = this;
      console.log(order);
      vm.tempOrder = { ...order };
      $("#orderModal").modal("show");
    },
    editOrder(id) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/admin/order/${vm.tempOrder.id}`;
      console.log("api_url", api);

      this.$http.put(api, { data: vm.tempOrder }).then(res => {
        console.log("api res:", res);
      });
    }
  },
  created() {
    this.getOrderList();
  },
  components: {
    pagination
  }
};
</script>