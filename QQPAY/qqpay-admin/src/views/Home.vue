<template>
  <div class="home">
    <div class="page-body">
      <b-row class="mx-0">
        <b-col col sm="12" md="4" lg="2" class="px-0 side-menu">
          <img
              alt="QQ Pay"
              class="logo_img p-3"
              src="../assets/master_logo.png"
          />
          <b-list-group flush>
            <b-list-group-item v-for="menu in menus" :key="menu.id">
              <div
                  v-b-toggle.collapse-1
                  v-b-toggle="'menu-' + menu.id"
                  class="d-flex justify-content-between align-items-center"
              >
                {{ menu.title }}
                <b-icon icon="chevron-right" aria-hidden="true"></b-icon>
              </div>
              <b-collapse :id="'menu-' + menu.id">
                <b-card class="m-card">
                  <b-list-group flush>
                    <b-list-group-item
                        href="#"
                        v-for="sub_menu in menu.sub_menus"
                        :key="sub_menu.title"
                        @click="openTab(sub_menu.value)"
                    ><small>{{ sub_menu.title }}</small></b-list-group-item
                    >
                  </b-list-group>
                </b-card>
              </b-collapse>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col col sm="12" md="8" lg="10" class="px-0">
          <NavBar title=""/>
          <b-container>
            <b-row align-v="center" align-h="center" class="mt-5">
              <b-col col sm="12" md="12" lg="12">
                <b-card no-body>
                  <b-tabs pills card>
                    <b-tab
                        v-if="tab_show.user"
                        :active="tab_active.user"
                    >
                      <template #title>
                        <b-icon
                            icon="journal-check"
                            aria-hidden="true"
                        ></b-icon
                        >
                        User
                        <b-button variant="outline-light" size="sm"
                                  @click="closeTab('user')"
                        >
                          <b-icon
                              icon="x-circle-fill"
                              aria-hidden="true"
                          ></b-icon
                          >
                        </b-button>
                      </template>
                      <ComplianceUser
                      />
                    </b-tab>

                    <b-tab
                        v-if="tab_show.business"
                        :active="tab_active.business"
                    >
                      <template #title>
                        <b-icon
                            icon="journal-check"
                            aria-hidden="true"
                        ></b-icon
                        >
                        Business
                        <b-button variant="outline-light" size="sm"
                                  @click="closeTab('business')"
                        >
                          <b-icon
                              icon="x-circle-fill"
                              aria-hidden="true"
                          ></b-icon
                          >
                        </b-button>
                      </template>
                      <Business
                      />
                    </b-tab>

                    <b-tab
                        v-if="tab_show.fraud_users"
                        :active="tab_active.fraud_users"
                    >
                      <template #title>
                        <b-icon
                            icon="journal-check"
                            aria-hidden="true"
                        ></b-icon
                        >
                        Fraud Users
                        <b-button variant="outline-light" size="sm"
                                  @click="closeTab('fraud_users')"
                        >
                          <b-icon
                              icon="x-circle-fill"
                              aria-hidden="true"
                          ></b-icon
                          >
                        </b-button>
                      </template>
                      <FruadUsers/>
                    </b-tab>
                    <b-tab
                        v-if="tab_show.deals"
                        :active="tab_active.deals"
                    >
                      <template #title>
                        <b-icon
                            icon="journal-check"
                            aria-hidden="true"
                        ></b-icon
                        >
                        Deals
                        <b-button variant="outline-light" size="sm"
                                  @click="closeTab('deals')"
                        >
                          <b-icon
                              icon="x-circle-fill"
                              aria-hidden="true"
                          ></b-icon
                          >
                        </b-button>
                      </template>
                      <Deals
                      />
                    </b-tab>
                    <b-tab
                        v-if="tab_show.settlements"
                        :active="tab_active.settlements"
                    >
                      <template #title>
                        <b-icon
                            icon="diagram3-fill"
                            aria-hidden="true"
                        ></b-icon
                        >
                        Settlements
                        <b-button
                            variant="outline-light" size="sm"
                            @click="closeTab('settlements')"
                        >
                          <b-icon
                              icon="x-circle-fill"
                              aria-hidden="true"
                          ></b-icon
                          >
                        </b-button>
                      </template>
                      <Settlements
                      />
                    </b-tab>
                    <b-tab
                        v-if="tab_show.funding"
                        :active="tab_active.funding"
                    >
                      <template #title>
                        <b-icon
                            icon="cash-stack"
                            aria-hidden="true"
                        ></b-icon
                        >
                        Funding
                        <b-button variant="outline-light" size="sm"
                                  @click="closeTab('funding')"
                        >
                          <b-icon
                              icon="x-circle-fill"
                              aria-hidden="true"
                          ></b-icon
                          >
                        </b-button>
                      </template>
                      <Funding
                      />
                    </b-tab>
                    <b-tab
                        v-if="tab_show.forex"
                        :active="tab_active.forex"
                    >
                      <template #title>
                        <b-icon
                            icon="graph-up"
                            aria-hidden="true"
                        ></b-icon
                        >
                        Daily Forex
                        <b-button variant="outline-light" size="sm"
                                  @click="closeTab('forex')"
                        >
                          <b-icon
                              icon="x-circle-fill"
                              aria-hidden="true"
                          ></b-icon
                          >
                        </b-button>
                      </template>
                      <Deals
                      />
                    </b-tab>
                    <b-tab
                        v-if="tab_show.statement"
                        :active="tab_active.statement"
                    >
                      <template #title>
                        <b-icon
                            icon="file-earmark-text"
                            aria-hidden="true"
                        ></b-icon
                        >
                        A/C Statement
                        <b-button variant="outline-light" size="sm"
                                  @click="closeTab('statement')"
                        >
                          <b-icon
                              icon="x-circle-fill"
                              aria-hidden="true"
                          ></b-icon
                          >
                        </b-button>
                      </template>
                      <Deals
                      />
                    </b-tab>
                    <b-tab
                        v-if="tab_show.partners"
                        :active="tab_active.partners"
                    >
                      <template #title>
                        <b-icon
                            icon="journal-check"
                            aria-hidden="true"
                        ></b-icon
                        >
                        Partners
                        <b-button
                            variant="outline-light" size="sm"
                            @click="closeTab('partners')"
                        >
                          <b-icon
                              icon="x-circle-fill"
                              aria-hidden="true"
                          ></b-icon>
                        </b-button>
                      </template>
                      <PartnerList @openTab="openTab"/>
                    </b-tab>
                    <b-tab
                        v-if="tab_show.add_partner"
                        :active="tab_active.add_partner"
                    >
                      <template #title>
                        <b-icon
                            icon="journal-check"
                            aria-hidden="true"
                        ></b-icon
                        >
                        Add Partner
                        <b-button
                            variant="outline-light" size="sm"
                            @click="closeTab('add_partner')"
                        >
                          <b-icon
                              icon="x-circle-fill"
                              aria-hidden="true"
                          ></b-icon>
                        </b-button>
                      </template>
                      <AddPartner @openTab="openTab" />
                    </b-tab>
                    <b-tab
                        v-if="tab_show.partner_commissions"
                        :active="tab_active.partner_commissions"
                    >
                      <template #title>
                        <b-icon
                            icon="journal-check"
                            aria-hidden="true"
                        ></b-icon
                        >
                        Partner Commission
                        <b-button
                            variant="outline-light" size="sm"
                            @click="closeTab('partner_commissions')"
                        >
                          <b-icon
                              icon="x-circle-fill"
                              aria-hidden="true"
                          ></b-icon>
                        </b-button>
                      </template>
                      <PartnerCommissionList @openTab="openTab" />
                    </b-tab>
                  </b-tabs>
                </b-card>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/navigations/NavBar.vue";
import Deals from "@/views/treasury/Deals.vue";
import Settlements from "@/views/treasury/Settlements.vue";
import Funding from "@/views/treasury/Funding.vue";
import ComplianceUser from "@/views/compilance/ComplianceUser.vue";
import Business from "@/views/compilance/Business.vue";
import FruadUsers from "@/views/compilance/FruadUsers.vue";
import PartnerList from "@/views/partners/PartnerList";
import AddPartner from "@/views/partners/AddPartner";
import PartnerCommissionList from "@/views/partners/PartnerCommissionList";

export default {
  name: "Home",
  components: {
    NavBar,
    Deals,
    Settlements,
    Funding,
    ComplianceUser,
    Business,
    FruadUsers,
    PartnerList,
    AddPartner,
    PartnerCommissionList,
  },
  data() {
    return {
      deals: "Deals",
      tab_show: {
        deals: false,
        settlements: false,
        funding: false,
        forex: false,
        statement: false,
        partners: false,
        add_partner: false,
        partner_commissions: false,
        user: true
      },
      tab_active: {
        deals: false,
        settlements: false,
        funding: false,
        forex: false,
        statement: false,
        partners: false,
        partner_commissions: false,
        user: true
      },
      menus: [
        {
          id: 1,
          title: "Dashboard",
          sub_menus: {},
        },
        {
          id: 2,
          title: "KYC",
          sub_menus: {},
        },
        {
          id: 3,
          title: "Transactions",
          sub_menus: {},
        },
        {
          id: 4,
          title: "Compliance",
          sub_menus: [
            {
              title: "User",
              value: "user",
            },
            {
              title: "Business",
              value: "business",
            },
            {
              title: "Fraud Users",
              value: "fraud_users",
            },
          ],
        },
        {
          id: 5,
          title: "Treasury",
          sub_menus: [
            {
              title: "Deals",
              value: "deals",
            },
            {
              title: "Settlements",
              value: "settlements",
            },
            {
              title: "Funding",
              value: "funding",
            },
            {
              title: "Forex",
              value: "forex",
            },
            {
              title: "A/C Statement",
              value: "statement",
            },
          ],
        },
        {
          id: 6,
          title: "Partners",
          sub_menus: [
            {
              title: "Partners List",
              value: "partners",
            }, {
              title: "Partner Commission",
              value: "partner_commissions",
            },
          ],
        },
        {
          id: 7,
          title: "Master Settings",
          sub_menus: {},
        },
      ],
    };
  },
  methods: {
    openTab(sub_menu) {
      console.log(sub_menu, "test")
      this.tab_show[sub_menu] = true;
      this.tab_active[sub_menu] = true;
      Object.keys(this.tab_active).forEach((v) => (this.tab_active[v] = false));
      this.tab_active[sub_menu] = true;
    },
    closeTab(sub_menu) {
      this.tab_show[sub_menu] = false;
      this.tab_active[sub_menu] = false;
      console.log(sub_menu)
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/global.scss";

.btn-outline-light {
  border: none !important;
  background: transparent !important;
  color: $primary !important;
  padding: 0 !important;
  margin-left: 0.75rem;
}

.list-group-item {
  padding: 0.25rem 1.25rem !important;
}

.logo_img {
  height: 80px;
}

.m-card {
  border: none;

  .card-body {
    padding: 0;
  }
}

.side-menu {
  height: 100vh;
  border-right: 1px solid rgba(0, 0, 0, 0.125);
}

::v-deep .nav-pills {
  .nav-link {
    margin: .3rem !important;
    padding: 0.3rem 1rem !important;
    color: $secondary !important;
    border: 1px solid $secondary !important;
  }

  .nav-link.active {
    color: $secondary !important;
    background: transparent !important;
    border: 1px solid $primary !important;
  }
}
</style>
