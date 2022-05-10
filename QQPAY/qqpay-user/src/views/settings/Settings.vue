<template>
  <div class="transaction">
    <NavBar />
    <NavBarLeft />
    <div class="page-body">
      <TitleBar title="Settings" />
      <b-container>
        <b-row align-h="center my-5">
          <b-col>
            <div v-for="setting in settings" :key="setting.heading">
              <b-card :header="setting.heading" header-tag="header" class="mt-2">
                <div
                  v-for="data in setting.data"
                  :key="data.id"
                >
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <h4>{{ data.title }}</h4>
                    <b-form-checkbox
                      switch
                      size="lg"
                      v-model="data.value"
                      variant="Success"
                    />
                  </div>
                  <b-card-text>{{ data.text }}</b-card-text>
                  <br />
                  <br />
                </div>
              </b-card>
            </div>
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
  name: "Settings",
  components: {
    NavBar,
    TitleBar,
    NavBarLeft
  },
  data() {
    return {
      settings: [
        {
          heading: this.$t('setting.notify'),
          data: [
            {
              id: 1,
              title: this.$t('setting.transaction'),
              text: this.$t('setting.transData'),
              value: true,
            },
            {
              id: 2,
              title: this.$t('setting.feature'),
              text: this.$t('setting.fdata'),
              value: true,
            },
            {
              id: 3,
              title: this.$t('setting.promotion'),
              text: this.$t('setting.pdata'),
              value: true,
            },
          ],
        },
        {
          heading: this.$t('setting.privacy'),
          data: [
            {
              id: 1,
              title: this.$t('setting.share'),
              text: this.$t('setting.shareData'),
              value: true,
            },
            {
              id: 2,
              title: this.$t('setting.app'),
              text: this.$t('setting.appData'),
              value: true,
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
::v-deep .custom-control-input {
	&:checked~.custom-control-label {
		&::before {
			color: #fff;
			border-color: $green !important;
			background-color: $green !important;
		}
	}
}
</style>
