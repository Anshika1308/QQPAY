<template>
  <div class="forgot-password">
    <div class="my-5">
      <b-container>
        <b-alert
          :show="dismissCountDown"
          dismissible
          fade
          variant="danger"
          @dismiss-count-down="countDownChanged"
        >
          {{submitErrorMessage}}
        </b-alert>
        <b-row align-v="center" align-h="center" class="my-auto">
          <b-col col sm="12" md="12" lg="5">
            <b-card :header="$t('forgetPassowrd.forgotPassword')" header-tag="header" class="mt-2">
              <img
                alt="QQ Pay"
                class="logo_img"
                src="../../assets/master_logo.png"
              />
              <b-form-input
                v-model="user_details.email"
                type="email"
                placeholder="Enter Email ID"
                class="mt-3"
              ></b-form-input>
              <div v-if="validateEmail" class="floating-placeholder">
                <span >{{errorMessage}}</span>
              </div>
              <b-button
                variant="primary"
                @click="onSubmitForgot"
                class="btn-primary mt-5 ml-auto px-5"
                >
                <div class="button-loader" v-if="loader">
                  <span class="spinner-border spinner-border-sm"></span>
                </div>
                <div v-else>{{$t('forgetPassowrd.getOtp')}}</div>
                </b-button
              >
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <Footer class="footer"/>
    <b-modal
      id="modal-otp"
      ref="my-modal"
      title="Send OTP"
      @ok="nav_update"
      centered
      variant="primary"
    >
      An OTP has been send to your registered Email ID - {{ user_details.email }}
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
      user_details: {
        email: "",
        password: "",
      },
      errorMessage: '',
      errorOnSubmit: false,
      submitErrorMessage: '',
      openModal: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      loader: false,
    };
  },
  computed: {
    validateEmail(){
      const email = this.user_details.email;
      if (email) {
        //eslint-disable-next-line
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          //eslint-disable-next-line
          this.errorMessage =  "" ;
          //eslint-disable-next-line
          this.errorOnSubmit = false;
          //eslint-disable-next-line
          this.submitErrorMessage = '';
          return false;
        } else {
          //eslint-disable-next-line
          this.errorMessage = "Please Enter the valid email address";
          //eslint-disable-next-line
          this.errorOnSubmit = true;
          //eslint-disable-next-line
          this.submitErrorMessage = '';
          return true;
        }
      } else {
        //eslint-disable-next-line
        this.errorMessage = "";
        //eslint-disable-next-line
        this.errorOnSubmit = true;
        //eslint-disable-next-line
        this.submitErrorMessage = '';
        return true;
      }
    },
  },
  methods: {
    nav_update() {
      this.$router.push("updatepassword");
    },
    async onSubmitForgot() {
      if (this.user_details.email && this.errorOnSubmit === false) {
        const userDetails = {
          User_Email: this.user_details.email,
        }
        try {
          this.loader = true;
          const responseData = await this.$store.dispatch('Authentication/forgotPassword', userDetails);
          if (responseData && responseData.status === 200) {
            this.$refs['my-modal'].show()
            this.loader = false
            this.errorOnSubmit = false;
            this.submitErrorMessage = '';
            this.errorMessage = '';
            this.openModal = true;
            this.alertError = ''
          } else {
            this.loader = false;
            this.errorOnSubmit = false;
            this.dismissCountDown = this.dismissSecs
            this.submitErrorMessage = 'Email does not registered with the QQPAY';
          }
        } catch (error) {
          this.loader = false;
          this.openModal = false;
          this.dismissCountDown = this.dismissSecs
          this.submitErrorMessage = 'Email does not registered with the QQPAY';
        }
      }
      if (!this.user_details.email) {
        this.submitErrorMessage = "Please enter the email address";
        this.errorMessage = "";
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
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
.floating-placeholder {
  color: red;
  font-size: 14px;
  text-align: -webkit-left;
}
</style>
