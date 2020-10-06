<template>
  <div class="pdfContainer">
    <h1>HI There</h1>
    {{ selectedMeeting }}
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      selectedMeeting: (state) => state.meetings.meeting.selectedMeeting,
    }),
  },
};
</script>
