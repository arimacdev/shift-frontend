<template>
<div class="formDiv">
    <p class="createprojectTitle"> You're about to start a new project </p>
    <form>
      <v-container class="">
    <v-row
      class="mb-6"
      no-gutters
    >
      <v-col
        sm="5"
        md="6"
        class="textGrids"
      >
            <v-text-field
              v-model="name"
              :error-messages="errors"
              label="Project name"
              required
              class="formItems"
              filled
              flat
            ></v-text-field>
      </v-col>

      <v-col
       sm="5"
        md="6"
        class="textGrids"
      >
              <v-select
                v-model="client"
                :items="items"
                :error-messages="errors"
                label="Client"
                data-vv-name="select"
                required
                class="formItems custom"
              filled
              flat
              ></v-select>
      </v-col>
    </v-row>
    <v-row
      class="mb-6"
      no-gutters
    >
      <v-col
      sm="5"
        md="6"
        class="textGrids"
      >
            <v-text-field
              v-model="startDate"
              :error-messages="errors"
              label="Project start date"
              required
              class="formItems"
              type="date"
              filled
              flat
              append-icon="mdi-calendar-blank-outline"
            ></v-text-field>
      </v-col>

      <v-col
        sm="5"
        md="6"
        class="textGrids"
      >
        
            <v-text-field
              v-model="endDate"
              :error-messages="errors"
              label="Project end date"
              required
              class="formItems"
              type="date"
              filled
              flat
              append-icon="mdi-calendar-blank-outline"
              color="indigo darken-4"
            ></v-text-field>
      </v-col>
    </v-row>
    <v-row
      class="mb-6"
      no-gutters
    >
      <v-col
       sm="5"
        md="6"
        class="textGrids"
      >
       
            <v-text-field
              v-model="timeline"
              :error-messages="errors"
              label="Estimated project timeline"
              required
              class="formItems"
              filled
              flat
            ></v-text-field>
      </v-col>

      <v-col
      sm="5"
        md="6"
        class="textGrids"
      >
        
      </v-col>
    </v-row>
  </v-container>
  
       <div class="createTask tasksButtons">
                <v-list-item @click="" 
                dark >
                    <v-list-item-action>
                        <v-icon size="20" color="">mdi-calendar-blank-multiple</v-icon>
                    </v-list-item-action>
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="bodyWiew">Add task</v-list-item-title>
                    </v-list-item-content>
                        <v-icon>mdi-plus-circle</v-icon>
                    </v-list-item>
        </div>
      <!-- <v-btn @click="clear">clear</v-btn> -->
      <!-- <v-btn class="mr-4" @click="">submit</v-btn> -->
    </form>

</div>
</template>

<script>
 

  export default {
     
    components: {
    },
    data: () => ({
      name: '',
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: null,
    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$refs.observer.reset()
      },
    },
  }
</script>

<style scoped>
.formDiv{
    margin-left: 250px;
    padding: 20px;
}
.createprojectTitle{
    font-style: normal;
    font-weight: 450;
    font-size: 20px;
}
.textGrids{
  padding: 10px;
  /* background-color: #f5f5f5; */
}
.formItems{
}
.createTask{
    background-color: #0BAFFF;
    width: 30%;
}
.tasksButtons{
    border-radius: 5px;
    float: left;
    margin-right: 5px;
    float: right;
}
</style>