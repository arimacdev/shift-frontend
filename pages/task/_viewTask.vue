<template>
  <div class="top-nav">
    <navigation-drawer :user="user" :currentUser="currentUser" />
    {{ this.taskId }}
  </div>
</template>



<script>
import NavigationDrawer from "~/components/navigationDrawer";
export default {
  components: {
    NavigationDrawer
  },
  data: {
    taskId: "",
    projectId: ""
  },
  created() {
    this.taskId = this.$route.params.viewTask;
  }
};
</script>