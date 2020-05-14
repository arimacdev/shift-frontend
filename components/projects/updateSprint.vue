<template>
  <div>
    <v-row justify="center" class>
      <v-dialog v-model="dialog" persistent max-width="350">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon color="#FFFFFF">
            <v-icon size="20">mdi-square-edit-outline</v-icon>
          </v-btn>
        </template>
        <v-card class="addUserPopup">
          <v-form v-model="isValid" ref="form">
            <div class="popupFormContent">
              <v-icon class size="60" color="deep-orange lighten-1">mdi-square-edit-outline</v-icon>
              <v-card-text class="deletePopupTitle">Update sprint</v-card-text>
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
                  label="Sprint description*"
                  outlined
                  class
                  v-on="on"
                  clearable
                  :rules="sprintDescriptionRules"
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
                  @click="updateSprint"
                  :retain-focus="false"
                  :disabled="!isValid"
                >Save</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </div>
          </v-form>
          <div class="updateSprintPopup">
            <div @click="close">
              <component
                v-bind:is="component"
                :success="success"
                :successMessage="successMessage"
                :errorMessage="errorMessage"
              ></component>
            </div>
            <!-- <success-popup /> -->
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
export default {
  props: ["projectId", "sprintName", "description", "sprintId"],
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup
  },
  data() {
    return {
      sprintName: this.sprintName,
      sprintDescription: this.description,
      modal: false,
      dates: ["", ""],
      userId: this.$store.state.user.userId,
      errorMessage: "",
      successMessage: "",
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
    async updateSprint() {
      let response;
      try {
        response = await this.$axios.$put(
          `/sprints/${this.projectId}/${this.sprintId}`,
          {
            sprintName: this.sprintName,
            sprintDescription: this.sprintDescription
          },
          {
            headers: {
              userId: this.userId
            }
          }
        );
        this.$store.dispatch("sprints/sprint/updateProjectSprint", {
          sprintId: this.sprintId,
          sprintName: this.sprintName,
          sprintDescription: this.sprintDescription
        });
        this.$refs.form.reset();

        this.component = "success-popup";
        this.successMessage = "Sprint successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        // this.$store.dispatch("sprints/sprint/addProjectSprint", response.data);
        // console.log("Sprint Added", response.data);
      } catch (e) {
        console.log("Error adding a group", e);
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
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