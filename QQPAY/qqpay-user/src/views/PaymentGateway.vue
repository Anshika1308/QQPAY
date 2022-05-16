<template>
  <div>
    <NavBar />
    <!-- <NavBarLeft /> -->
    <div class="page-body">
      <TitleBar :title="$t('fundTransfers.fundTransfer')" />
      <!-- <b-container> -->
      <div
        class="embed-responsive embed-responsive-16by9 z-depth-1-half"
        style="height: 100vh"
      >
        <iframe
          class="embed-responsive-item"
          src="https://ac56-183-83-163-96.in.ngrok.io/qqpay/payment"
          allowfullscreen
        ></iframe>
      </div>
      <!-- </b-container> -->
      <!-- have to remove iframe container -->
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navigations/NavBar.vue";
import TitleBar from "@/components/navigations/TitleBar.vue";
// import NavBarLeft from "@/components/navigations/NavBarLeft.vue";
export default {
  components: {
    NavBar,
    TitleBar,
    // NavBarLeft,
  },
  watch: {}
}
</script>

<style>
embed-responsive-item::-webkit-scrollbar {
  display: none;
}
</style>