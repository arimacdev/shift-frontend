<template>
  <v-app dark>
    <v-container>
     

      <v-row align="center">
        
                <v-datetime-picker v-model="datetime">
                  <template slot="dateIcon">
                    <v-icon>fas fa-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>fas fa-clock</v-icon>
                  </template>
                </v-datetime-picker>
             

      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Vue from 'vue'
import DatetimePicker from 'vuetify-datetime-picker'
// (Optional) import 'vuetify-datetime-picker/src/stylus/main.styl'

Vue.use(DatetimePicker)
import '@fortawesome/fontawesome-free/css/all.css'
export default {
  data() {
    return {
      nullDatetime: null,
      datetime: new Date(),
      // datetimeString: '2019-01-01 12:00',
      // formattedDatetime: '09/01/2019 12:00',
      textFieldProps: {
        appendIcon: 'event'
      },
      dateProps: {
        headerColor: 'red'
      },
      timeProps: {
        useSeconds: true,
        ampmInTitle: true
      }
    }
  }
}
</script>