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
            <b-card
              v-if="currentStep == 1"
              class="card-style"
              title="Create QQPay Account"
            >
              <b-card-text
                >Let's start the sign up process with your personal/professional Email ID</b-card-text
              >
              <b-input-group size="lg" class="mt-3">
                <b-input-group-prepend is-text>
                  <b-icon icon="envelope"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  type="email"
                  v-model="user_details.email"
                  placeholder="Email ID"
                ></b-form-input>
              </b-input-group>
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNext"
                >Next</b-button
              >
            </b-card>
            <b-card
              v-if="currentStep == 2"
              class="card-style"
              title="What kind of account would you like to open?"
            >
              <b-card-text>Account type selection</b-card-text>
              <b-button-group size="lg">
                <b-button
                  pressed.sync="false"
                  variant="light"
                  size="lg"
                  class="px-5 py-3"
                >
                  <b-icon
                    icon="person-circle"
                    style="width: 80px; height: 80px; color: #b4b4b4"
                  ></b-icon>
                  <br />
                  Personal
                  <br />
                  <small
                    >Send, spend, and receive around the world for less.</small
                  >
                </b-button>
                <b-button
                  pressed.sync="false"
                  variant="light"
                  size="lg"
                  class="px-5 py-3"
                >
                  <b-icon
                    icon="briefcase-fill"
                    style="width: 80px; height: 80px; color: #b4b4b4"
                  ></b-icon>
                  <br />
                  Business
                  <br />
                  <small>Do business or freelance work internationally.</small>
                </b-button>
              </b-button-group>
              <b-button
                class="float-left mt-5 px-5"
                variant="outline-secondary"
                @click="onClickBack"
                >Back</b-button
              >
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNext"
                >Next</b-button
              >
            </b-card>
            <b-card
              v-if="currentStep == 3"
              class="card-style"
              title="Select the Country you are currently residing."
            >
              <b-card-text
                >This will be the source country for all of your
                transactions</b-card-text
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
                >Back</b-button
              >
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNext"
                >Next</b-button
              >
            </b-card>
            <b-card
              v-if="currentStep == 4"
              class="card-style"
              title="Verify your phone number with a OTP"
            >
              <b-card-text>It helps us keep your account secure.</b-card-text>
              <b-input-group size="lg" class="mt-3" v-if="!otp_verify">
                <b-input-group-prepend is-text> +60 </b-input-group-prepend>
                <b-form-input
                  type="number"
                  v-model="user_details.phone"
                  placeholder="Phone Number"
                ></b-form-input>
              </b-input-group>
              <b-input-group size="lg" class="mt-3" v-else>
                <b-form-input
                  type="number"
                  v-model="user_details.phone"
                  placeholder="Enter OTP"
                ></b-form-input>
              </b-input-group>
              <b-button
                class="float-left mt-5 px-5"
                variant="outline-secondary"
                @click="onClickBack"
                >Back</b-button
              >
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNext"
                >Get OTP</b-button
              >
            </b-card>
            <b-card
              v-if="currentStep == 5"
              class="card-style"
              title="Let us know your Good Name"
            >
              <b-card-text
                >You are almost there to finish the sign up
                process!</b-card-text
              >
              <b-form-input
                v-model="user_details.f_name"
                placeholder="First Name"
                class="mt-3"
                size="lg"
              ></b-form-input>
              <b-form-input
                v-model="user_details.l_name"
                placeholder="Last Name"
                class="mt-3"
                size="lg"
              ></b-form-input>
              <b-button
                class="float-left mt-5 px-5"
                variant="outline-secondary"
                @click="onClickBack"
                >Back</b-button
              >
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNext"
                >Next</b-button
              >
            </b-card>
            <b-card
              v-if="currentStep == 6"
              class="card-style"
              title="Set Your Account Password"
            >
              <b-card-text
                >Set a strong password and finish the sign up
                process!</b-card-text
              >
              <b-form-input
                v-model="user_details.f_name"
                placeholder="Password"
                type="password"
                class="mt-3"
                size="lg"
              ></b-form-input>
              <b-form-group
                class="mt-3 text-left"
                description="Min. 8 characters, one upper & lowercase, one number, one special character."
              >
                <b-form-input
                  v-model="user_details.l_name"
                  placeholder="Re-Enter Password"
                  size="lg"
                ></b-form-input>
              </b-form-group>
              <b-button
                class="float-left mt-5 px-5"
                variant="outline-secondary"
                @click="onClickBack"
                >Back</b-button
              >
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNext"
                >Create Account</b-button
              >
            </b-card>
            <label
              >By Signing up you agree to our
              <b-link @click="$router.push('/forgotpassword')"
                >Terms & Condtions</b-link
              >
              and
              <b-link @click="$router.push('/forgotpassword')"
                >Privacy Policy</b-link
              ></label
            >
            <b-alert v-model="showError" variant="danger" dismissible>
              {{ error_txt }}
            </b-alert>
            <br />
            <br />
            <label class="mt-4"
              >Already have an account?
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
      <template #modal-footer="{ ok }">
        <b-button variant="primary" @click="ok()"> OK </b-button>
      </template>
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
        { text: "Email" },
        { text: "Account Type" },
        { text: "Country" },
        { text: "2FA" },
        { text: "Your Name" },
        { text: "Set Password" },
      ],
      currentStep: 1,
      user_details: {
        f_name: "",
        l_name: "",
        account_type: "Personal",
        country: "Malaysia",
        email: "",
        phone: "",
      },
      error_txt: "",
      showError: false,
      showModal: false,
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
    ...mapGetters("Common", ["user_details"]),
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
      this.$router.push("updatepassword");
      console.log(this.user_details);
    },
    onClickNext: function () {
      this.currentStep++;
    },
    onClickBack: function () {
      this.currentStep--;
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
</style>
