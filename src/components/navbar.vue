<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click="logout">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      vm.$http.post(api).then((response)=>{
        console.log(response.data)
        if(response.data.success){
          vm.$router.push("/login")
        }
      })
    }
  }
};
</script>