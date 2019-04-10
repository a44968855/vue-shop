<template>
    <div>
        <Alert></Alert>
        <slider></slider>
        <homenavbar class="sticky-top"></homenavbar>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>
<script>
import homenavbar from "../homenavbar";
import Footer from "../footer"
import slider from "../slider"
import Alert from "../alertmessage"
export default {
    components:{
        homenavbar,
        Footer,
        slider,
        Alert,
    }
}
</script>