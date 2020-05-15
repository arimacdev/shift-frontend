<template>
  <div>
    <div class="myWorkloadV2Content">
      <!-- -------------- component of the content ----------- -->

      <workload-content :selectedUser="selectedUser" />
    </div>
  </div>
</template>
<script>
import NavigationDrawer from "~/components/navigationDrawer";
import usersSearchBar from "~/components/tools/usersSearchBar";
import WorkloadContent from "~/components/workload/workloadContent";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    NavigationDrawer,
    "workload-content": WorkloadContent
  },
  data() {
    return {
      userId: this.$store.state.user.userId,
      component: "add-user",
      workLoad: {},
      userData: {},
      firstName: "",
      lastName: "",
      selectedUser: "",
      skill: "",
      search: null,
      select: {},
      states: [],
      drawer: null
    };
  },

  created() {
    this.$store.dispatch("workload/fetchAllTaskLoadUsers");
    this.$store.dispatch("project/clearProject");
  },

  watch: {
    search(val) {
      console.log("value is ", val);
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {},
  computed: {
    ...mapState({
      taskWorkLoadUsers: state => state.workload.taskWorkLoadUsers
    })
  },
  created: function() {
    this.selectedUser = this.userId;
    this.$store.dispatch("workload/fetchAllWorkloadTasks", {
      userId: this.userId,
      from: "all",
      to: "all"
    });
  }
};
</script>