<template>
<div class="popupDiv">
    <transition :duration="{ enter: 500, leave: 800 }">
    <v-card class="errorPopupContent">
        <v-list-item>
        <v-list-item-action>
                        <v-icon size="25" color="red">mdi-alert-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="popupTitle">Error occurred!</v-list-item-title>
                        <div v-if="errorMessage.status != 500 && errorMessage.status != 400" class="popupSubtitle errorSubtitle"> {{errorMessage.message}} </div>
                        <div v-else-if="errorMessage.status == 400" class="popupSubtitle errorSubtitle"> Bad request</div>
                        <div v-else-if="errorMessage.status == 500" class="popupSubtitle errorSubtitle"> Server error</div>
                        <div v-else class="popupSubtitle errorSubtitle"> Please try again</div>
                    </v-list-item-content>

                     <div>
                        <v-icon size="15" @click="" class="closeButton" color="red">mdi-close-circle-outline</v-icon>
                    </div>
     </v-list-item>

     
    
    </v-card>
    </transition>
</div>
</template>
<script>
export default {
  props: ['errorMessage']
  
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
</style>