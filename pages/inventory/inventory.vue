<template>
  <div class="top-nav">
    <navigation-drawer :user="user" />

    <div>
      <v-btn @click="generateReport()">OK</v-btn>
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
      >
        <section slot="pdf-content">
          <!-- PDF Content Here -->
          <h1>hi</h1>
        </section>
      </vue-html2pdf>
    </div>
  </div>
</template>
<script>
import NavigationDrawer from '~/components/navigationDrawer';
// import VueHtml2pdf from 'vue-html2pdf';

export default {
  components: {
    NavigationDrawer,
    // VueHtml2pdf,
  },
  created() {
    this.$store.dispatch('project/clearProject');
  },
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
};
</script>
