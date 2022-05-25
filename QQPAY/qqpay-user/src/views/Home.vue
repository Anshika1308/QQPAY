<template>
  <div class="view-body">
    <NavBar />
    <NavBarLeft />
    <b-carousel
      id="carousel-1"
      indicators
      background="#f6f6f6"
      img-width="1024"
      img-height="120"
      class="carousel-top"
    >
      <b-carousel-slide
        caption="Welcome to QQ Pay"
        img-blank
        img-alt="Welcome to QQ Pay"
      >
        <p>Payment Across The Globe Just Got Easier</p>
      </b-carousel-slide>
    </b-carousel>
    <b-container>
      <b-row align-v="center" align-h="center" class="my-auto">
        <b-col col sm="12" md="12" lg="12">
          <div class="page-body mb-5">
            <b-row class="text-center">
              <b-col
                sm="12"
                md="6"
                lg="6"
                v-for="recent in recents"
                :key="recent.title"
              >
                <div class="menu-sec">
                  <b-nav-text>{{ recent.title }}</b-nav-text>
                  <b-list-group flush>
                    <b-list-group-item
                      v-for="list_data in recent.list_data"
                      :key="list_data.id"
                      class="d-flex align-items-center"
                    >
                      <b-avatar
                        variant="secondary"
                        :text="list_data.circle_txt"
                        class="mr-3"
                      ></b-avatar>
                      <div class="mr-auto list-div">
                        <div class="d-flex w-100 justify-content-between">
                          <label class="mb-1"
                            ><b>{{ list_data.title_txt }}</b></label
                          >
                          <small class="text-muted">{{
                            list_data.right_txt
                          }}</small>
                        </div>

                        <label class="mb-1">
                          {{ list_data.sub_txt }}
                        </label>
                        <br />

                        <small class="text-muted">{{
                          list_data.small_txt
                        }}</small>
                      </div>
                    </b-list-group-item>
                    <b-list-group-item
                      @click="$router.push('/transactionsummary')"
                      class="footer-link"
                    >
                      <small>Show All</small></b-list-group-item
                    >
                  </b-list-group>
                </div>
              </b-col>
              <b-col class="transaction-div text-left">
                <b-nav-text class="text-center">Quick Action</b-nav-text>
                <b-input-group size="lg" class="mt-2">
                  <b-form-input
                    placeholder="You Send"
                    v-model="transaction_details.details.source_amount"
                    class="converted"
                  ></b-form-input>
                  <template #append>
                    <b-dropdown
                      :text="transaction_details.details.source_country"
                      right
                      variant="primary"
                    >
                      <b-dropdown-item
                        v-for="option in country_options"
                        :key="option.value"
                        :value="option.value"
                        @click="
                          transaction_details.details.source_country =
                            option.value
                        "
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </template>
                </b-input-group>
                <b-list-group flush>
                  <b-list-group-item href="#">
                    <b-row align-v="end">
                      <div class="operations minus">-</div>
                      <b-col cols="12">
                        <b-form-group
                          label-cols-sm="12"
                          label-cols-lg="4"
                          content-cols-sm="12"
                          content-cols-lg="4"
                          label="Delivery Method"
                          label-for="input-name"
                          label-size="sm"
                        >
                          <b-dropdown
                            id="input-relation"
                            :text="transaction_details.details.delivery"
                            variant="light"
                            size="sm"
                          >
                            <b-dropdown-item
                              v-for="option in delivery_options"
                              :key="option.value"
                              :value="option.value"
                              @click="
                                transaction_details.details.delivery =
                                  option.value
                              "
                              size="sm"
                            >
                              {{ option.text }}
                            </b-dropdown-item>
                          </b-dropdown>
                        </b-form-group>
                        <b-form-group
                          label-cols-sm="12"
                          label-cols-lg="4"
                          content-cols-sm="12"
                          content-cols-lg="4"
                          label="1,822.75 INR"
                          label-size="sm"
                        >
                          <small>Our fee</small>
                        </b-form-group>
                        <b-form-group
                          label-cols-sm="12"
                          label-cols-lg="4"
                          content-cols-sm="12"
                          content-cols-lg="4"
                          label="1,822.75 INR"
                          label-size="sm"
                        >
                          <small>Total fee</small>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-list-group-item>
                  <b-list-group-item href="#">
                    <b-row align-v="end">
                      <div class="operations operation-padding">=</div>
                      <b-col cols="12">
                        <b-form-group
                          label-cols-sm="12"
                          label-cols-lg="4"
                          content-cols-sm="12"
                          content-cols-lg="4"
                          label="98,177.25 INR"
                          label-size="sm"
                        >
                          <small>Amount we’ll convert</small>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-list-group-item>
                  <b-list-group-item href="#">
                    <b-row align-v="end">
                      <div class="operations operation-padding">&#xf7;</div>
                      <b-col cols="12" class="text-left">
                        <b-row>
                          <b-col cols="4">
                            <medium class="converted" style="margin-left: -15px"
                              >74.6497</medium
                            >&nbsp;&nbsp;<b
                              ><b-icon
                                icon="graph-up"
                                animation="fade"
                                style="color: green"
                              ></b-icon
                            ></b>
                          </b-col>
                          <b-col cols="8">
                            <small style="margin-left: -10px"
                              >Guaranteed rate (24 hrs)</small
                            >
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-list-group-item>
                </b-list-group>
                <b-input-group size="lg">
                  <b-form-input
                    placeholder="They Receive"
                    v-model="transaction_details.details.target_amount"
                    class="converted"
                  ></b-form-input>
                  <template #append>
                    <b-dropdown
                      :text="transaction_details.details.target_country"
                      right
                      variant="primary"
                    >
                      <b-dropdown-item
                        v-for="option in country_options"
                        :key="option.value"
                        :value="option.value"
                        @click="
                          transaction_details.details.target_country =
                            option.value
                        "
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </template>
                </b-input-group>
                <b-list-group-item
                  class="list-border text-center footer-link"
                  @click="$router.push('/transaction')"
                >
                  <small>Start Transaction</small></b-list-group-item
                >
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from "@/components/navigations/NavBar.vue";
import NavBarLeft from "@/components/navigations/NavBarLeft.vue";
import { getAllISOCodes } from "iso-country-currency";

export default {
  name: "Home",
  components: {
    NavBar,
    NavBarLeft,
  },
  data () {
    return {
      country_options: [
        {
          text: "INDIA",
          value: "INDIA",
        },
        {
          text: "NEPAL",
          value: "NEPAL",
        },
        {
          text: "MALAYSIA",
          value: "MALAYSIA",
        },
      ],
      delivery_options: [
        {
          text: "Bank Account",
          value: "Bank Account",
        },
        {
          text: "Wallet",
          value: "Wallet",
        },
        {
          text: "Home Delivery",
          value: "Home Delivery",
        },
        {
          text: "Pick up",
          value: "Pick up",
        },
      ],
      transaction_details: {
        beneficiary: {},
        details: {
          source_amount: 100000,
          target_amount: 1315.17,
          source_country: "MALAYSIA",
          target_country: "INDIA",
          method: "Bank Deposit",
          delivery: "Bank Account",
          reason: "",
          fund_source: "",
          remarks: "",
        },
      },
      recents: [
        {
          title: "Recents Transactions",
          more_link: "transaction_summary",
          list_data: [
            {
              id: 121,
              circle_txt: "NR",
              title_txt: "Narasimha Rao",
              sub_txt: "Amount: RM 1500",
              right_txt: "Date: 08 Jan 2022",
              small_txt: "Status: Completed",
              link: "transaction_summary",
            },
            {
              id: 122,
              circle_txt: "HR",
              title_txt: "Hrithik Roshan",
              sub_txt: "Amount: RM 2000",
              right_txt: "Date: 06 Jan 2022",
              small_txt: "Status: In-Progress",
              link: "transaction_summary",
            },
            {
              id: 123,
              circle_txt: "AR",
              title_txt: "Aiswarya Rai",
              sub_txt: "Amount: RM 3000",
              right_txt: "Date: 05 Jan 2022",
              small_txt: "Status: Completed",
              link: "transaction_summary",
            },
          ],
        },
      ],
    };
  },
  mounted () {
    console.log(getAllISOCodes())
  }
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
::v-deep h3 {
  font-weight: 700;
}
::v-deep .btn-light {
  border: 1px solid #d3d3d3 !important;
}
.row {
  margin: 0 !important;
}
.list-div {
  width: 100%;
  text-align: left;
}
.carousel {
  min-height: 120px;
}
li {
  list-style-type: none;
}
.list-group-item {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-top: 10px;
}
.navbar-text {
  width: 100%;
  color: $dimgrey !important;
  font-weight: bold;
  border-bottom: 2px solid $dimgrey;
}
.nav-link {
  color: $darkgray;
}
.menu-sec {
  margin: 10px;
  padding: 0;
  background: $white;
  text-align: center;
}
::v-deep h3 {
  color: $primary !important;
}
::v-deep p {
  color: $darkgray !important;
}
::v-deep .carousel-indicators {
  li {
    background-color: $primary !important;
  }
}
.badge-secondary {
  background-color: $lightslategrey;
}
.transaction-div {
  padding-top: 12px;
  .list-group-item {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 0px 0px;
    margin-top: 6.5px;
  }
  .list-border {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .converted {
    color: $txt;
    font-weight: 600;
  }
  .logo_img {
    height: 120px;
  }
  h4 {
    color: $txt;
    text-align: center;
  }
  ::v-deep .btn-primary {
    background-color: $txt !important;
    border-color: $txt !important;
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
  .form-group {
    margin-bottom: 0 !important;
  }
  .operations {
    height: 20px;
    width: 20px;
    position: absolute;
    border-radius: 10px;
    background: #d3d3d3;
    text-align: center;
    font-size: 20px;
    margin-left: -30px;
    line-height: 15px;
    bottom: 15px;
  }
  .operation-padding {
    padding-top: 4px;
  }
  .list-group-flush {
    border-left: 1px solid $txt;
    margin-left: 25px;
  }
  ::v-deep .btn-light {
    border: 1px solid #d3d3d3 !important;
  }
  ::v-deep ul {
    list-style-type: none !important;
  }
  ::v-deep label {
    color: $lightslategrey !important;
    margin-bottom: 0 !important;
  }
  li {
    padding: 7px;
  }
}
.footer-link {
  cursor: pointer;
}
</style>
