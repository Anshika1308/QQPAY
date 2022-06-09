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
      // const userData = {
      //   User_Email: "string",
      //   Password: "string",
      //   User_Type: "string",
      //   FirstName: "string",
      //   LastName: "string",
      //   Is_Back_Office_User: false,
      //   middle_name: "string",
      //   date_of_joining: "2022-06-09",
      //   pincode: "string",
      //   nationality: "string",
      //   personal_email: "string",
      //   alternative_phone_number: "string",
      //   designation: "string",
      //   department: "string",
      //   sub_division: "string"
      // }
      const userDetails = {
        User_Email: this.userEmail,
        Password: this.userPassword,
      }
      try {
        this.loader = true;
        const responseData = await this.$store.dispatch('AuthenticationService/login', userDetails);
        console.log('responseData', responseData);
        if (responseData && responseData.status === 200) {
          const access_token = responseData.data.data[0];
          localStorage.setItem('access_token', access_token)
          this.loader = false
          this.errorMessage = '';
          this.$router.push({name: 'Home'})
        }else {
          this.loader = false;
          this.errorMessage = responseData.response.data.message;
          this.dismissCountDown = this.dismissSecs;
        }
      } catch (error) {
        this.loader = false;
        this.errorMessage = 'Server is down please connect after some time'
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
.btn-primary {
  background-image: linear-gradient(to right, #b99bf5 0%, #ff6b00 51%, #ff6b00 100%) !important;
}
</style>
