<template>
  <div class="orgTabContent">
    <v-row>
      <v-col md="10">
        <div style="color: #576377; font-size: 20px">Organization URL</div>
        <v-row>
          <v-col md="4">
            <div style="color: #576377; font-weight: 500; font-size: 18px">{{ url }}</div>
          </v-col>
          <v-col md="2">
            <v-btn
              class="text-capitalize"
              depressed
              color="#0BAFFF"
              dark
              small
              @click.stop.prevent="copyTestingCode"
            >Copy</v-btn>
            <input type="hidden" id="testing-code" :value="url" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div
      style="color: #576377; font-size: 18px; margin-top: 20px; margin-bottom: 30px"
    >Base link of the application</div>
    <v-divider></v-divider>
    <div
      style="color: #576377; font-weight: 500; margin-top: 20px; font-size: 18px"
    >Organization Information</div>
    <v-row>
      <v-col md="5">
        <v-text-field v-model="companyName" flat outlined label="Name" background-color="#EDF0F5"></v-text-field>
      </v-col>
      <v-col md="5">
        <v-text-field v-model="company" flat outlined label="Company" background-color="#EDF0F5"></v-text-field>
      </v-col>
      <v-col md="2">
        <v-btn
          class="text-capitalize"
          depressed
          disabled
          color="#0BAFFF"
          width="150px"
          height="50px"
        >Save</v-btn>
      </v-col>
    </v-row>
    <div style="color: #576377;  margin-top: 20px; margin-bottom: 30px">Icon</div>
    <v-img
      width="100px"
      src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/projectFile_1591002135277_arimac_logo%201.png"
    ></v-img>
    <v-btn
      depressed
      class="text-capitalize"
      disabled
      small
      color="#0BAFFF"
      width="100px"
      style=" margin-top: 20px;"
      height="40px"
    >Upload</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // url: process.env.ORGANIZATION_URL,
      url: "https://project.arimaclanka.com",
      companyName: "Arimac Digital",
      company: "Arimac Lanka PVT LTD",
    };
  },
  methods: {
    copyTestingCode() {
      let testingCodeToCopy = document.querySelector("#testing-code");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
      } catch (err) {
        console.log("Error: " + err);
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
  },
};
</script>