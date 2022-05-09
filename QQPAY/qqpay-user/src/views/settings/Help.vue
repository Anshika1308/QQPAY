<template>
  <div class="help">
    <NavBar />
    <NavBarLeft />
    <div class="page-body">
      <TitleBar title="Help Centre" />
      <b-container>
        <b-row align-h="center my-5">
          <b-col class="text-center">
            <h1>{{$t('helpCentre.intro')}}</h1>
            <img
                alt="QQ Pay"
                class="logo_img"
                src="../../assets/support.gif"
              />
            <div v-for="setting in settings" :key="setting.heading" class="text-left">
              <b-card :header="setting.heading" header-tag="header" class="mt-2">
                <div
                  v-for="data in setting.data"
                  :key="data.id"
                >
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <h4>{{ data.title }}</h4>
                  </div>
                  <b-card-text>{{ data.text }}</b-card-text>
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
  name: "Help",
  components: {
    NavBar,
    TitleBar,
    NavBarLeft
  },
  data() {
    return {
      settings: [
        {
          heading: this.$t('helpCentre.faq'),
          data: [
            {
              id: 1,
              title: this.$t('helpCentre.ques'),
              text: this.$t('helpCentre.ans'),
            },
            {
              id: 2,
              title: this.$t('helpCentre.ques'),
              text: this.$t('helpCentre.ans'),
              value: true,
            },
            {
              id: 3,
              title: this.$t('helpCentre.ques'),
              text: this.$t('helpCentre.ans'),
              value: true,
            },
          ],
        },
        {
          heading: this.$t('helpCentre.contact'),
          data: [
            {
              id: 1,
              title: this.$t('helpCentre.email'),
              text: "support@qqpay.com",
              value: true,
            },
            {
              id: 2,
              title: this.$t('helpCentre.helpLine'),
              text: "1800 1241 45",
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
h1 {
  color: $txt;
}
.logo_img {
  height: 180px;
}
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
