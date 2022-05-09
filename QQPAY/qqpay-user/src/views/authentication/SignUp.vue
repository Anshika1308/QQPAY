<template>
  <div class="login">
    <NavBar />
    <div class="my-5">
      <b-container>
        <b-row align-v="center" align-h="center" class="my-auto">
          <b-col col sm="12" md="12" lg="12">
            <step-progress
              :current="currentStep"
              :steps="steps"
            ></step-progress>
          </b-col>
        </b-row>
        <b-row align-v="center" align-h="center" class="text-center mt-5">
          <b-col col sm="12" md="12" lg="8">
            <b-alert
              :show="countDownAlert"
              dismissible
              fade
              variant="danger"
              @dismiss-count-down="countDownSubmit"
            >
              This email already registered please provide different Email
            </b-alert>
            <b-card
              v-if="currentStep == 1"
              class="card-style"
              :title="$t('createQQPay')"
            >
              <b-card-text
                >{{$t('signupProcess')}}</b-card-text
              >
              <b-input-group size="lg" class="mt-3">
                <b-input-group-prepend is-text>
                  <b-icon icon="envelope"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  type="email"
                  v-model="user_details.email"
                  :placeholder="$t('emailID')"
                  trim
                ></b-form-input>
              </b-input-group>
              <div v-if="validateEmail" class="floating-placeholder">
                <span>{{errorMessage}}</span>
              </div>
              <div v-if="errorOnSubmit" class="floating-placeholder">
                <span >{{submitErrorMessage}}</span>
              </div>
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNextEmail"
                >{{$t('next')}}
              </b-button>
              <div class="spinner-border m-5" role="status" v-if="loader">
                <span class="sr-only">Loading...</span>
              </div>
            </b-card>

            <!-- ---------------------------Occupation Section  ------------------------------------------->
            <b-card
              v-if="currentStep == 2"
              class="card-style"
              :title="$t('openaccountType')"
            >
              <b-card-text>{{$t('accountSelection')}}</b-card-text>
              <b-button-group size="lg">
                <b-button
                  pressed.sync="false"
                  variant="light"
                  size="lg"
                  class="px-5 py-3"
                  @click="onClickPersonalAccount"
                >
                  <b-icon
                    icon="person-circle"
                    style="width: 80px; height: 80px; color: #b4b4b4"
                  ></b-icon>
                  <br />
                  {{$t('personal')}}
                  <br />
                  <small
                    >{{$t('personalQuotes')}}</small
                  >
                </b-button>
                <b-button
                  pressed.sync="false"
                  variant="light"
                  size="lg"
                  class="px-5 py-3"
                  @click="onClickBusinessAccount"
                >
                  <b-icon
                    icon="briefcase-fill"
                    style="width: 80px; height: 80px; color: #b4b4b4"
                  ></b-icon>
                  <br />
                  {{$t('business')}}
                  <br />
                  <small>{{$t('businessQuotes')}}.</small>
                </b-button>
              </b-button-group>
              <b-button
                class="float-left mt-5 px-5"
                variant="outline-secondary"
                @click="onClickBack"
                >{{$t('backLabel')}}</b-button
              >
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNextAccountType"
                >{{$t('nextLabel')}}</b-button
              >
            </b-card>

            <!-- ---------------------------Country Section  ------------------------------------------->

            <b-card
              v-if="currentStep == 3"
              class="card-style"
              :title="$t('countryResiding')"
            >
              <b-card-text
                >{{$t('sourceCountry')}}</b-card-text
              >
              <b-dropdown
                id="input-type"
                :text="user_details.country"
                class="wd-100p"
                variant="light"
                size="lg"
              >
                <b-dropdown-item
                  v-for="option in country_options"
                  :key="option.value"
                  :value="option.value"
                  @click="user_details.country = option.value"
                >
                  {{ option.text }}
                </b-dropdown-item>
              </b-dropdown>
              <b-button
                class="float-left mt-5 px-5"
                variant="outline-secondary"
                @click="onClickBack"
                >{{$t('backLabel')}}</b-button>
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNextCountry"
                >{{$t('nextLabel')}}</b-button
              >
            </b-card>
            <!-- ---------------------------Phone Detail Section  ------------------------------------------->

            <b-card
              v-if="currentStep == 4"
              class="card-style"
              :title="$t('verifyPhone')"
            >
              <b-card-text>{{$t('helpups')}}.</b-card-text>
              <b-input-group size="lg" class="mt-3" v-if="!otp_verify">
                <b-input-group-prepend is-text> +60 </b-input-group-prepend>
                <b-form-input
                  type="number"
                  v-model="user_details.phone"
                  :placeholder="$t('phoneNumber')"
                ></b-form-input>
              </b-input-group>
              <b-input-group size="lg" class="mt-3" v-else>
                <b-form-input
                  type="number"
                  v-model="user_details.phone"
                  placeholder="Enter OTP"
                ></b-form-input>
              </b-input-group>
              <div v-if="onChangePhone" class="floating-placeholder">
                <span>{{errorMessage}}</span>
              </div>
              <div v-if="errorOnSubmit" class="floating-placeholder">
                <span>{{submitErrorMessage}}</span>
              </div>
              <b-button
                class="float-left mt-5 px-5"
                variant="outline-secondary"
                @click="onClickBack"
                >{{$t('backLabel')}}</b-button
              >
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNextOtp"
                >{{$t('getOTP')}}</b-button
              >
            </b-card>
            <!-- ---------------------------Personal Detail Section  ------------------------------------------->

            <b-card
              v-if="currentStep == 5"
              class="card-style"
              :title="$t('goodName')"
            >
              <b-card-text
                >{{$t('finisProcess')}}!</b-card-text
              >
              <b-form-input
                v-model="user_details.f_name"
                :placeholder="$t('fName')"
                class="mt-3"
                size="lg"
              ></b-form-input>
              <div v-if="validateName" class="floating-placeholder">
                <span>{{errorMessage}}</span>
              </div>
              <b-form-input
                v-model="user_details.l_name"
                :placeholder="$t('lName')"
                class="mt-3"
                size="lg"
              ></b-form-input>
              <div v-if="validateName" class="floating-placeholder">
                <span>{{errorMessage}}</span>
              </div>
              <div v-if="errorOnSubmit" class="floating-placeholder">
                <span>{{submitErrorMessage}}</span>
              </div>
              <b-button
                class="float-left mt-5 px-5"
                variant="outline-secondary"
                @click="onClickBack"
                >{{$t('backLabel')}}</b-button
              >
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNextName"
                >{{$t('nextLabel')}}</b-button
              >
            </b-card>
            <b-alert
              :show="dismissCountDown"
              dismissible
              fade
              variant="danger"
              @dismiss-count-down="countDownChanged"
            >
              Sign up api is not working please try again in some time
            </b-alert>

            <!-- ---------------------------Password Detail Section  ------------------------------------------->

            <b-card
              v-if="currentStep == 6"
              class="card-style"
              :title="$t('setAccountPass')"
            >
              <b-card-text
                >{{$t('setStrongPassword')}}!</b-card-text
              >
              <b-form-input
                v-model="user_details.password"
                :placeholder="$t('currentPass')"
                type="password"
                class="mt-3"
                size="lg"
              ></b-form-input>
              <div v-if="validateCurrentPassword" class="floating-placeholder">
                <span>{{errorMessage}}</span>
              </div>
              <b-form-group
                class="mt-3 text-left"
                :description="$t('passwordStrength')"
              >
                <b-form-input
                  v-model="user_details.comfirmPassword"
                  :placeholder="$t('confirmPass')"
                  type="password"
                  size="lg"
                ></b-form-input>
              </b-form-group>
              <div v-if="errorOnSubmit" class="floating-placeholder">
                <span>{{submitErrorMessage}}</span>
              </div>
              <b-button
                class="float-left mt-5 px-5"
                variant="outline-secondary"
                @click="onClickBack"
                >{{$t('backLabel')}}</b-button
              >
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onSubmitAccount"
                >
                <div class="button-loader" v-if="loader">
                  <span class="spinner-border spinner-border-sm"></span>
                </div>
                <div v-else>Create Account</div>
                </b-button
              >
            </b-card>
            
            <div class="label-policy">
              <b-checkbox />
              <label
                >{{$t('signupAgree')}}
                <b-link @click="$router.push('/forgotpassword')"
                  >Terms & Condtions</b-link
                >
                and
                <b-link @click="$router.push('/forgotpassword')"
                  >Privacy Policy</b-link
                ></label
              >
            </div>
            <b-alert v-model="showError" variant="danger" dismissible>
              {{ error_txt }}
            </b-alert>
            <br />
            <br />
            <label class="mt-4"
              >{{$t('alreadyAccount')}}
              <b-link @click="$router.push('/login')"
                >Log in</b-link
              ></label
            >
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-modal
      id="modal-otp"
      ref="modal"
      title="Send OTP"
      @ok="nav_update"
      centered
      v-model="showModal"
      variant="primary"
    >
      Your Account has been Created Successfully and an OTP has been send to
      your Email ID & Phone Number
    </b-modal>
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StepProgress from "@/components/tools/StepProgress.vue";
import NavBar from "@/components/navigations/NavBarLarge.vue";
import Footer from "@/components/navigations/Footer.vue";

export default {
  name: "Login",
  components: {
    "step-progress": StepProgress,
    NavBar,
    Footer
  },
  data() {
    return {
      otp_verify: false,
      steps: [
        { text: this.$t('email') },
        { text: this.$t('accountType') },
        { text: this.$t('country') },
        { text: this.$t('security') },
        { text: this.$t('name') },
        { text: this.$t('setPwd') },
      ],
      currentStep: 1,
      user_details: {
        f_name: "",
        l_name: "",
        account_type: "Personal",
        country: "Malaysia",
        email: "",
        phone: "",
        password: "",
        comfirmPassword: "",
      },
      error_txt: "",
      errorMessage: "",
      errorOnSubmit: false,
      submitDetailsError: false,
      submitErrorMessage: '',
      emailError: false,
      showError: false,
      showModal: false,
      alertError: '',
      loader: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      countDownAlert: 0,
      account_options: [
        {
          text: "Personal",
          value: "Personal",
        },
        {
          text: "Business",
          value: "Business",
        },
      ],
      country_options: [
        {
          text: "Malaysia",
          value: "Malaysia",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("Common"),
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
          return true;
        } else {
          //eslint-disable-next-line
          this.errorMessage = "Please Enter the valid email address";
          //eslint-disable-next-line
          this.emailError = true;
           //eslint-disable-next-line
          this.errorOnSubmit = false;
          return true;
        }
      } else {
        //eslint-disable-next-line
        this.emailError = true;
        //eslint-disable-next-line
        this.errorOnSubmit = false;
        return false;
      }
    },
    validateCurrentPassword(){
      const currentPassowrd = this.user_details.password;
      const recievedPassword = this.passwordValidation(currentPassowrd);
      if (recievedPassword) {
        //eslint-disable-next-line
        this.submitDetailsError = true;
        //eslint-disable-next-line
        this.submitErrorMessage = '';
        return true;
      }
      //eslint-disable-next-line
      this.submitDetailsError = false;
      return false;
    },
    onChangePhone() {
      if (this.user_details.phone.length >= 10) {
        //eslint-disable-next-line
        this.errorOnSubmit = false;
        //eslint-disable-next-line
        this.submitErrorMessage = '';
        //eslint-disable-next-line
        this.errorMessage = '';
        return true;
      } else if (this.user_details.phone.length >= 1 &&
        this.user_details.phone.length <= 10){
         //eslint-disable-next-line
        this.errorOnSubmit = '';
        //eslint-disable-next-line
        this.errorMessage = 'Please enter the valid phone number';
        return true;
      } else  {
        //eslint-disable-next-line
        this.errorMessage = '';
        return true;
      }
    },
    validateName() {
      if (this.user_details.f_name && this.user_details.l_name) {
        //eslint-disable-next-line
        this.errorOnSubmit = '';
        return true;
      } else {
        return true;
      }
    },
  },
  methods: {
    submit_user_details() {
      var isEmpty = Object.values(this.user_details).some(
        (x) => x === null || x === ""
      );
      if (isEmpty) {
        this.error_txt = "Please fill all fields";
        this.showError = true;
      } else {
        this.showModal = true;
      }
    },
    nav_update() {
      this.$store.state.Common.user_details = this.user_details;
      this.$router.push("login");
      console.log(this.user_details);
    },
    async onClickNextEmail() {
      if (this.user_details.email && this.emailError === false) {
        this.errorMessage = '';
        this.errorOnSubmit = false;
        this.submitErrorMessage = '';
        const userDetails = {
          User_Email: this.user_details.email
        }
        try {
          this.loader = true;
          const responseData = await this.$store.dispatch('Authentication/registerEmail', userDetails);
          const { status_code } = responseData;
          if (status_code === 200) {
            this.loader = false;
            this.currentStep++;
          } else {
            this.countDownAlert = this.dismissSecs
            this.loader = false;
          }
        } catch (error) {
          console.log('error', error);
          this.loader = false
        }
      } else {
        this.errorOnSubmit = true;
        this.errorMessage = '';
        this.submitErrorMessage = "Please enter the email address" 
      }
    },
    onClickNextAccountType() {
      this.currentStep++;
    },
    onClickNextCountry() {
      this.currentStep++;
    },
    onClickNextOtp() {
      if (this.user_details.phone) {
        this.currentStep++;
        this.errorMessage = "";
        this.submitErrorMessage = '';
      } else {
        this.errorOnSubmit = true;
        this.submitErrorMessage = "Please Enter the phone number";
      }
    },
    onClickNextName() {
      if (this.user_details.f_name && this.user_details.l_name) {
        this.currentStep++;
        this.errorMessage = "";
        this.submitErrorMessage = '';
      } else {
        this.errorOnSubmit = true;
        this.submitErrorMessage = "Please Enter First and Last Name";
      }
    },
    onClickBack: function () {
      this.currentStep--;
    },
    onClickPersonalAccount() {
      this.user_details.account_type = 'PER';
    },
    onClickBusinessAccount() {
      this.user_details.account_type = 'BUS';
    },
    async onSubmitAccount() {
      const currentPass = this.user_details.password;
      const confirmPass = this.user_details.comfirmPassword;

      if (currentPass && confirmPass && this.submitDetailsError === false) {
        if (currentPass === confirmPass) {
          const userDetails = {
            User_Email: this.user_details.email,
            Password: this.user_details.password,
            User_Type: this.user_details.account_type,
            FirstName: this.user_details.f_name,
            LastName: this.user_details.l_name
          }
          try {
            this.loader = true;
            const responseData = await this.$store.dispatch('Authentication/registerAccount', userDetails);
            if (responseData && responseData.status === 200) {
              this.showModal = true;
              this.loader = false
              this.errorOnSubmit = false;
              this.submitErrorMessage = '';
              this.currentStep++;
            } else {
              this.countDownAlert = this.dismissSecs
              this.loader = false;
              this.showModal = false;
            }
          } catch (error) {
            this.loader = false
            this.showModal = false;
          }
        }
      }
      if(currentPass.length > 0 && confirmPass.length > 0 ) {
        if (currentPass !== confirmPass) {
          this.errorOnSubmit = true;
          this.submitErrorMessage = "Password do not match Please enter the correct password";
        }
      }
      if (!currentPass && confirmPass) {
        this.errorOnSubmit = true;
        this.submitErrorMessage = "Please enter the Current Passowrd ";
        this.errorMessage = '';
      }
      if (currentPass && !confirmPass) {
        this.errorOnSubmit = true;
        this.submitErrorMessage = "Please enter the Confirm Passowrd";
        this.errorMessage = '';
      }
      if (!currentPass && !confirmPass) {
        this.errorOnSubmit = true;
        this.submitErrorMessage = "Please enter the both Passowrd"
        this.errorMessage = '';
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
    
    // set the timer for the alert to fade away
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

    // set timer for email verify error to fade
    countDownSubmit(countDownDismiss) {
      this.countDownAlert = countDownDismiss
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
.btn-light {
  font-weight: bold;
  color: $dimgrey;
  background: $white;
  margin: 0 5px;
  &:not(:disabled) {
    &:not(.disabled).active {
      color: $secondary;
    }
    &:not(.disabled) {
      &:active {
        color: $secondary;
      }
    }
  }
  &:hover {
      border: 1px solid $txt !important;
      color: $dimgrey;
      background: $white;
  }
}
::v-deep ul {
  list-style-type: none !important;
}
.card-title {
  color: $dimgrey;
}
.card-text {
  color: $lightslategrey;
}
label {
  color: $lightslategrey;
}
.logo_img {
  max-height: 70px;
}
.div-signup {
  color: $primary;
  cursor: pointer;
}
::v-deep .btn-light {
  border: 1px solid #d3d3d3 !important;
}
.card {
  border: none;
}
.floating-placeholder {
  color: red;
  font-size: 14px;
  text-align: -webkit-left;
}
.label-policy {
  display: flex;
}
// .validation-error {
//   margin-right: 363px;
// }
</style>
