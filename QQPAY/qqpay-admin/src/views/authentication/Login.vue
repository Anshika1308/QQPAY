<template>
  <div class="login">
    <div class="my-5">
      <b-container>
        <b-row align-v="center" align-h="center" class="my-auto">
          <b-col col sm="12" md="1" lg="6" class="mt-5">
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
              {{errorMessage}}
            </b-alert>
            <b-card :header="$t('loginScreen.signin')" header-tag="header" class="mt-2">
              <b-form-input
                v-model="userEmail"
                type="email"
                placeholder="someone@example.com"
                class="mt-3"
                id="email"
                name="email"
                :class="{ 'is-invalid': $v.userEmail.$error }"
              ></b-form-input>
              <span v-if="isSubmitted && !$v.userEmail.required" class="invalid-feedback">
                Email field is required
              </span>
              <span v-if="isSubmitted && !$v.userEmail.email" class="invalid-feedback">
                Email is not correct Please enter the valid email
              </span>
              <b-form-input
                v-model="userPassword"
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                class="my-3"
                :class="{ 'is-invalid': $v.userPassword.$error }"
              ></b-form-input>
              <span v-if="isSubmitted && !$v.userPassword.required" class="invalid-feedback">
                Password field is required
              </span>
              <!-- <b-link @click="$router.push('/forgotpassword')">{{$t('loginScreen.forgotPassword')}}?</b-link> -->
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
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import {
  required, email,
} from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      userEmail: '',
      userPassword: '',
      loader: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      errorMessage: '',
      isSubmitted: false,
    };
  },
  validations() {
    return {
      userEmail: {
        required,
        email,
      },
      userPassword: {
        required,
      }
    }
 
  },
  methods: {
    async onClickLogin() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const userDetails = {
        User_Email: this.userEmail,
        Password: this.userPassword,
      }
      this.loader = true;
      const responseData = await this.$store.dispatch('AuthenticationService/login', userDetails);
      if (responseData && responseData.data[0].is_admin) {
        const isPermitted = true;
        // const token = responseData.data[0].token;
        localStorage.setItem('isPermitted', isPermitted);
        // localStorage.setItem('token', token);
        this.loader = false
        this.$store.commit("app/set_token", responseData.data[0].token);
        this.$router.push({name: 'Home'})
        // location.reload();
      } else {
        this.loader = false;
        this.errorMessage = 'User is not permitted to access admin portal';
        this.dismissCountDown = this.dismissSecs;
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
.language-selection {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button#input-type__BV_toggle_ {
  font-size: 10px;
}
</style>
