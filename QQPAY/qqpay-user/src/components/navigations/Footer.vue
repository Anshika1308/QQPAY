<template>
  <b-navbar toggleable="lg" type="dark" variant="light">
    <div class="footer">
      <b-container>
        <b-row align-v="center" align-h="center">
          <b-col col sm="12" md="12" lg="12">
            <b-link href="#foo" class="mr-4" size="sm">Explore</b-link>
            <b-link href="#foo" class="mr-4" size="sm">Help</b-link>
            <b-link href="#foo" size="sm">About <em>QQPay</em></b-link>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-navbar>
</template>

<style lang="scss" scoped>
@import "@/global.scss";
.navbar {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 1040;
  background: $white !important;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
}
</style>