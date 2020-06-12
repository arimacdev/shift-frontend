<template>
  <div class="skillsContentWrapper">
    <v-row>
      <v-col>Skill Category Name</v-col>
    </v-row>
    <v-row>
      <v-col>
        <div style="float: left">
          <span class="display-1 font-weight-bold">{{selectedCategory.categoryName}}</span>
          &nbsp;
          <v-divider vertical></v-divider>
        </div>
        <div style="float: left">
          <v-row>
            <v-col>
              <span style="margin-left: 30px; ">Color</span>
            </v-col>
            <v-col>
              <div
                :style="'height: 20px; width: 20px; border-radius: 5px; background-color:' + selectedCategory.categoryColorCode"
              ></div>
            </v-col>
            <v-col>
              <v-btn
                @click="deleteDialog = true"
                style="margin-left: 30px; margin-top: -10px "
                color="error"
                class="text-capitalize"
              >Delete Skill Category</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <v-divider style="margin-top: 20px"></v-divider>
    <v-row>
      <v-col md="5">
        Skills
        <div class="skillsDiv">Vue JS</div>
        <v-btn color="#0BAFFF" dark height="45px" class="skillsDiv">
          <v-list-item>
            <v-list-item-content class="text-capitalize">Add New Skill</v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-plus-circle</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-btn>
      </v-col>
    </v-row>
    {{selectedCategory}}
    <!-- --------- delete category dialog ------ -->
    <v-dialog v-model="deleteDialog" max-width="350">
      <v-card style="text-align: center ; padding-bottom: 25px">
        <v-card-title style="text-align: center">
          <v-spacer></v-spacer>Delete Skill Category
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text>If you delete the skill category, all skills will remove from the users that has been assigned.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn width="100px" color="#FF6161" dark @click="deleteDialog = false">Cancel</v-btn>

          <v-btn
            width="100px"
            color="#2EC973"
            dark
            @click="deleteDialog = false; deleteCategory()"
          >Ok</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      deleteDialog: false,
      userId: this.$store.state.user.userId,
      errorMessage: "",
      successMessage: ""
    };
  },
  methods: {
    close() {
      this.component = "";
    },
    async deleteCategory() {
      let response;
      try {
        response = await this.$axios.$delete(
          `/category/${this.selectedCategory.categoryId}`,
          {
            headers: {
              userId: this.userId
            }
          }
        );
        this.$store.dispatch("skillMatrix/fetchSkillCategory");
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error creating project", e);
      }
    }
  },
  computed: {
    ...mapState({
      selectedCategory: state => state.skillMatrix.selectedCategory
    })
  }
};
</script>