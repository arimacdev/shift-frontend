<template>
  <div>
    <v-row justify class>
      <v-dialog v-model="dialog" persistent max-width="350">
        <template v-slot:activator="{ on }">
          <div v-on="on" class="addChildButton" @click="loadDetails()">
            <v-list-item class="addParentButtonBody" v-on:click="component = 'add-task'" dark>
              <v-list-item-action>
                <v-icon size="15" color>mdi-account-supervisor-outline</v-icon>
              </v-list-item-action>
              <v-list-item-content class="buttonText">
                <span class>Add Child</span>
              </v-list-item-content>
            </v-list-item>
          </div>
        </template>
        <v-card class="addUserPopup">
          <v-form v-model="isValid" ref="form">
            <div class="popupFormContent">
              <v-icon class size="60" color="deep-orange lighten-1">mdi-account-supervisor-outline</v-icon>
              <v-card-text class="deletePopupTitle">Add child task</v-card-text>
              <v-card-actions>
                <v-select
                  class="popupFormGroupElement"
                  v-model="parentTask"
                  :items="parentTasks"
                  item-text="name"
                  item-value="id"
                  label="Child task"
                  outlined
                  :rules="assigneeRules"
                  @mousedown="getParentTasks"
                  clearable
                >
                  <template v-slot:selection="data">
                    <template>
                      <v-list-item-action>
                        <v-list-item-subtitle v-html="data.item.secondaryId"></v-list-item-subtitle>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </template>
                  <template v-slot:item="data">
                    <template>
                      <v-list-item-content>
                        <v-list-item-subtitle v-html="data.item.secondaryId"></v-list-item-subtitle>

                        <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </template>
                </v-select>
              </v-card-actions>
            </div>

            <!-- <v-btn class="deleteButton" text @click="dialog = false">Cancel</v-btn>
            <v-btn class="editButton addUserSave" text @click="changeHandler">Save</v-btn>-->

            <div class="popupBottom">
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  depressed
                  class="text-capitalize"
                  color="error"
                  width="100px"
                  @click="
                    dialog = false;
                    clearStore();
                  "
                  :retain-focus="false"
                >Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  depressed
                  class="text-capitalize"
                  color="success"
                  width="100px"
                  @click="
                    changeHandler();
                    clearStore();
                  "
                  :retain-focus="false"
                  :disabled="!isValid"
                >Save</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </div>
          </v-form>
        </v-card>
      </v-dialog>
      <div @click="close" class="parentChildPopup">
        <component
          v-bind:is="component"
          :successMessage="successMessage"
          :errorMessage="errorMessage"
        ></component>
        <!-- <success-popup /> -->
      </div>
    </v-row>
  </div>
</template>

<script>
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import { mapState } from "vuex";
export default {
  props: ["taskId", "projectId"],
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
  },
  data() {
    return {
      parentTask: "",
      parentTasks: [],
      errorMessage: "",
      successMessage: "",
      isValid: true,
      userId: this.$store.state.user.userId,
      assigneeRules: [(value) => !!value || "Child task is required!"],
      isShow: false,
      selected: false,
      dialog: false,
      loading: false,
      items: [],
      search: null,
      select: null,
      states: [],
      component: "",
      success: "",
      newTask: this.task,
      newTaskId: this.taskId,
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  methods: {
    clearStore() {
      this.$emit("clearStore");
    },
    loadDetails() {
      this.$store.dispatch("task/emptyStore");
      this.$store.dispatch("task/setIndex", {
        startIndex: 0,
        endIndex: 10,
        isAllTasks: true,
      });
      this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
    },
    close() {
      this.$refs.form.reset();
      this.component = "";
    },
    getParentTasks(v) {
      // console.log("parent task list", this.projectAllTasks);
      this.parentTasks = [];
      let parentSearchList = this.projectAllTasks;
      for (let index = 0; index < parentSearchList.length; ++index) {
        let task = parentSearchList[index];
        if (
          task.childTasks.length == 0 &&
          task.parentTask.taskId != this.taskId
        ) {
          this.parentTasks.push({
            name: task.parentTask.taskName,
            id: task.parentTask.taskId,
            secondaryId: task.parentTask.secondaryTaskId,
          });
        }
      }

      // console.log("nameList", this.states);
      this.loading = true;
    },
    onSelectedUser() {
      if (this.select !== undefined) {
        // this.$emit('searchSelected', this.select);
        // console.log("selected user",this.select)
      }
    },

    async changeHandler() {
      // console.log("onchange sprint", this.newTask);
      // console.log("onchange parent Task----->", this.parentTask, this.taskId);
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.parentTask}/parent/transition`,
          {
            newParent: this.taskId,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.dialog = false;
        this.component = "success-popup";
        this.successMessage = "Child Task Added successfully";
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
        this.$store.dispatch("task/setCurrentTask", {
          projectId: this.projectId,
          taskId: this.taskId,
        });
        this.$store.dispatch("task/fetchChildren", {
          projectId: this.projectId,
          taskId: this.taskId,
        });
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log('update parent task', response);

        this.clearStore();
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error Adding Child Tasks", e);
      }
    },
  },
  computed: {
    adminStatus: {
      get() {
        return this.selected;
      },
      set(value) {
        this.selected = !this.selected;
      },
    },
    ...mapState({
      projectAllTasks: (state) => state.task.allTasks,
    }),
  },
};
</script>

<style scoped></style>
