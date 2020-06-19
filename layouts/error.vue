<template>
  <v-row class="errorPageContainer">
    <v-col md="8" sm="12" class="errorPageImage">
      <img
        width="100%"
        src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/projectFile_1592549257245_Asset%202@4x.png"
        alt
      />
    </v-col>
    <v-col md="4" sm="12" class="errorPageText">
      <div class="errorMessage" v-if="error.statusCode === 404">{{ pageNotFound }}</div>
      <div class="errorMessage" v-else>{{ otherError }}</div>
      <NuxtLink to="/" style="text-decoration: none">
        <v-btn small color="red" dark>Back to home</v-btn>
      </NuxtLink>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "Something went wrong"
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
