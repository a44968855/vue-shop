<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <h6 class="nav-link active" href="#">
              <span data-feather="home"></span>
              管理員
            </h6>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="order">訂單列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="coupon">優惠券</router-link>
          </li>
        </ul>
        <ul class="nav flex-column mt-4">
          <li class="nav-item">
            <h6 class="nav-link active" href="#">
              <span data-feather="home"></span>
              模擬功能
            </h6>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="simulate_order">模擬功能</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
