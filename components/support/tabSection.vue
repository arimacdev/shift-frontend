<template>
    <div>
        <div class="body-div">
        <div class="tabSectionSupport">
          <v-tabs background-color="#151515" slider-size="3" dark>
            <v-tab
              class="tabInactiveStyle text-capitalize"
              active-class="adminTabTitleStyle text-capitalize"
              v-on:click="component = 'summary-tab'"
              >Summary</v-tab
            >
            <v-tab
              class="tabInactiveStyle text-capitalize"
              active-class="adminTabTitleStyle text-capitalize text-capitalize"
              v-on:click="component = 'request-tab'"
              >Requests</v-tab
            >
            <v-tab
              class="tabInactiveStyle text-capitalize"
              active-class="adminTabTitleStyle text-capitalize"
              v-on:click="component = 'users-tab'"
              >Users</v-tab
            >
          </v-tabs>
        </div>
      </div>

      <div class="componentContent">
        <component v-bind:is="component"></component>
      </div>
    </div>
</template>

<script>

import Users from "~/components/support/users";
import Summary from "~/components/support/summary";
import Request from "~/components/support/request";
export default {
     components: {
    "users-tab": Users,
    "summary-tab": Summary,
    "request-tab": Request,
  },
  data() {
    return {
      overlay: false,
      component: "summary-tab",
    };
  },
}
</script>