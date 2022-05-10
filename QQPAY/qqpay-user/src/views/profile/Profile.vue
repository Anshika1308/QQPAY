<template>
  <div class="transaction">
    <NavBar />
    <NavBarLeft />
    <div class="page-body">
      <TitleBar title="Account Settings" />
      <b-container>
        <b-row align-h="center my-5" class="text-center">
          <b-col col sm="12" md="12" lg="8">
            <CircularProgress
              class="circular-progress mx-auto"
              :value="percentage"
            />
            <label>{{$t('profile.profileCompleteNess')}}</label>
            <b-row class="p-2">
              <b-col
                col
                sm="12"
                md="12"
                lg="6"
                v-for="process in completeness"
                :key="process.text"
                class="p-2"
              >
                <b-button variant="light" @click="ok()" class="wd-100p">
                  {{ process.text }}
                  <b-icon
                    variant="success"
                    v-if="process.value"
                    icon="check-circle-fill"
                    aria-hidden="true"
                  ></b-icon>
                  <b-icon
                    variant="warning"
                    v-else
                    icon="check-circle-fill"
                    aria-hidden="true"
                  >
                  </b-icon>
                </b-button>
              </b-col>
            </b-row>

            <b-form-input
              v-model="user_details.f_name"
              placeholder="First Name"
              class="mt-3"
            ></b-form-input>
            <b-form-input
              v-model="user_details.l_name"
              placeholder="Last Name"
              class="mt-3"
            ></b-form-input>
            <b-form-group
              label-cols-sm="12"
              label-cols-lg="4"
              content-cols-sm="12"
              content-cols-lg="8"
              label="Account Type"
              label-for="input-type"
              class="mt-3"
            >
              <b-dropdown
                id="input-type"
                :text="user_details.account_type"
                class="wd-100p"
                variant="light"
                disabled
              >
                <b-dropdown-item
                  v-for="option in account_options"
                  :key="option.value"
                  :value="option.value"
                  @click="user_details.account_type = option.value"
                >
                  {{ option.text }}
                </b-dropdown-item>
              </b-dropdown>
            </b-form-group>
            <b-form-group
              label-cols-sm="12"
              label-cols-lg="4"
              content-cols-sm="12"
              content-cols-lg="8"
              label="Current Country"
              label-for="input-type"
              class="mt-3"
            >
              <b-dropdown
                id="input-type"
                :text="user_details.country"
                class="wd-100p"
                variant="light"
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
            </b-form-group>
            <b-form-input
              v-model="user_details.email"
              type="email"
              placeholder="Email ID"
              class="mt-3"
            ></b-form-input>
            <b-form-input
              v-model="user_details.phone"
              type="number"
              placeholder="Phone Number"
              class="my-3"
            ></b-form-input>
            <b-button
              variant="primary"
              @click="$router.push('/')"
              class="mt-5 px-5 mx-auto"
              >{{$t('profile.update')}}</b-button
            >
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navigations/NavBar.vue";
import TitleBar from "@/components/navigations/TitleBar.vue";
import CircularProgress from "@/components/tools/CircularProgress.vue";
import NavBarLeft from "@/components/navigations/NavBarLeft.vue";
//import {mapGetters} from "vuex";

export default {
  name: "Transaction",
  components: {
    NavBar,
    TitleBar,
    CircularProgress,
    NavBarLeft,
  },
  computed: {
    //...mapGetters("Common",["user_details"]),
  },
  data() {
    return {
      user_details: {
        f_name: "Naraimha",
        l_name: "Rao",
        account_type: this.$t('profile.business'),
        country: this.$t('profile.malasia'),
        email: "narasimha@softdevels.com",
        phone: "1234567894",
      },
      percentage: 50,
      completeness: [
        {
          text: this.$t('profile.emailVerification'),
          value: true,
          link: "",
        },
        {
          text: "KYC",
          value: false,
          link: "",
        },
        {
          text: this.$t('profile.mobileVerify'),
          value: true,
          link: "",
        },
      ],
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
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
::v-deep .btn-light {
  border: 1px solid #d3d3d3 !important;
}
</style>
