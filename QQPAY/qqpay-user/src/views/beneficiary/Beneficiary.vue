<template>
  <div class="beneficiary">
    <NavBar />
    <div class="page-body">
      <TitleBar title="Add Beneficiary" />
      <b-container>
        <b-row align-v="center" align-h="center" class="mt-5">
          <b-col col sm="12" md="12" lg="12">
            <step-progress
              :current="currentStep"
              :steps="steps"
            ></step-progress>
          </b-col>
        </b-row>
        <b-row align-h="center" class="my-5">
          <b-col col sm="12" md="12" lg="8">
            <b-card
              v-if="currentStep == 1"
              class="card-style"
              title="What kind of beneficiary would you like to add?"
            >
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
                  Individual
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
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNext"
                >Next</b-button
              >
            </b-card>
            <b-card
              v-if="currentStep == 2"
              class="card-style"
              title="Let us get some basic details of the beneficiary"
            >
              <b-form-group
                label="Full name of the beneficiary"
                label-for="input-name"
              >
                <b-form-input
                  id="input-name"
                  v-model="beneficiary.name"
                ></b-form-input>
              </b-form-group>
              <b-row>
                <b-col
                  ><b-form-group
                    label="Beneficiary Country"
                    label-for="input-country"
                  >
                    <b-dropdown
                      id="input-country"
                      :text="beneficiary.country"
                      class="wd-100p"
                      variant="light"
                    >
                      <b-dropdown-item
                        v-for="option in country_options"
                        :key="option.value"
                        :value="option.value"
                        @click="beneficiary.country = option.value"
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-form-group></b-col
                >
                <b-col
                  ><b-form-group
                    label="Relationship"
                    label-for="input-relation"
                  >
                    <b-dropdown
                      id="input-relation"
                      :text="beneficiary.relationship"
                      class="wd-100p"
                      variant="light"
                    >
                      <b-dropdown-item
                        v-for="option in relation_options"
                        :key="option.value"
                        :value="option.value"
                        @click="beneficiary.relationship = option.value"
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-form-group></b-col
                >
              </b-row>
              <b-row>
                <b-col>
                  <b-form-group
                    label="Phone Number"
                    description="(Optional)"
                    label-for="input-phone"
                  >
                    <b-form-input
                      id="input-phone"
                      type="number"
                      v-model="beneficiary.phone"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    label="Email Address"
                    description="(Optional)"
                    label-for="input-email"
                  >
                    <b-form-input
                      id="input-email"
                      type="email"
                      v-model="beneficiary.email"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
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
              title="Please enter address of the beneficiary"
            >
              <b-form-group
                label="Address"
                description="(Optional)"
                label-for="input-address"
              >
                <b-form-textarea
                  rows="3"
                  max-rows="6"
                  id="input-address"
                  v-model="beneficiary.address"
                ></b-form-textarea>
              </b-form-group>

              <b-row>
                <b-col>
                  <b-form-group label="State" label-for="input-state">
                    <b-dropdown
                      id="input-state"
                      :text="beneficiary.state"
                      class="wd-100p"
                      variant="light"
                    >
                      <b-dropdown-item
                        v-for="option in state_options"
                        :key="option.value"
                        :value="option.value"
                        @click="beneficiary.state = option.value"
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group label="City" label-for="input-city">
                    <b-dropdown
                      id="input-city"
                      :text="beneficiary.city"
                      class="wd-100p"
                      variant="light"
                    >
                      <b-dropdown-item
                        v-for="option in city_options"
                        :key="option.value"
                        :value="option.value"
                        @click="beneficiary.city = option.value"
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-form-group>
                </b-col>
              </b-row>
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
              title="Please enter bank account details of the beneficiary"
            >
              <b-form-group label="Bank Account Number" label-for="input-acc">
                <b-form-input
                  id="input-acc"
                  type="password"
                  v-model="beneficiary.account"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Re-Enter Account Number"
                label-for="input-acc-re"
              >
                <b-form-input
                  id="input-acc-re"
                  type="number"
                  v-model="temp_account"
                ></b-form-input>
              </b-form-group>
              <b-form-group label="SWIFT/BIC Code" label-for="input-ifsc">
                <b-form-input
                  id="input-ifsc"
                  v-model="beneficiary.ifsc"
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
                >Create Beneficiary</b-button
              >
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navigations/NavBar.vue";
import TitleBar from "@/components/navigations/TitleBar.vue";
import StepProgress from "@/components/tools/StepProgress.vue";

export default {
  name: "Beneficiary",
  components: {
    "step-progress": StepProgress,
    NavBar,
    TitleBar,
  },
  data() {
    return {
      steps: [
        { text: "Account Type" },
        { text: "Basic Details" },
        { text: "Address" },
        { text: "Bank Details" },
      ],
      currentStep: 1,
      temp_account: "",
      beneficiary: {
        type: "Business",
        country: "India",
        name: "",
        relationship: "Friend",
        phone: "",
        email: "",
        address: "",
        state: "Karnataka",
        city: "Bangalore",
        account: "",
        ifsc: "",
      },
      type_options: [
        {
          text: "Business",
          value: "Business",
        },
        {
          text: "Individual",
          value: "Individual",
        },
      ],
      country_options: [
        {
          text: "India",
          value: "India",
        },
        {
          text: "Malaysia",
          value: "Malaysia",
        },
      ],
      relation_options: [
        {
          text: "Friend",
          value: "Friend",
        },
        {
          text: "Family",
          value: "Family",
        },
      ],
      state_options: [
        {
          text: "Karnataka",
          value: "Karnataka",
        },
        {
          text: "Andrapradesh",
          value: "Andrapradesh",
        },
      ],
      city_options: [
        {
          text: "Bangalore",
          value: "Bangalore",
        },
        {
          text: "Chennai",
          value: "Chennai",
        },
      ],
    };
  },
  methods: {
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
::v-deep ul {
  list-style-type: none !important;
}
::v-deep h4 {
  color: $txt;
  text-align: center;
}
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
.card {
  border: none;
}
::v-deep label {
  color: $lightslategrey !important;
  margin-bottom: 0 !important;
}
::v-deep .btn-light {
  border: 1px solid $lightgrey !important;
}
</style>
