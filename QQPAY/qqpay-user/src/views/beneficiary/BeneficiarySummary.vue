<template>
  <div class="beneficiary">
    <NavBar />
    <NavBarLeft/>
    <div class="page-body">
      <TitleBar title="Beneficiary Summary" />
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
              <template #cell(actions)="row">
                <div class="action-div">
                <b-button
                  variant="light"
                  size="sm"
                  @click="info(row.item, row.index, $event.target)"
                  class="mr-2 action-btn"
                  title="Update Beneficiary"
                >
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon
                  >
                </b-button>
                <b-button
                  variant="light"
                  size="sm"
                  @click="info(row.item, row.index, $event.target)"
                  class="mr-2 action-btn"
                  title="Delete Beneficiary"
                >
                  <b-icon icon="trash-fill" aria-hidden="true"></b-icon
                  >
                </b-button>
                <b-button
                  variant="light"
                  size="sm"
                  @click="info(row.item, row.index, $event.target)"
                  class="mr-2 action-btn"
                  title="Start Transaction"
                >
                  <b-icon icon="lightning-fill" aria-hidden="true"></b-icon
                  >
                </b-button>
                </div>
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
  name: "BeneficiarySummary",
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
        "type",
        "bank_name",
        "IFSC",
        { key: "actions", label: "" },
      ],
      items: [
        {
          name: "Dickerson",
          country: "DenMark",
          type: "Individual",
          bank_name: "Citi",
          IFSC: "UTIC000546",
        },
        {
          name: "Larsen",
          country: "Indonesia",
          type: "Business",
          bank_name: "Standard Chartered",
          IFSC: "UTIC000846",
        },
        {
          name: "Geneva",
          country: "Singapore",
          type: "Individual",
          bank_name: "ICICI",
          IFSC: "UTIC000646",
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
.action-btn {
  background: $primary;
  border-radius: 4px;
  color: $white !important;
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
::v-deep th {
  color: $txt !important;
  font-size: 14px;
  font-weight: 600;
}
</style>
