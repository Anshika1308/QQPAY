<template>
  <div>
    <NavBar />
    <!-- <NavBarLeft /> -->
    <div class="page-body">
      <TitleBar :title="$t('fundTransfers.fundTransfer')" />
      <!-- <b-container> -->
      <div
        class="embed-responsive embed-responsive-16by9 z-depth-1-half"
        style="height: 100vh"
      >
        <iframe
          id="output-frame-id"
          class="embed-responsive-item"
          allowfullscreen
        ></iframe>
        <!-- <iframe
          id="iframe"
          class="embed-responsive-item"
          allowfullscreen
          :src="url"
          
        ></iframe> -->
      </div>
      <!-- </b-container> -->
      <!-- have to remove iframe container -->
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navigations/NavBar.vue";
import TitleBar from "@/components/navigations/TitleBar.vue";
import constants from "../../constants.json"
import axios from "axios";
// import NavBarLeft from "@/components/navigations/NavBarLeft.vue";
export default {
  data () {
    return {
      baserul: constants.REMITTER_PAYMENT,
      token: `Bearer ${constants.ACCESS_TOKEN}`
    }
  },

  components: {
    NavBar,
    TitleBar,
    // NavBarLeft,
  },
  mounted () {
    // console.log("url", this.url)

  },
  methods: {
    receiveMessage (event) {
      console.log(event.data)
    },
    pay_UUID () {
      var dt = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    },
    getPaymentResponse () {
      axios.get(`${this.baserul}/api/v1/qqpay/payment/status`, {
        headers: {
          'accept': 'application/json',
          'Authorization': this.token
        }
      })
        .then(function (response) {
          console.log("status", response);
        })
    },
    getSrc () {
      let transaction_details = this.$route.params.transaction_details
      console.log("test", transaction_details)

      axios.get(`${this.baserul}/qqpay/payment/${transaction_details.details.payment_type}/${transaction_details.details.remittenceReasonsText}/2.0/${transaction_details.details.source_country}/${this.pay_UUID()}/`, {
        headers: {
          'accept': '*/*',
          'Authorization': this.token
        }
      })
        .then(function (response) {
          let decodedURL = decodeURIComponent(escape(window.atob(response.data.URL)));
          window.location.replace(decodedURL);
          // console.log("encode", decodeData);
        })
    },
    b64_to_utf8 (str) {
      return decodeURIComponent(escape(window.atob(str)));
    }

  },
  created: function () {
    this.getSrc(this.token);

    const timer = setInterval(() => {
      this.getPaymentResponse();
    }, 10000);

    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },


}
</script>

<style>
embed-responsive-item::-webkit-scrollbar {
  display: none;
}
</style>