<template>
  <div>
    <v-row justify="center" class>
      <v-dialog v-model="dialog" persistent max-width="350">
        <template v-slot:activator="{ on }">
          <div v-on="on" class="addSprintButton">
            <v-list-item v-on:click="component='add-task'" dark>
              <v-list-item-action>
                <v-icon size="20" color>mdi-animation-outline</v-icon>
              </v-list-item-action>
              <v-list-item-content class="buttonText">
                <v-list-item-title class="bodyWiew">Add new sprint</v-list-item-title>
              </v-list-item-content>
              <v-icon>mdi-plus-circle</v-icon>
            </v-list-item>
          </div>
        </template>
        <v-card class="addUserPopup">
          <v-form v-model="isValid" ref="form">
            <div class="popupFormContent">
              <v-icon class size="60" color="deep-orange lighten-1">mdi-card-plus-outline</v-icon>
              <v-card-text class="deletePopupTitle">Add new sprint</v-card-text>
              <v-card-actions>
                <v-text-field
                  v-model="sprintName"
                  label="Sprint name*"
                  outlined
                  class
                  v-on="on"
                  clearable
                  :rules="sprintNameRules"
                  hide-details="auto"
                ></v-text-field>
              </v-card-actions>

              <div class="sprintDateRangePicker">
                <v-text-field
                  v-model="sprintDescription"
                  label="Sprint description"
                  outlined
                  class
                  v-on="on"
                  clearable
                  hide-details="auto"
                ></v-text-field>
                <!-- <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
           v-model="dateRangeText" 
           label="Date range*" 
           readonly
           outlined=""
           class=""
            v-on="on"
            clearable=""
            :rules="dateRangeRules" hide-details="auto"
            
          ></v-text-field>
        </template>
         <v-date-picker v-model="dates" range>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
                </v-dialog>-->
              </div>
            </div>

            <div class="popupBottom">
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="error"
                  width="100px"
                  @click="dialog = false"
                  :retain-focus="false"
                >Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="success"
                  width="100px"
                  @click="addSprint"
                  :retain-focus="false"
                  :disabled="!isValid"
                >Save</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </div>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
    <div class="addSprintPopup">
      <div @click="close">
        <component v-bind:is="component" :success="success" :errorMessage="errorMessage"></component>
      </div>
      <!-- <success-popup /> -->
    </div>
  </div>
</template>

<script>
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
export default {
  props: ["projectId"],
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup
  },
  data() {
    return {
      sprintName: "",
      sprintDescription: "",
      modal: false,
      dates: ["", ""],
      userId: this.$store.state.user.userId,
      errorMessage: "",
      isValid: true,
      userId: this.$store.state.user.userId,
      sprintNameRules: [value => !!value || "Sprint name is required!"],
      sprintDescriptionRules: [
        value => !!value || "Sprint description is required!"
      ],
      dateRangeRules: [
        value => (!!value && value != " - ") || "Date range is required!"
      ],
      isShow: false,
      selected: false,
      dialog: false,
      loading: false,
      items: [],
      search: null,
      select: null,
      states: [],
      component: "",
      success: ""
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    close() {
      this.$refs.form.reset();
      this.component = "";
    },
    async addSprint() {
      let response;
      try {
        response = await this.$axios.$post(`/sprints`, {
          projectId: this.projectId,
          sprintName: this.sprintName,
          sprintCreatedBy: this.userId,
          sprintDescription: this.sprintDescription
        });
        this.$refs.form.reset();
        this.component = "success-popup";
        setTimeout(() => {
          this.close();
        }, 2000);
        this.$store.dispatch("sprints/sprint/addProjectSprint", response.data);
        console.log("Sprint Added", response.data);
      } catch (e) {
        console.log("Error adding a group", e);
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 2000);
      }
    }
  },
  computed: {
    //     dateRangeText () {
    //   return this.dates.join(' - ')
    // }
  }
};
</script>

<style scoped>
</style>