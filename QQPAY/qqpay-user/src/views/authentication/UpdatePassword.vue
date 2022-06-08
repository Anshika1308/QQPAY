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
                v-model="currentPassword"
                type="email"
                placeholder="Enter OTP/Current Password"
                class="mt-3"
              ></b-form-input>
              <div v-if="currentError" class="floating-placeholder">
                <span>{{currentError}}</span>
              </div>
              <b-form-input
                v-model="pwd"
                type="password"
                placeholder="Enter New Password"
                class="mt-5"
              ></b-form-input>
              <div v-if="validateCurrentPassword" class="floating-placeholder">
                <span>{{errorMessage}}</span>
              </div>
              <div v-if="pwdError" class="floating-placeholder">
                <span>{{pwdError}}</span>
              </div>
              <b-form-input
                v-model="re_pwd"
                type="password"
                placeholder="Re-Enter New Password"
                class="mt-3"
              ></b-form-input>
              <div v-if="validateConfirmPassword" class="floating-placeholder">
                <span>{{errorMessage}}</span>
              </div>
              <div v-if="repwdError" class="floating-placeholder">
                <span>{{repwdError}}</span>
              </div>
              <div v-if="pwdnotCorrect" class="floating-placeholder">
                <span>{{pwdnotCorrect}}</span>
              </div>
              <b-button
                variant="primary"
                class="btn-primary mt-5 ml-auto px-5"
                @click="updatePasswordSubmit"
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
      currentPassword: "",
      pwd: "",
      re_pwd: "",
      submitDetailsError: false,
      errorMessage: '',
      currentError: '',
      pwdError: '',
      repwdError: '',
      pwdnotCorrect: '',
      loader: '',
    };
  },
  computed: {
    validateCurrentPassword(){
      const currentPassowrd = this.pwd;
      const recievedPassword = this.passwordValidation(currentPassowrd);
      if (recievedPassword) {
        //eslint-disable-next-line
        this.submitDetailsError = true;
        //eslint-disable-next-line
        this.submitErrorMessage = '';
        //eslint-disable-next-line
        this.pwdError = '';
        //eslint-disable-next-line
        this.pwdnotCorrect = '';
        return true;
      }
      //eslint-disable-next-line
      this.submitDetailsError = false;
      //eslint-disable-next-line
      this.pwdError = '';
      return false;
    },
    validateConfirmPassword(){
      const currentPassowrd = this.re_pwd;
      const recievedPassword = this.passwordValidation(currentPassowrd);
      if (recievedPassword) {
        //eslint-disable-next-line
        this.submitDetailsError = true;
        //eslint-disable-next-line
        this.submitErrorMessage = '';
        //eslint-disable-next-line
        this.repwdError = '';
        //eslint-disable-next-line
        this.pwdnotCorrect = '';
        return true;
      }
      //eslint-disable-next-line
      this.submitDetailsError = false;
      //eslint-disable-next-line
      this.repwdError = '';
      return false;
    },
  },
  methods: {
    nav_login() {
      this.$router.push("login");
    },
    async updatePasswordSubmit() {
      if (!this.currentPassword || !this.pwd || this.re_pwd) {
        this.currentError = 'Please enter the current password';
        this.pwdError = 'Please enter the new password';
        this.repwdError = 'Please enter the confirm password';

      }
      if (this.currentPassword) {
        this.pwdnotCorrect = '';
        this.currentError = '';
      }
      if (this.pwd) {
        this.pwdnotCorrect = '';
        this.pwdError = '';
      }
      if (this.re_pwd) {
        this.pwdnotCorrect = '';
        this.repwdError = '';
      }
      if (this.pwd && this.re_pwd && this.currentPassword && this.submitDetailsError === false) {
        if (this.pwd !== this.re_pwd) {
          this.pwdnotCorrect = 'Password do not match please enter the correct password'
        } else {
          const userDetails = {
            OldPassword: this.currentPassword,
            Paassword: this.re_pwd
          }
          try {
            this.loader = true;
            const responseData = await this.$store.dispatch('Authentication/updatePassword', userDetails);
            console.log('responseData', responseData);
            this.loader = false;
          } catch (error) {
            this.loader = false;
          }
        }
      }
    },
    passwordValidation(currentPassowrd) {
      if (currentPassowrd.length > 0) {
        if (currentPassowrd.length < 8) {
          //eslint-disable-next-line
          this.errorMessage = "Your password must be at least 8 characters";
          return true;
        }
        if (currentPassowrd.search(/[a-z]/i) < 0) {
          //eslint-disable-next-line
          this.errorMessage = "Your password must contain at least one letter.";
          return true;
        }
        if (currentPassowrd.search(/[0-9]/) < 0) {
          //eslint-disable-next-line
          this.errorMessage = "Your password must contain at least one digit.";
          return true;
        }
        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(currentPassowrd)) {
          //eslint-disable-next-line
          this.errorMessage = "Password must have at least one Uppercase Character.";
          return true;
        }
      
        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(currentPassowrd)) {
          //eslint-disable-next-line
          this.errorMessage =  "Password must have at least one Lowercase Character.";
          return true;
        }

        const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/;
        if (!isContainsSymbol.test(currentPassowrd)) {
          //eslint-disable-next-line
          this.errorMessage = "Password must contain at least one Special Symbol.";
          return true;
        }
        return false;
      }
      //eslint-disable-next-line
      this.errorMessage = '';
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
.logo_img {
  max-height: 50px;
}
.floating-placeholder {
  color: red;
  font-size: 14px;
  text-align: -webkit-left;
}
</style>
