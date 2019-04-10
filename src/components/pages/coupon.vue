<template>
  <div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary mt-4" @click="openpostModal('post')">新增優惠券</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>優惠名稱</th>
          <th>折扣比例</th>
          <th>截止日期</th>
          <th>折扣碼</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,key) in coupon" :key="key">
          <td>{{item.title}}</td>
          <td>{{item.percent}}%</td>
          <td>{{item.due_date}}</td>
          <td>{{item.code}}</td>
          <td class="d-flex justify-content-center">
            <div>
              <button class="btn btn-outline-primary" @click="openpostModal('put',item)">修改</button>
              <button class="btn btn-outline-danger" @click="opendelModal('delete',item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- postModal -->
    <div class="modal" id="postModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 class="modal-title">新增優惠券</h5>
          </div>
          <div class="modal-body">
            <label for="coupon_title">優惠名稱</label>
            <input
              type="text"
              class="form-control"
              id="coupon_title"
              placeholder="優惠名稱"
              v-model="tempcoupon.title"
            >
            <label for="coupon_title">折扣比例</label>
            <input
              type="text"
              class="form-control"
              id="coupon_percent"
              placeholder="折扣比例"
              v-model="tempcoupon.percent"
            >
            <label for="coupon_dueDate">截止日期</label>
            <input
              type="text"
              class="form-control"
              id="coupon_dueDate"
              placeholder="截止日期"
              v-model="tempcoupon.due_date"
            >
            <label for="coupon_code">折扣碼</label>
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              placeholder="折扣碼"
              v-model="tempcoupon.code"
            >
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            <button type="button" class="btn btn-primary" @click="postCoupon(tempcoupon.id)">儲存</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delmodal -->
    <div class="modal" id="delModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title">確認刪除{{tempcoupon.title}}優惠券</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-danger">確認刪除{{tempcoupon.title}}優惠券</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="postCoupon(tempcoupon.id)">確認</button>
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
      coupon: [],
      tempcoupon: {},
      couponMethod: ""
    };
  },
  methods: {
    getCoupon(page = 1) {
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/admin/coupons?page=${page}`;
      const vm = this;
      vm.$http.get(api).then(response => {
        console.log(response);
        vm.coupon = response.data.coupons;
      });
    },
    openpostModal(method, item) {
      const vm = this;
      if (method === "put") {
        vm.couponMethod = "put";
        vm.tempcoupon = { ...item };
      }
      $("#postModal").modal("show");
    },
    opendelModal(method, item) {
      $("#delModal").modal("show");
      this.tempcoupon = { ...item };
      this.couponMethod = "delete";
    },
    postCoupon(id) {
      let api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/admin/coupon`;
      let httpMethods = "post";
      const vm = this;
      if (vm.couponMethod === "put") {
        httpMethods = "put";
        api = `${process.env.APIPATH}/api/${
          process.env.CUSTOMPATH
        }/admin/coupon/${id}`;
      } else if (vm.couponMethod === "delete") {
        httpMethods = "delete";
        api = `${process.env.APIPATH}/api/${
          process.env.CUSTOMPATH
        }/admin/coupon/${id}`;
      }
      vm.$http[httpMethods](api, {
        data: vm.tempcoupon
      }).then(response => {
        console.log(response.data);
        vm.tempcoupon = response.data;
        vm.getCoupon();
        $("#postModal").modal("hide");
        $("#delModal").modal("hide");
      });
    }
  },
  created() {
    this.getCoupon();
  }
};
</script>