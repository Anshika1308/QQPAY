<template>
  <div class="forgot-password">
    <div class="my-5">
      <b-container>
        <b-row align-v="center" align-h="center" class="my-auto">
          <b-col col sm="12" md="12" lg="5">
            <b-card header="Forgot Password" header-tag="header" class="mt-2">
              <img
                alt="QQ Pay"
                class="logo_img"
                src="../../assets/master_logo.png"
              />
              <b-form-input
                v-model="email"
                type="email"
                placeholder="Enter Email ID"
                class="mt-3"
              ></b-form-input>
              <b-button
                variant="primary"
                v-b-modal.modal-otp
                class="btn-primary mt-5 ml-auto px-5"
                >Get OTP</b-button
              >
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <Footer class="footer"/>
    <b-modal
      id="modal-otp"
      ref="modal"
      title="Send OTP"
      @ok="nav_update"
      centered
      variant="primary"
    >
      An OTP has been send to your registered Email ID - {{ email }}
      <template #modal-footer="{ ok }">
        <b-button variant="primary" @click="ok()"> OK </b-button>
      </template>
    </b-modal>
    
  </div>
</template>

<script>
import Footer from "@/components/navigations/Footer.vue";
export default {
  name: "ForgotPassword",
  components: {
    Footer,
  },
  data() {
    return {
      email: "deepuponneth@softdevels.com",
      password: "",
    };
  },
  methods: {
    nav_update() {
      this.$router.push("updatepassword");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
.logo_img {
  max-height: 50px;
}
.footer {
  margin-top: 180px !important;
}
</style>
