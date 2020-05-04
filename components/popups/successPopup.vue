<template>
  <div class="popupDiv">
    <transition name="slide-fade">
      <v-card class="popupContent">
        <v-list-item>
          <v-list-item-action>
            <v-icon size="20" color="#2EC973">mdi-check</v-icon>
          </v-list-item-action>
          <v-list-item-content class="buttonText">
            <v-list-item-title class="popupTitle">Success</v-list-item-title>
            <v-list-item-subtitle
              v-if="successMessage != null"
              class="popupSubtitle"
            >{{successMessage}}</v-list-item-subtitle>
            <v-list-item-subtitle v-else class="popupSubtitle">Successfully completed</v-list-item-subtitle>
          </v-list-item-content>

          <div>
            <v-icon size="15" class="closeButton" color="red">mdi-close-circle-outline</v-icon>
          </div>
        </v-list-item>
      </v-card>
    </transition>
  </div>
</template>
<script>
export default {
  props: ["successMessage"]
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>