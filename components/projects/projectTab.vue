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
          <div class="tab-clientName">{{ project.client }} </div>

          <div class="tab-status">{{ project.projectStatus }}</div>
          <div class="tab-health">Healthy</div>

        <div class="tab-icon">
            <v-icon @click.stop="drawer = !drawer" size="20" class="aaaaa" color="#0BAFFF">mdi-pencil-outline</v-icon>
          </div>

          </v-list-item>

          <!-- ------------------------------- -->

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
        <input v-model="projectName" placeholder="Project name" class="formElements">
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
       <input v-model="client" placeholder="client" class="formElements">
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
       <input t v-model="status" placeholder="Project status" class="formElements">
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
       <input type="date" v-model="startDate" placeholder="Project start date" class="formElements">
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
       <input type="date" v-model="endDate" placeholder="Project end date" class="formElements">
            </v-col>
        </v-row>

        <div class="submitButton deleteProjectButton">
                <v-list-item @click="" 
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


          <!-- ------------------------------------ -->

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
             <div class="detailContent">{{ project.projectStartDate }}</div>
          </v-list-item>
      </v-col>

      <v-col
        sm="6"
        md="6"
        class=""
      >
      <v-list-item class="detailList">
            <div class="detailTitle">Project end date : </div>
             <div class="detailContent">{{ project.projectEndDate }}</div>
      </v-list-item>
             </v-col>

              <v-col
        sm="6"
        md="6"
        class=""
      >
         <v-list-item>
             <div class="detailTitle">Estimated project timeline : </div>
             <div class="detailContent">2 weeks</div>
          </v-list-item>
      </v-col>

      <v-col
        sm="6"
        md="6"
        class=""
      >
      <v-list-item class="detailList">
            <div class="detailTitle">Actual time for now : </div>
             <div class="detailContent">1 week 2 days</div>
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
      <p class="projectBoxNumber">10</p>
      <p class="projectBoxtext">Due today</p>
      <v-icon size="30" color="white">mdi-calendar-blank</v-icon>
             </v-col>
            <v-col
       
        class="projectBox overDue"
      >
        <p class="projectBoxNumber">12</p>
      <p class="projectBoxtext">Due today</p>
      <v-icon size="30" color="white">mdi-alert-octagon-outline</v-icon>
      </v-col>

      <v-col
        
        class="projectBox left"
      >
      <p class="projectBoxNumber">236</p>
      <p class="projectBoxtext">Due today</p>
      <v-icon size="30" color="white">mdi-clock-outline</v-icon>
             </v-col>

              <v-col
        
        class="projectBox assign"
      >
         <p class="projectBoxNumber">12</p>
      <p class="projectBoxtext">Due today</p>
      <v-icon size="30" color="white">mdi-account-outline</v-icon>
      </v-col>

      <v-col
        
        class="projectBox completed"
      >
      <p class="projectBoxNumber">100</p>
      <p class="projectBoxtext">Due today</p>
      <v-icon size="30" color="white">mdi-check-circle-outline</v-icon>
             </v-col>
            
            </v-row>



  </v-container>
    </div>
    
</template>
<script>
export default {
    props: ['project'],
    data () {
      return {
        drawer: null,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
        ],
      }
    },
    methods: {
     
    }
}
</script>