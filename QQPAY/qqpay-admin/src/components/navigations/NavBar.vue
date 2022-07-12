<template>
  <b-navbar toggleable="lg" type="dark" variant="light">
    <b-navbar-brand>
      <h3>{{title}}</h3>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-form>
        <b-button class="btn_transparent rt-mg-15" v-b-modal.modal-logout>
          <b-icon icon="power" aria-hidden="true"></b-icon>
        </b-button>
        <b-button class="btn_transparent rt-mg-15">
          <b-icon icon="bell" aria-hidden="true"></b-icon>
        </b-button>
        <b-nav-item-dropdown right no-caret class="border border-secondary rounded">
          <template #button-content>
            <b-icon icon="list" aria-hidden="true" variant="secondary"></b-icon>
          </template>
          <!-- <b-dropdown-item @click="$router.push('/transaction')"><b-icon icon="lightning" aria-hidden="true" class="menu-icon"></b-icon>&nbsp;&nbsp;Fund Transfer</b-dropdown-item> -->
          <!-- <b-dropdown-item @click="$router.push('/transactionsummary')"><b-icon icon="receipt" aria-hidden="true" class="menu-icon"></b-icon>&nbsp;&nbsp;Transaction Summary</b-dropdown-item> -->
          <!-- <b-dropdown-divider></b-dropdown-divider> -->
          <!-- <b-dropdown-item @click="$router.push('/beneficiary')"><b-icon icon="person-plus-fill" aria-hidden="true" class="menu-icon"></b-icon>&nbsp;&nbsp;Add Beneficiary</b-dropdown-item> -->
          <!-- <b-dropdown-item @click="$router.push('/beneficiarysummary')"><b-icon icon="people" aria-hidden="true" class="menu-icon"></b-icon>&nbsp;&nbsp;Beneficiary Summary</b-dropdown-item> -->
          <!-- <b-dropdown-divider></b-dropdown-divider> -->
          <!-- <b-dropdown-item @click="$router.push('/settings')"><b-icon icon="gear" aria-hidden="true" class="menu-icon"></b-icon>&nbsp;&nbsp;Settings</b-dropdown-item> -->
          <!-- <b-dropdown-item @click="$router.push('/help')"><b-icon icon="life-preserver" aria-hidden="true" class="menu-icon"></b-icon>&nbsp;&nbsp;Help Centre</b-dropdown-item> -->
          <!-- <b-dropdown-divider></b-dropdown-divider> -->
          <b-dropdown-item @click="$router.push('/profile')"><b-icon icon="file-earmark-person" aria-hidden="true" class="menu-icon"></b-icon>&nbsp;&nbsp;My Profile</b-dropdown-item>
          <!-- <b-dropdown-item @click="$router.push('/kyc')"><b-icon icon="shield-check" aria-hidden="true" class="menu-icon"></b-icon>&nbsp;&nbsp;KYC</b-dropdown-item> -->
        </b-nav-item-dropdown>
      </b-nav-form>
    </b-navbar-nav>
    <b-modal
      id="modal-logout"
      ref="modal"
      title="Logout"
      @ok="logout"
      centered
      variant="primary"
    >
    Are you sure you want to logout?
    <template #modal-footer="{ ok, cancel }">
      <b-button variant="outline-secondary" @click="cancel()">
        Cancel
      </b-button>
      <b-button variant="danger" @click="ok()">
        Yes
      </b-button>
    </template>
    </b-modal>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  props: [
    'title',
  ],
  components: {},
  data() {
    return {
    };
  },
  methods: {
    logout(){
      localStorage.removeItem('isPermitted');
      this.$router.push('/')
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/global.scss";
h3 {
  color: $lightslategrey;
  margin-bottom: 0;
  font-weight: 600;
}
li {
  list-style-type: none;
}
.row {
  border-top: 1px solid $gainsboro;
}
.list-group-flush {
  border: 1px solid $gainsboro;
}
.list-group-item {
  cursor: pointer;
}
.navbar-text {
  width: 100%;
  color: $dimgrey !important;
  font-weight: bold;
  border-bottom: 2px solid $dimgrey;
}
::v-deep .nav-link {
  padding: .5rem .5rem .25rem .5rem !important;
}
.menu-sec {
  margin: 10px;
  padding: 0;
  background: $white;
  text-align: center;
}
.logo_img {
  max-height: 40px;
}
.rt-mg-15 {
  margin-right: 15px;
}
.nav-mob-menu {
  padding: 3px 5px;
  background: transparent;
  color: $primary !important;
  border: 2px solid $primary !important;
}
.navbar {
  position: sticky;
  top: 0;
  z-index: 1040;
  background: $white !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);
}
.btn_transparent {
  width: 38px;
  height: 38px;
  padding: 0;
  font-size: 20px;
  background: transparent;
  border: none;
  color: $dimgrey;
}
.btn-secondary {
  &:not(:disabled) {
    &:not(.disabled) {
      &:active {
        color: $primary;
        background-color: transparent;
        border: none;
      }
      &:hover {
        color: $primary;
        background-color: transparent;
        border: none;
      }
    }
  }
}
</style>
