<template>
  <v-card class="tabs orgWorkloadTopTabs">
    <v-tabs>
      <v-tab @click="changeTabView('task')">
        <span class="tabHeaders">Search</span>
      </v-tab>
      <v-tab @click="changeTabView('board')">
        <span class="tabHeaders">Calander</span>
      </v-tab>
      <v-tab @click="changeTabView('people')">
        <span class="tabHeaders">Overview</span>
      </v-tab>

      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
        <search-tab />
      </v-tab-item>
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
        <v-card flat>
          <calander-tab />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
        <v-card flat>
          <overview-tab />
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
import SearchTab from "~/components/workload/searchTab";
import CalanderTab from "~/components/workload/calanderTab";
import OverviewTab from "~/components/workload/overviewTab";
export default {
  components: {
    "search-tab": SearchTab,
    "calander-tab": CalanderTab,
    "overview-tab": OverviewTab
  },
  methods: {
    changeTabView(type) {}
  }
};
</script>