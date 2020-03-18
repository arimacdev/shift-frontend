<template>
    <div class="projectTabContent">
        <v-container class="detailContainer">
    <v-row
      class="mb-12"
      no-gutters
    >
      <v-col
        sm="12"
        md="12"
        class="detailSection"
      >
      <v-list-item>
          <div class="tab-projectName">{{ project.projectName }}</div>
          <v-divider
      class="mx-3"
      inset
      vertical
    ></v-divider>
          <div class="tab-clientName">{{ project.clientId }} </div>

          <div class="tab-status">{{ project.projectStatus }}</div>
          <div class="tab-health">Healthy</div>

        <div class="tab-icon">
            <v-icon @click.stop="drawer = !drawer" size="20" class="aaaaa" color="#0BAFFF">mdi-pencil-outline</v-icon>
          </div>

          </v-list-item>

          <!-- -------------- start side bar ----------------- -->

<v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right=""
      height="100vh"
      width="350px"
      class=""
    >
      <form>
        
        <v-row
            class="mb-12 formRow projectDrawer" 
            no-gutters
            >
                <v-col
                sm="12"
                md="12"
                
            >
        <input v-model="updateProject.projectName" placeholder="Project name" class="formElements">
            </v-col>
        </v-row>

        <v-row
            class="mb-12 formRow projectDrawer" 
            no-gutters
            >
                <v-col
                sm="12"
                md="12"
                
            >
       <input v-model="updateProject.clientId" placeholder="client" class="formElements">
            </v-col>
        </v-row>
        <v-row
            class="mb-12 formRow projectDrawer" 
            no-gutters
            >
                <v-col
                sm="12"
                md="12"
                
            >
       <input t v-model="updateProject.projectStatus" placeholder="Project status" class="formElements">
            </v-col>
        </v-row>

        <v-row
            class="mb-12 formRow projectDrawer" 
            no-gutters
            >
                <v-col
                sm="12"
                md="12"
                
            >
       <input type="text" onfocusin="(this.type='date')" onfocusout="(this.type='text')" v-model="updateProject.projectStartDate" placeholder="Project start date" class="formElements">
            </v-col>
        </v-row>

        <v-row
            class="mb-12 formRow projectDrawer" 
            no-gutters
            >
                <v-col
                sm="12"
                md="12"
                
            >
       <input type="text" onfocusin="(this.type='date')" onfocusout="(this.type='text')" v-model="updateProject.projectEndDate" placeholder="Project end date" class="formElements">
            </v-col>
        </v-row>

       
          <div class="submitButton addProjectButton">
                <v-list-item @click="" 
                dark >
                    <v-list-item-action>
                        <v-icon size="20" color="">mdi-plus-circle</v-icon>
                    </v-list-item-action>
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="bodyWiew">Edit project</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </div>
       
         
            <div class="submitButton deleteProjectButton">
                <v-list-item @click="deleteData()" 
                dark >
                    <v-list-item-action>
                        <v-icon size="20" color="">mdi-trash-can-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="bodyWiew">Delete the project</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </div>
       

         

        
        
        </form>
    </v-navigation-drawer>


          <!-- --------------- end side bar --------------------- -->

          <v-row
            class="mb-12"
            no-gutters
            >
            <v-col
        sm="6"
        md="6"
        class=""
      >
         <v-list-item>
             <div class="detailTitle">Project start date : </div>
             <div class="detailContent">{{this.getProjectDates(project.projectStartDate, "startDate")}}</div>
          </v-list-item>
      </v-col>

      <v-col
        sm="6"
        md="6"
        class=""
      >
      <v-list-item class="detailList">
            <div class="detailTitle">Project end date : </div>
             <div class="detailContent">{{ this.getProjectDates(project.projectEndDate, "endDate")}}</div>
      </v-list-item>
             </v-col>

              <v-col
        sm="6"
        md="6"
        class=""
      >
         <v-list-item>
             <div class="detailTitle">Estimated project timeline : </div>
             <div class="detailContent">{{ this.getProjectTimeLine()}}</div>
          </v-list-item>
      </v-col>

      <v-col
        sm="6"
        md="6"
        class=""
      >
      <v-list-item class="detailList">
            <div class="detailTitle">Actual time for now : </div>
             <div class="detailContent">{{ this.getProjectTimeForNow()}}</div>
      </v-list-item>
             </v-col>
            
            </v-row>
      </v-col>
    </v-row>


        <v-row
            class="mb-12"
            no-gutters
            >
            <v-col
        
        class="projectBox due"
      >
      <p class="projectBoxNumber">{{taskCompletion.tasksDueToday}}</p>
      <p class="projectBoxtext">Due today</p>
      <v-icon size="30" color="white">mdi-calendar-blank</v-icon>
             </v-col>
            <v-col
       
        class="projectBox overDue"
      >
        <p class="projectBoxNumber">{{taskCompletion.tasksOverDue}}</p>
      <p class="projectBoxtext">Overdue</p>
      <v-icon size="30" color="white">mdi-alert-octagon-outline</v-icon>
      </v-col>

      <v-col
        
        class="projectBox left"
      >
      <p class="projectBoxNumber">{{taskCompletion.tasksLeft}}</p>
      <p class="projectBoxtext">Left</p>
      <v-icon size="30" color="white">mdi-clock-outline</v-icon>
             </v-col>

              <v-col
        
        class="projectBox assign"
      >
         <p class="projectBoxNumber">{{taskCompletion.tasksAssigned}}</p>
      <p class="projectBoxtext">Assigned to you</p>
      <v-icon size="30" color="white">mdi-account-outline</v-icon>
      </v-col>

      <v-col
        
        class="projectBox completed"
      >
      <p class="projectBoxNumber">{{taskCompletion.tasksCompleted}}</p>
      <p class="projectBoxtext">Completed</p>
      <v-icon size="30" color="white">mdi-check-circle-outline</v-icon>
             </v-col>
            
            </v-row>



  </v-container>
    </div>
    
</template>
<script>
export default {
    props: ['project', 'taskCompletion'],
    data () {
      return {
        updateProject: {
          "projectName": this.project.projectName,
          "clientId": this.project.clientId,
          "projectStartDate": this.project.projectStartDate,
          "projectEndDate": this.project.projectEndDate,
          "projectStatus": this.project.projectStatus
        },
        drawer: null,
        startDate: '',
        endDate: '',
        items: [
          
        ],
      }
    },

    methods: {
      async editProject(){
        console.log("update Project", this.updateProject);
        let response;
       try{
          response = await this.$axios.$put(`/projects/${this.project.projectId}`, {
          modifierId: "138bbb3d-02ed-4d72-9a03-7e8cdfe89eff",
          projectName: this.updateProject.projectName,
          clientId: this.updateProject.clientId,
          projectStartDate: this.updateProject.projectStartDate,
          projectEndDate: this.updateProject.projectEndDate,
          projectStatus: this.updateProject.projectStatus
        })
       } catch(e){
          console.log("Error updating a project", e);
       }
      },
        async deleteData(){
       console.log(this.project.projectId);
      let response;
       try{
        response = await this.$axios.$delete(`/projects/${this.project.projectId}`, {    
                data: {},
                headers: {
                    'user': '138bbb3d-02ed-4d72-9a03-7e8cdfe89eff',
                }
        })
        console.log(response.data);
       }  catch(e){
          console.log("Error creating project", e);
       }          
      },
      getProjectDates(date, type) {
          console.log(date);  
         let stringDate = new Date(date);
         console.log(stringDate);
         let formateedDate =  stringDate.getFullYear() + "-" + stringDate.getMonth() + "-"+ stringDate.getDate();
         console.log(formateedDate);
         if(type === "startDate"){
            this.startDate = formateedDate;
         } else {
           this.endDate = formateedDate;
         }
         return formateedDate;
      },
      getProjectTimeLine(){
          let startDate = new Date(this.startDate);
          let endDate = new Date(this.endDate);
          let days = parseInt((endDate - startDate) / (1000 * 60 * 60 * 24), 10); 
          let months;
          let weeks;
           if(days > 30){
             months = Math.floor(days/30)
             days = days % 30;
             return months + " month(s) " + days + " days"
           } else if(days>7 && days<30){
              weeks = Math.floor(days / 7);
              days = days % 7
              return weeks + " week(s) " + days + " days"
           } else{
             return days + " day(s)"
           }
      },
      getProjectTimeForNow(){
          let now = new Date();
          console.log("today", now)
          let startDate = new Date(this.startDate);
          console.log("startDate", this.startDate)
          let days = parseInt((now - startDate) / (1000 * 60 * 60 * 24), 10); 
           let months;
          let weeks;
           if(days > 30){
             months = Math.floor(days/30)
             days = days % 30;
             return months + " month(s) " + days + " days"
           } else if(days>7 && days<30){
              weeks = Math.floor(days / 7);
              days = days % 7
              return weeks + " week(s) " + days + " days"
           } else{
             return days + " day(s)"
           }
      }
    }
}
</script>