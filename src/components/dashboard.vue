<template>
  <div>
    <div class="container-fluid">
      <sidebar></sidebar>
      <alert></alert>
      <div class="row">
        <navbar></navbar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from "./sidebar";
import navbar from "./navbar";
import alert from "./alertmessage";
export default {
  components: {
    sidebar,
    navbar,
    alert
  }
};
</script>