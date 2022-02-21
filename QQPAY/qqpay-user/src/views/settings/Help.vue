<template>
  <div class="help">
    <NavBar />
    <NavBarLeft />
    <div class="page-body">
      <TitleBar title="Help Centre" />
      <b-container>
        <b-row align-h="center my-5">
          <b-col class="text-center">
            <h1>Hi, how can we help?</h1>
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
          heading: "FAQs",
          data: [
            {
              id: 1,
              title: "In which Coutries QQ Pay operate?",
              text: "QQ Pay operates in Malaysia, Australia, Indonesia, US, India, UK at present instance, but to make remittance easier, we are expanding to other countries, stay tuned in to know about it.",
            },
            {
              id: 2,
              title: "In which Coutries QQ Pay operate?",
              text: "QQ Pay operates in Malaysia, Australia, Indonesia, US, India, UK at present instance, but to make remittance easier, we are expanding to other countries, stay tuned in to know about it.",
              value: true,
            },
            {
              id: 3,
              title: "In which Coutries QQ Pay operate?",
              text: "QQ Pay operates in Malaysia, Australia, Indonesia, US, India, UK at present instance, but to make remittance easier, we are expanding to other countries, stay tuned in to know about it.",
              value: true,
            },
          ],
        },
        {
          heading: "Contact Us",
          data: [
            {
              id: 1,
              title: "Email",
              text: "support@qqpay.com",
              value: true,
            },
            {
              id: 2,
              title: "Help Line",
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
