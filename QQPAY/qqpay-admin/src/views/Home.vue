<template>
  <div class="home">
    <div class="page-body">
      <b-row class="mx-0">
        <b-col col sm="12" md="4" lg="2" class="px-0 side-menu">
          <img alt="QQ Pay" class="logo_img p-3" src="../assets/master_logo.png" />
          <b-list-group flush>
            <b-list-group-item v-for="menu in menus" :key="menu.id">
              <div v-b-toggle.collapse-1 v-b-toggle="'menu-' + menu.id"
                class="d-flex justify-content-between align-items-center">
                {{ menu.title }}
                <b-icon icon="chevron-right" aria-hidden="true"></b-icon>
              </div>
              <b-collapse :id="'menu-' + menu.id">
                <b-card class="m-card" >
                  <b-list-group flush>
                    <b-list-group-item href="#" v-for="sub_menu in menu.sub_menus" :key="sub_menu.title"
                      @click="openTab(sub_menu.value)"><small>{{ sub_menu.title }}</small></b-list-group-item>
                  </b-list-group>
                </b-card>
              </b-collapse>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        
        <b-col col sm="12" md="8" lg="10" class="">
         
          <NavBar title="Welcome to QQPay Admin Portal !" />
          <b-container>
            <b-row align-v="center" align-h="center" class="mt-5">
              <b-col col sm="12" md="12" lg="12">
                <b-card no-body>
                  <b-tabs pills card>    
                    <b-tab v-if="tab_show.user" :active="tab_active.user">
                      <template #title>
                        <b-icon icon="journal-check" aria-hidden="true"></b-icon>
                        User
                        <b-button variant="outline-light" size="sm" @click="closeTab('user')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <ComplianceUser />
                    </b-tab>
                    
                    <b-tab v-if="tab_show.business" :active="tab_active.business">
                      <template #title>
                        <b-icon icon="journal-check" aria-hidden="true"></b-icon>
                        Business
                        <b-button variant="outline-light" size="sm" @click="closeTab('business')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <Business />
                    </b-tab>

                    <b-tab v-if="tab_show.EmployeeCreation" :active="tab_active.EmployeeCreation">
                      <EmployeeCreation />
                    </b-tab>

                    <b-tab v-if="tab_show.EmployeeManagement" :active="tab_active.EmployeeManagement">
                      <EmployeeManagement />
                    </b-tab>
                    
                    <b-tab v-if="tab_show.CountrySetUp" :active="tab_active.CountrySetUp">
                      <template #title>
                        <b-icon icon="journal-check" aria-hidden="true"></b-icon>
                        Country SetUp
                        <b-button variant="outline-light" size="sm" @click="closeTab('CountrySetUp')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <CountrySetUp />
                    </b-tab>

                    <b-tab v-if="tab_show.fraud_users" :active="tab_active.fraud_users">
                      <template #title>
                        <b-icon icon="journal-check" aria-hidden="true"></b-icon>
                        Fraud Users
                        <b-button variant="outline-light" size="sm" @click="closeTab('fraud_users')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <FruadUsers />
                    </b-tab>


                    <b-tab v-if="tab_show.deals" :active="tab_active.deals">
                      <template #title>
                        <b-icon icon="journal-check" aria-hidden="true"></b-icon>
                        Deals
                        <b-button variant="outline-light" size="sm" @click="closeTab('deals')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <Deals @openTab="openTab" />
                    </b-tab>
                    <b-tab v-if="tab_show.settlements" :active="tab_active.settlements">
                      <template #title>
                        <b-icon icon="diagram3-fill" aria-hidden="true"></b-icon>
                        Settlements
                        <b-button variant="outline-light" size="sm" @click="closeTab('settlements')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <Settlements @openTab="openTab" />
                    </b-tab>
                    <b-tab v-if="tab_show.funding" :active="tab_active.funding">
                      <template #title>
                        <b-icon icon="cash-stack" aria-hidden="true"></b-icon>
                        Funding
                        <b-button variant="outline-light" size="sm" @click="closeTab('funding')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <Funding />
                    </b-tab>
                    <b-tab v-if="tab_show.dailyForex" :active="tab_active.dailyForex">
                      <template #title>
                        <b-icon icon="graph-up" aria-hidden="true"></b-icon>
                        Daily Forex -IND
                        <b-button variant="outline-light" size="sm" @click="closeTab('dailyForex')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <DailyForex />
                    </b-tab>
                    <b-tab v-if="tab_show.statement" :active="tab_active.statement">
                      <template #title>
                        <b-icon icon="file-earmark-text" aria-hidden="true"></b-icon>
                        A/C Statement
                        <b-button variant="outline-light" size="sm" @click="closeTab('statement')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <Deals />
                    </b-tab>
                    <b-tab v-if="tab_show.serviceCharge" :active="tab_active.serviceCharge">
                      <template #title>
                        <b-icon icon="graph-up" aria-hidden="true"></b-icon>
                        Service Charge
                        <b-button variant="outline-light" size="sm" @click="closeTab('serviceCharge')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <Deals />
                    </b-tab>
                    <b-tab v-if="tab_show.partners" :active="tab_active.partners">
                      <template #title>
                        <b-icon icon="journal-check" aria-hidden="true"></b-icon>
                        Partners
                        <b-button variant="outline-light" size="sm" @click="closeTab('partners')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <PartnerList @openTab="openTab" />
                    </b-tab>
                    <b-tab v-if="tab_show.add_partner" :active="tab_active.add_partner">
                      <template #title>
                        <b-icon icon="journal-check" aria-hidden="true"></b-icon>
                        Add Partner
                        <b-button variant="outline-light" size="sm" @click="closeTab('add_partner')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <AddPartner @openTab="openTab" />
                    </b-tab>
                    <b-tab v-if="tab_show.partner_commissions" :active="tab_active.partner_commissions">
                      <template #title>
                        <b-icon icon="journal-check" aria-hidden="true"></b-icon>
                        Partner Commission
                        <b-button variant="outline-light" size="sm" @click="closeTab('partner_commissions')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <PartnerCommissionList @openTab="openTab" />
                    </b-tab>

                    <b-tab v-if="tab_show.serviceCharge" :active="tab_active.serviceCharge">
                      <template #title>
                        <b-icon icon="graph-up" aria-hidden="true"></b-icon>
                        Service Charge
                        <b-button variant="outline-light" size="sm" @click="closeTab('serviceCharge')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <ServiceCharge />
                    </b-tab>
                    <b-tab
                      v-if="tab_show.dealsbu"
                      :active="tab_active.dealsbu"
                    >
                      <template #title>
                        <b-icon
                          icon="diagram3-fill"
                          aria-hidden="true"
                        ></b-icon>
                        DealsBusiness
                        <b-button
                          variant="outline-light"
                          size="sm"
                          @click="closeTab('dealsbu')"
                          ><b-icon
                            icon="x-circle-fill"
                            aria-hidden="true"
                          ></b-icon
                        ></b-button>
                      </template>
                      <DealsBu @openTab="openTab"
                    /></b-tab>

                    <b-tab
                      v-if="tab_show.Reports"
                      :active="tab_active.Reports"
                    >
                      <template #title>
                        <b-icon
                          icon="diagram3-fill"
                          aria-hidden="true"
                        ></b-icon>
                        Reports
                        <b-button
                          variant="outline-light"
                          size="sm"
                          @click="closeTab('Reports')"
                          ><b-icon
                            icon="x-circle-fill"
                            aria-hidden="true"
                          ></b-icon
                        ></b-button>
                      </template>
                      <Reports @openTab="openTab"
                    /></b-tab>

                    
                    <b-tab v-if="tab_show.specialRates" :active="tab_active.specialRates">
                      <template #title>
                        <b-icon icon="graph-up" aria-hidden="true"></b-icon>
                        Special Rates
                        <b-button variant="outline-light" size="sm" @click="closeTab('specialRates')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <SpecialRates />
                    </b-tab>
                    <b-tab v-if="tab_show.Service" :active="tab_active.Service">
                      <template #title>
                        <b-icon icon="cash-stack" aria-hidden="true"></b-icon>
                        Service
                        <b-button variant="outline-light" size="sm" @click="closeTab('Service')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <Service />
                    </b-tab>
                    <b-tab v-if="tab_show.manageScore" :active="tab_active.manageScore">
                      <template #title>
                        <b-icon icon="graph-up" aria-hidden="true"></b-icon>
                        Manage Score
                        <b-button variant="outline-light" size="sm" @click="closeTab('manageScore')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <ManageScore />
                    </b-tab>
                    <b-tab v-if="tab_show.DailyForexBUS" :active="tab_active.DailyForexBUS">
                      <template #title>
                        <b-icon icon="graph-up" aria-hidden="true"></b-icon>
                          DailyForex - BUS
                        <b-button variant="outline-light" size="sm" @click="closeTab('DailyForexBUS')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <DailyForexBUS />
                    </b-tab>
                    
                    <b-tab v-if="tab_show.PPComm" :active="tab_active.PPComm">
                      <template #title>
                        <b-icon icon="cash-stack" aria-hidden="true"></b-icon>
                        PP Comm 
                        <b-button variant="outline-light" size="sm" @click="closeTab('PPComm')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <PPComm />
                    </b-tab>
                    <b-tab v-if="tab_show.complianceSettings" :active="tab_active.complianceSettings">
                      <template #title>
                        <b-icon icon="graph-up" aria-hidden="true"></b-icon>
                        Compliance IND Score 
                        <b-button variant="outline-light" size="sm" @click="closeTab('complianceSettings')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <ComplianceSettings />
                    </b-tab>
                    <b-tab v-if="tab_show.ComplienceSettingsBu" :active="tab_active.ComplienceSettingsBu">
                      <template #title>
                        <b-icon icon="graph-up" aria-hidden="true"></b-icon>
                        Compliance BU Score  
                        <b-button variant="outline-light" size="sm" @click="closeTab('ComplienceSettingsBu')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <ComplienceSettingsBu />
                    </b-tab>
                    <b-tab v-if="tab_show.ComplianceSetup" :active="tab_active.ComplianceSetup">
                      <template #title>
                        <b-icon icon="graph-up" aria-hidden="true"></b-icon>
                        Compliance Setup  
                        <b-button variant="outline-light" size="sm" @click="closeTab('ComplianceSetup')">
                          <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                        </b-button>
                      </template>
                      <ComplianceSetup />
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

//import Business from "./compilance/Business.vue";
import DailyForex from "@/views/treasury/DailyForex.vue";
import DailyForexBUS from "@/views/treasury/DailyForexBus.vue";
//import { component } from 'vue/types/umd';
import ServiceCharge from "@/views/setup/ServiceCharge.vue";
import SpecialRates from "@/views/setup/SpecialRates.vue";
import ManageScore from "@/views/setup/ManageScore.vue";
import Service from "./ServiceCharge/Service.vue";
import PPComm from "./ServiceCharge/PPComm.vue";
import ComplianceSettings from "@/views/setup/ComplianceSettings.vue";
import ComplienceSettingsBu from "@/views/setup/ComplienceSettingsBu.vue";
import ComplianceSetup from "@/views/setup/ComplianceSetup.vue";
import DealsBu from "./treasury/DealsBu.vue";
import Reports from "./treasury/Report.vue";

import EmployeeCreation from "./Employee/EmployeeCreation.vue";
import EmployeeManagement from "./Employee/UserManagment.vue";
import CountrySetUp from "./setup/CountrySetup.vue";


export default {
  name: "Home",
  components: {
    EmployeeCreation,
    EmployeeManagement,
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
    DailyForex,
    ServiceCharge,
    SpecialRates,
    ManageScore,
    Service,
    PPComm,
    ComplianceSettings,
    DealsBu,
    Reports,
    DailyForexBUS,
    CountrySetUp,
    ComplienceSettingsBu,
    ComplianceSetup
  },
  // flag
  data() {
    return {
      deals: "Deals",
      tab_show: {
        deals: false,
        settlements: false,
        funding: false,
        dailyForex: false,
        statement: false,
        partners: false,
        add_partner: false,
        partner_commissions: false,
        user: false,
        serviceCharge: false,
        specialRates: false,
        manageScore: false,
        Service: false,
        PPComm: false,
        dealsbu: false,
        Reports:false,
        DailyForexBUS:false,
        EmployeeCreation:false,
        EmployeeManagement:false,
        CountrySetUp:false,
        ComplienceSettingsBu:false,
        ComplianceSetup:false
      },
      tab_active: {
        deals: false,
        settlements: false,
        funding: false,
        dailyForex: false,
        statement: false,
        partners: false,
        partner_commissions: false,
        serviceCharge: false,
        specialRates: false,
        manageScore: false,
        Service: false,
        PPComm: false,
        user: false,
        dealsbu: false,
        Reports:false,
        DailyForexBUS:false,
        EmployeeCreation:false,
        EmployeeManagement:false,
        CountrySetUp:false,
        ComplienceSettingsBu:false,
        ComplianceSetup:false
      },
      menus: [
        {
          id: 1,
          title: "Dashboard",
          sub_menus: {},
        },
        {
          id: 4,
          title: "Compliance",
          sub_menus: [
            {
              title: "User",
              value: "user",
            }
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
              title: "B2B",
              value: "dealsbu",
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
              title: "Daily Forex - IND",
              value: "dailyForex",
            },
             {
              title: "Daily Forex -BUS",
              value: "DailyForexBUS",
            },
       
          ],
        },
        {
          id: 7,
          title: "Partners",
          sub_menus: [
            {
              title: "Partners List",
              value: "partners",
            },
          ],
        },
        {
          id: 8,
          title: "Setup",
          sub_menus: [
            {
              title: "Service Charge",
              value: "serviceCharge",
            },
            {
              title: "Special Rates",
              value: "specialRates",
            },
            // {
            //   title: "Manage Score",
            //   value: "manageScore", 
            // },
            {
              title: "Compliance IND Score",
              value: "complianceSettings",
            },
            {
              title: "Compliance BU Score",
              value: "ComplienceSettingsBu",
            },
             {
              title: "Compliance Setup",
              value: "ComplianceSetup",
            },
            {
              title: "Country Setup",
              value: "CountrySetUp",
            },
            
          ],
        },
        {
          id: 9,
          title: "User",
          sub_menus: [
            {
              title: "Employee Creation",
              value: "EmployeeCreation",
            },
            {
              title: "Employee Management",
              value: "EmployeeManagement",
            }
          ],
        },
        {
          id: 10,
          title: "Reports",
          sub_menus: [
            {
              title: "Statment of Accounts",
              value: "Reports",
            },
          ],
        },
      ],
    };
  },
  methods: {
    openTab(sub_menu) {
      if (sub_menu === 'settlements') {
        this.$store.commit("app/set_selected_deal_id", null);
      }
      if (sub_menu === 'funding') {
        this.$store.commit("app/set_selected_settlement_id", null);
      }
      this.tab_show[sub_menu] = true;
      this.tab_active[sub_menu] = true;
      Object.keys(this.tab_active).forEach((v) => (this.tab_active[v] = false));
      setTimeout(() => {
        this.tab_active[sub_menu] = true;
      }, 10)
    },
    closeTab(sub_menu) {
      this.tab_show[sub_menu] = false;
      this.tab_active[sub_menu] = false;
    },
  },
  
};
</script>

<style lang="scss" scoped>
@import "@/global.scss";

.btn-outline-light {
  border: none !important;
  background: transparent !important;
  color: $primary  !important;
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

.container{
max-width: 1540px !important;
margin-top: -20px;
}


::v-deep .nav-pills {
  .nav-link {
    margin: 0.3rem !important;
    padding: 0.3rem 1rem !important;
    color: $secondary  !important;
    border: 1px solid $secondary  !important;
  }

  .nav-link.active {
    color: $secondary  !important;
    background: transparent !important;
    border: 1px solid $primary  !important;
  }
}
</style>
