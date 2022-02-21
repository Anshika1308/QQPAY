<template>
  <div class="transaction">
    <NavBar />
    <NavBarLeft />
    <div class="page-body">
      <TitleBar title="Transaction Summary" />
      <b-container>
      <b-row align-h="center my-5">
        <b-col>
          <b-form-group
            label-for="filter-input"
            label-cols-sm="0"
            label-cols-lg="0"
            label-align-lg="right"
            content-cols-sm="12"
            content-cols-lg="4"
            label-align-sm="right"
            label-size="sm"
            class="mb-2"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-table
            :items="items"
            :fields="fields"
            :filter="filter"
            responsive
            class="align-middle"
          >
            <template #cell(name)="row">
              <b-avatar
                variant="dark"
                :text="row.item.f_name.charAt(0) + row.item.l_name.charAt(0)"
                class="mr-2"
              ></b-avatar>
              <small><b>{{ row.item.f_name }} {{ row.item.l_name }}</b></small>
            </template>
            <template #cell(status)="row">
              <small><b>{{ row.item.status }}</b></small>
            </template>
            <template #cell(country)="row">
              <small>{{ row.item.country }}</small>
            </template>
            <template #cell(transaction_type)="row">
              <small>{{ row.item.transaction_type }}</small>
            </template>
            <template #cell(delivery_method)="row">
              <small>{{ row.item.delivery_method }}</small>
            </template>
            <template #cell(start_time)="row">
              <small>{{ row.item.start_time }}</small>
            </template>
            <template #cell(actions)="row" size="sm">
              <div class="action-div">
                <b-button
                  variant="light"
                  size="sm"
                  v-b-tooltip.hover
                  title="Transfer Again"
                  @click="info(row.item, row.index, $event.target)"
                  class="mr-2 action-btn"
                >
                  <b-icon icon="lightning-fill" aria-hidden="true"></b-icon>
                </b-button>
                <b-button
                  variant="light"
                  size="sm"
                  v-if="row.item.status == 'Completed'"
                  v-b-tooltip.hover
                  title="Download Receipt"
                  @click="info(row.item, row.index, $event.target)"
                  class="mr-2 action-btn"
                >
                  <b-icon icon="receipt" aria-hidden="true"></b-icon>
                </b-button>
                <b-button
                  variant="light"
                  size="sm"
                  @click="row.toggleDetails"
                  class="mr-2 expand-btn"
                >
                  <b-icon v-if="row.detailsShowing" icon="chevron-up"></b-icon>
                  <b-icon v-else icon="chevron-down"></b-icon>
                </b-button>
              </div>
            </template>
            <template #row-details="row">
              <b-card>
                <b-row>
                  <b-col
                    sm="12"
                    md="6"
                    lg="4"
                    v-for="details in row.item.details"
                    :key="details.id"
                  >
                    <div class="menu-sec">
                      <label class="title-lbl">{{ details.title }}</label>
                      <b-list-group flush>
                        <b-list-group-item
                          v-for="options in details.options"
                          :key="options.text"
                        >
                          <b-form-group
                            label-cols-sm="12"
                            label-cols-lg="6"
                            label-align-lg="left"
                            content-cols-sm="12"
                            content-cols-lg="6"
                            :label="options.text"
                            label-size="sm"
                          >
                            <small>{{ options.value }}</small>
                          </b-form-group>
                        </b-list-group-item>
                      </b-list-group>
                    </div>
                  </b-col>
                </b-row>
              </b-card>
            </template>
          </b-table>
        </b-col>
      </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navigations/NavBar.vue";
import TitleBar from "@/components/navigations/TitleBar.vue";
import NavBarLeft from "@/components/navigations/NavBarLeft.vue";

export default {
  name: "TransactionSummary",
  components: {
    NavBar,
    TitleBar,
    NavBarLeft
  },
  data() {
    return {
      filter: null,
      fields: [
        "name",
        "country",
        "transaction_type",
        "delivery_method",
        "status",
        "start_time",
        { key: "actions", label: "" },
      ],
      items: [
        {
          f_name: "Mac",
          l_name: "Shah",
          country: "DenMark",
          transaction_type: "FPX",
          delivery_method: "Bank Account",
          status: "In-Progress",
          start_time: "2022-01-12 11:08 PM",
          completion_time: "2022-01-14 01:10 PM",
          details: [
            {
              id: 1,
              title: "Payment Details",
              options: [
                {
                  text: "Amount Paid",
                  value: "1000 RM",
                },
                {
                  text: "Transaction Fee",
                  value: "20 RM",
                },
                {
                  text: "Amount Transferred",
                  value: "9980 RM",
                },
                {
                  text: "Amount Received",
                  value: "123456 INR",
                },
              ],
            },
            {
              id: 2,
              title: "Transaction Details",
              options: [
                {
                  text: "Transaction Type",
                  value: "FPX",
                },
                {
                  text: "Beneficiary Type",
                  value: "Individual",
                },
                {
                  text: "Delivery Method",
                  value: "Bank Account",
                },
                {
                  text: "Status",
                  value: "FAILED -> Refund In-Progress",
                },
              ],
            },
            {
              id: 3,
              title: "Recipient Details",
              options: [
                {
                  text: "Account Number",
                  value: "XXXXXXXXXXXXX1234",
                },
                {
                  text: "Bank Name",
                  value: "Citi Bank",
                },
                {
                  text: "SWIFT/BIC Code",
                  value: "ALLAINBBAGC",
                },
                {
                  text: "Country",
                  value: "India",
                },
              ],
            },
          ],
        },
        {
          f_name: "Larsen",
          l_name: "Turbo",
          country: "Indonesia",
          transaction_type: "FPX",
          delivery_method: "Bank Account",
          status: "Completed",
          start_time: "2022-01-12 11:08 PM",
          completion_time: "2022-01-14 01:10 PM",
          details: [
            {
              id: 1,
              title: "Payment Details",
              options: [
                {
                  text: "Amount Paid",
                  value: "1000 RM",
                },
                {
                  text: "Transaction Fee",
                  value: "20 RM",
                },
                {
                  text: "Amount Transferred",
                  value: "9980 RM",
                },
                {
                  text: "Amount Received",
                  value: "123456 INR",
                },
              ],
            },
            {
              id: 2,
              title: "Transaction Details",
              options: [
                {
                  text: "Transaction Type",
                  value: "FPX",
                },
                {
                  text: "Beneficiary Type",
                  value: "Individual",
                },
                {
                  text: "Delivery Method",
                  value: "Bank Account",
                },
                {
                  text: "Status",
                  value: "FAILED -> Refund In-Progress",
                },
              ],
            },
            {
              id: 3,
              title: "Recipient Details",
              options: [
                {
                  text: "Account Number",
                  value: "XXXXXXXXXXXXX1234",
                },
                {
                  text: "Bank Name",
                  value: "Citi Bank",
                },
                {
                  text: "SWIFT/BIC Code",
                  value: "ALLAINBBAGC",
                },
                {
                  text: "Country",
                  value: "India",
                },
              ],
            },
          ],
        },
        {
          f_name: "Geneva",
          l_name: "Mia",
          country: "Singapore",
          transaction_type: "Bank",
          delivery_method: "Home Delivery",
          status: "Completed",
          start_time: "2022-01-12 11:08 PM",
          completion_time: "2022-01-14 01:10 PM",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
.row {
  margin: 5px;
}
.expand-btn {
  color: $primary;
  border-radius: 4px;
  border: 1px solid $primary;
}
.action-btn {
  background: $primary;
  border-radius: 4px;
  color: $white;
  border: none !important;
}
.action-div {
  text-align: end;
}
::v-deep .table {
  td {
    vertical-align: middle !important;
  }
}
.title-lbl {
  width: 100%;
  padding: 5px;
  text-align: center;
  font-weight: bold;
  color: $txt;
  border-bottom: 1px solid $txt;
}
.form-group {
    margin-bottom: 0;
}
.list-group-item {
    padding: 0;
}

::v-deep th {
  color: $txt !important;
  font-size: 14px;
  font-weight: 600;
}
::v-deep .col-form-label {
  color: $dimgrey;
}
::v-deep .btn-light {
  border: 1px solid $primary !important;
}
</style>
