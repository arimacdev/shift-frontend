<template>
<div class="popupDiv">
    <transition :duration="{ enter: 500, leave: 800 }">
    <v-card class="popupContent">
        <v-list-item>
        <v-list-item-action>
                        <v-icon size="25" color="red">mdi-alert-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="popupTitle">Error occurred!</v-list-item-title>
                        <v-list-item-subtitle class="popupSubtitle"> Please try again</v-list-item-subtitle>
                    </v-list-item-content>
     </v-list-item>
    </v-card>
    </transition>
</div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
</style>