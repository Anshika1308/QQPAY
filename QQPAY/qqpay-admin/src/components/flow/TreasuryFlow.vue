<template>
  <vue-flowy :chart="chart"></vue-flowy>
</template>
<script>
import { VueFlowy, FlowChart } from "vue-flowy";
export default {
  name: "Flow",
  components: {
    VueFlowy
  },
  data: function() {
    return {
      chart: new FlowChart({ direction: "LR" })
    };
  },
  mounted() {
    const idea = this.chart.addElement("66,509 USD");
    const A = this.chart.addElement("A", { label: "26,509 USD" });
    const B = this.chart.addElement("B", { label: "5000 INR" });
    const C = this.chart.addElement("C", { label: "40,000 USD" });
    idea.leadsTo(A).leadsTo(B);
    idea.leadsTo(C);
    A.on("click", function() {
      console.log("click!");
    });
  }
};
</script>
