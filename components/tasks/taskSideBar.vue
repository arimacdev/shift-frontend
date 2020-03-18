<template>
  <v-navigation-drawer
      v-model="drawer"
      absolute
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
       <input type="text" onfocusin="(this.type='date')" onfocusout="(this.type='text')" v-model="startDate" placeholder="Project start date" class="formElements">
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
       <input type="text" onfocusin="(this.type='date')" onfocusout="(this.type='text')" v-model="endDate" placeholder="Project end date" class="formElements">
            </v-col>
        </v-row>

      
        
        </form>
    </v-navigation-drawer>
</template>

<script>

  export default {
    data() {
      return {
        drawer: null,
        items: [
          
        ],
      }
    },
    components: {
     
    },
  }
</script>

