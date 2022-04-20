<template>
  <div class="login">
    <div class="my-5">
      <b-container>
        <b-row align-v="center" align-h="center" class="my-auto">
          <b-col col sm="12" md="12" lg="6" class="mt-5">
            <b-jumbotron bg-variant="light" text-variant="secondary">
              <template #header><img
                alt="QQ Pay"
                class="logo_img_lg"
                src="../../assets/master_logo.png"
              /></template>

              <template #lead>
                {{$t('loginScreen.paymentAccrossGlb')}}
              </template>

              <hr class="my-4">

              <p>
              {{$t('loginScreen.paymentSubheader')}}
              </p>
            </b-jumbotron>
          </b-col>
          
          <b-col col sm="12" md="12" lg="5">
            <b-alert
              :show="dismissCountDown"
              dismissible
              fade
              variant="danger"
              @dismiss-count-down="countDownChanged"
            >
              {{submitError}}
            </b-alert>
            <b-card :header="$t('loginScreen.signin')" header-tag="header" class="mt-2">
              <b-form-input
                v-model="user_details.email"
                type="email"
                placeholder="someone@example.com"
                class="mt-3"
              ></b-form-input>
              <div v-if="validateEmail" class="floating-placeholder">
                <span >{{errorMessage}}</span>
              </div>
              <b-form-input
                v-model="user_details.password"
                type="password"
                placeholder="Password"
                class="my-3"
              ></b-form-input>
              <div v-if="validateCurrentPassword" class="floating-placeholder">
                <span>{{errorMessage}}</span>
              </div>
              <div v-if="submitErrorMessage" class="floating-placeholder">
                <span>{{submitErrorMessage}}</span>
              </div>
              <b-link @click="$router.push('/forgotpassword')">{{$t('loginScreen.forgotPassword')}}?</b-link>
              <b-button
                variant="primary"
                @click="onClickLogin"
                class="btn-primary mt-4 ml-auto px-5"
                ><div class="button-loader" v-if="loader">
                  <span class="spinner-border spinner-border-sm"></span>
                </div>
                <div v-else>{{$t('loginScreen.signin')}}</div>
              </b-button>
            </b-card>
            
            <b-card class="mt-3" size="lg">
              <div class="div-signup" @click="$router.push('/signup')">
                <b-icon icon="person-lines-fill" scale="1.2" aria-hidden="true"></b-icon
                >&nbsp;&nbsp;{{$t('loginScreen.singnupOption')}}
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from "@/components/navigations/Footer.vue";

export default {
  name: "Login",
  components: {
    Footer,
  },
  data() {
    return {
      user_details: {
        email: "",
        password: "",
      },
      submitErrorMessage: '',
      emailError: false,
      errorOnSubmit: false,
      errorMessage: "",
      submitDetailsError: false,
      loader: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      submitError: '',
    };
  },
  computed: {
    validateEmail(){
      const email = this.user_details.email;
      if (email) {
        //eslint-disable-next-line
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          //eslint-disable-next-line
          this.errorMessage =  " " ;
          //eslint-disable-next-line
          this.emailError = false;
           //eslint-disable-next-line
          this.errorOnSubmit = false;
          //eslint-disable-next-line
          this.submitErrorMessage = '';
          return false;
        } else {
          //eslint-disable-next-line
          this.errorMessage = "Please Enter the valid email address";
          //eslint-disable-next-line
          this.emailError = true;
           //eslint-disable-next-line
          this.errorOnSubmit = true;
          //eslint-disable-next-line
          this.submitErrorMessage = '';
          return true;
        }
      } else {
        //eslint-disable-next-line
        this.emailError = true;
        //eslint-disable-next-line
        this.errorOnSubmit = true;
        //eslint-disable-next-line
        this.submitErrorMessage = '';
        return false;
      }
    },
    validateCurrentPassword(){
      const currentPassowrd = this.user_details.password;
      const recievedPassword = this.passwordValidation(currentPassowrd);
      console.log('reciev', recievedPassword);
      if (recievedPassword) {
        //eslint-disable-next-line
        this.errorOnSubmit = true;
        //eslint-disable-next-line
        this.submitErrorMessage = '';
        //eslint-disable-next-line
        this.emailError = false;
        //eslint-disable-next-line
        return true;
      }
      //eslint-disable-next-line
      this.errorOnSubmit = false;
      //eslint-disable-next-line
      this.submitErrorMessage = '';
      //eslint-disable-next-line
      this.emailError = false;
      //eslint-disable-next-line
      return false;
    },
  },
  methods: {
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
    async onClickLogin() {
      if (!this.user_details.email || !this.user_details.password) {
        this.submitErrorMessage = 'Please Enter the email and password';
      }
      if (this.user_details.email && this.user_details.password && this.errorOnSubmit === false) {
        const userDetails = {
          User_Email: this.user_details.email,
          Password: this.user_details.password,
        }
        try {
          this.loader = true;
          const responseData = await this.$store.dispatch('Authentication/login', userDetails);
          if (responseData && responseData.status === 200) {
            const access_token = responseData.data.data[0];
            localStorage.setItem('access_token', access_token)
            this.loader = false
            this.errorOnSubmit = false;
            this.submitErrorMessage = '';
            this.submitError = '';
            this.$router.push({name: 'Beneficiary'})
          }else if (responseData && responseData.status === 401) {
            this.loader = false
            this.errorOnSubmit = false;
            this.dismissCountDown = this.dismissSecs
            this.submitError = 'Please provde the correct email and password';
          } else {
            this.submitError = 'Login api is not working please wait sometime';
            this.dismissCountDown = this.dismissSecs
            this.loader = false;
          }
        } catch (error) {
          this.loader = false
        }
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
  }
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
.lead {
  font-weight: 400;
  color: $txt;
}
.logo_img {
  max-height: 50px;
}
.logo_img_lg {
  max-height: 100px;
}
.div-signup {
  color: $txt;
  cursor: pointer;
}
.login {
  height: 100%;
}
.floating-placeholder {
  color: red;
  font-size: 14px;
  text-align: -webkit-left;
}
</style>
