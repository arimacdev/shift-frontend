<template>
  <div>
    <v-row>
      <v-col md="4">
        <div class="searchTabLeftBar">
          <span class="containsText">Contains Text</span>

          <v-text-field outlined solo flat background-color="#FFFFFF"></v-text-field>
          <v-row align="center">
            <v-col cols="12">
              <v-autocomplete
                v-model="values"
                :items="items"
                flat
                outlined
                dense
                chips
                background-color="#EDF0F5"
                small-chips
                label="Outlined"
                multiple
              ></v-autocomplete>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col md="8">
        <div class="searchTabRightBar">test</div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: ["foo", "bar", "fizz", "buzz"],
    value: null
  })
};
</script>