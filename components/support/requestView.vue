<template>
  <div class="requestViewContent overflow-y-auto">
    <v-row>
      <div class="projectTopSection">
        <div class="statDisplay">
          <div class="leadsContentDiv" style="background-color: #dc8343">
            <v-list-item>
              <v-list-item-icon
                style="
                  background-color: #ffffff;
                  padding: 15px;
                  border-radius: 50%;
                "
              >
                <v-icon color="#DC8343" size="20">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle"
                  >Total Requests</v-list-item-subtitle
                >
                <v-list-item-title class="leadsTitle">125</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
        <div class="statDisplay">
          <div class="leadsContentDiv" style="background-color: #66b25f">
            <v-list-item>
              <v-list-item-icon
                style="
                  background-color: #ffffff;
                  padding: 15px;
                  border-radius: 50%;
                "
              >
                <v-icon color="#66B25F" size="20">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle"
                  >Request Resolved</v-list-item-subtitle
                >
                <v-list-item-title class="leadsTitle">14</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
        <div class="statDisplay">
          <div class="leadsContentDiv" style="background-color: #ffbd00">
            <v-list-item>
              <v-list-item-icon
                style="
                  background-color: #ffffff;
                  padding: 15px;
                  border-radius: 50%;
                "
              >
                <v-icon color="#FFBD00" size="20">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle"
                  >Request Pending</v-list-item-subtitle
                >
                <v-list-item-title class="leadsTitle">120</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
      </div>
    </v-row>
    <v-row style="margin-top: 30px; margin-left: 5px">
      <v-btn
        style="margin-right: 30px"
        depressed
        color="#E07857"
        dark
        width="150px"
        >Open</v-btn
      >
      <v-btn
        style="margin-right: 30px"
        depressed
        color="#E07857"
        dark
        width="150px"
        >All</v-btn
      >
      <v-btn
        style="margin-right: 30px"
        depressed
        color="#E07857"
        dark
        width="150px"
        >Closed</v-btn
      >
    </v-row>
    <v-row style="margin-top: 30px">
      <v-list-item-group style="width: 100%">
        <v-list-item dense style="background-color: #010101 !important" dark>
          <v-list-item-action style="width: 5% !important">
            <span class="tableTitle"> Date </span>
          </v-list-item-action>
          <v-list-item-action style="width: 35% !important">
            <span class="tableTitle"> Issue </span>
          </v-list-item-action>
          <v-list-item-action style="width: 15% !important">
            <span class="tableTitle"> Support </span>
          </v-list-item-action>
          <v-list-item-action style="width: 20% !important">
            <span class="tableTitle"> Status </span>
          </v-list-item-action>
          <v-list-item-action style="width: 8% !important">
            <span class="tableTitle"> Severity </span>
          </v-list-item-action>
          <v-list-item-action style="width: 7% !important">
            <span class="tableTitle">Priority</span>
          </v-list-item-action>
          <v-list-item-action style="width: 10% !important">
            <span class="tableTitle">Action taken</span>
          </v-list-item-action>
        </v-list-item>

        <div>
          <v-list-item dense>
            <v-list-item-action style="width: 5% !important">
              <span class="tableText"> 12/13/2020 </span>
            </v-list-item-action>
            <v-list-item-action style="width: 35% !important">
              <span class="tableText"> Cannot login to system </span>
            </v-list-item-action>
            <v-list-item-action style="width: 15% !important">
              <span class="tableText"> Naveen Perera </span>
            </v-list-item-action>
            <v-list-item-action style="width: 20% !important">
              <span class="tableText">
                Resolved by Buddhika Priyabhashana
              </span>
            </v-list-item-action>
            <v-list-item-action style="width: 8% !important">
              <span class="tableText"> High </span>
            </v-list-item-action>
            <v-list-item-action style="width: 7% !important">
              <span class="tableText">2</span>
            </v-list-item-action>
            <v-list-item-action style="width: 10% !important">
              <span class="tableText">14/12/2020</span>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list-item-group>
    </v-row>
  </div>
</template>