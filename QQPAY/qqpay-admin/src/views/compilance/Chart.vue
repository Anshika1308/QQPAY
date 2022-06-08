<template>
 
</template>

<script>
export default {
  name: "Chart",

  data() {
    return {
      labels: ["Apples", "bananas", "purple"],
      datasets: [
        {
          data: [20, 30, 50],
          backgroundColor: ["red", "yellow", "purple"],
        }
      ],

      option:{
          title:{
              display: true,
              position: "bottom",
              text:"fruits"
          }
      }
    };
  },
};
</script>