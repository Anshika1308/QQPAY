<template>
  <b-navbar toggleable="lg" type="dark" variant="light">
    <b-navbar-brand href="#">
      <img alt="Vue logo" class="logo_img" src="../../assets/master_logo.png" />
    </b-navbar-brand>
  </b-navbar>
</template>

<script>

export default {
  name: "NavBarLarge",
};
</script>

<style lang="scss" scoped>
@import "@/global.scss";
.invites_left {
  position: absolute;
  left: 80px;
  margin: -0.5rem
}
.logo_img {
  max-height: 50px;
}
.navbar {
  position: sticky;
  top: 0;
  z-index: 1040;
  border-bottom: 1px solid $silver;
}
</style>