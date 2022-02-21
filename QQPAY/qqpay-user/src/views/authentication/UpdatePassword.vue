<template>
  <div class="update-password">
    <div class="my-5">
      <b-container>
        <b-row align-v="center" align-h="center" class="my-auto">
          <b-col col sm="12" md="12" lg="5">
            <b-card header="Update Password" header-tag="header" class="mt-2">
              <img
                alt="QQ Pay"
                class="logo_img"
                src="../../assets/master_logo.png"
              />
              <b-form-input
                v-model="otp"
                type="email"
                placeholder="Enter OTP/Current Password"
                class="mt-3"
              ></b-form-input>
              <b-form-input
                v-model="pwd"
                type="password"
                placeholder="Enter New Password"
                class="mt-5"
              ></b-form-input>
              <b-form-input
                v-model="re_pwd"
                type="password"
                placeholder="Re-Enter New Password"
                class="mt-3"
              ></b-form-input>
              <b-button
                variant="primary"
                v-b-modal.modal-update
                class="btn-primary mt-5 ml-auto px-5"
                >Update Account Password</b-button
              >
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-modal
      id="modal-update"
      ref="modal"
      title="Password Successfully Updated"
      @ok="nav_login"
      centered
      variant="primary"
    >
      Your account password has been successfully updated. Click OK to Sign In.
      <template #modal-footer="{ ok }">
        <b-button variant="primary" @click="ok()"> OK </b-button>
      </template>
    </b-modal>
    <Footer/>
  </div>
</template>

<script>
import Footer from "@/components/navigations/Footer.vue";

export default {
  name: "UpdatePassword",
  components: {
    Footer,
  },
  data() {
    return {
      otp: "",
      pwd: "",
      re_pwd: "",
    };
  },
  methods: {
    nav_login() {
      this.$router.push("login");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
.logo_img {
  max-height: 50px;
}
</style>
