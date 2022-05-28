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
// import NavBarLeft from "@/components/navigations/NavBarLeft.vue";
import axios from 'axios';
export default {
  data () {
    return {
      baserul: 'https://94a5-183-83-163-96.in.ngrok.io',
      token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTM1MDM4MzgsInN1YiI6Im5hcmVuZHJhQHNvZnRkZXZlbHMuY29tIn0.SZPefq1ChsfQEln6D3yeuVmgyBDNCVEDm8pwJAugXNA'
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
      axios.get(`${this.baserul}/api/v1/qqpay/payment/DD/thisispaymentreason/0.14/MYR/${this.pay_UUID()}/`, {
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