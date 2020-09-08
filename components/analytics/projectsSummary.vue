<template>
  <div class="projectSummarypage">
    <v-row>
      <div class="projectTopSection">
        <div class="leadsDisplay">
          <div class="leadsContentDiv" style="background-color: #66B25F">
            <v-list-item>
              <v-list-item-icon
                style="background-color: #FFFFFF; padding: 15px; border-radius: 50%"
              >
                <v-icon size="20">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle">Total Projects</v-list-item-subtitle>
                <v-list-item-title class="leadsTitle">125</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div class="leadsAnalyticsText">2 (+1%) over the past 30 days</div>
        </div>
        <div class="leadsDisplay">
          <div class="leadsContentDiv" style="background-color: #E07857">
            <v-list-item>
              <v-list-item-icon
                style="background-color: #FFFFFF; padding: 15px; border-radius: 50%"
              >
                <v-icon size="20">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle">Pending Leads</v-list-item-subtitle>
                <v-list-item-title class="leadsTitle">14</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div class="leadsAnalyticsText">2 (+1%) over the past 30 days</div>
        </div>
        <div class="leadsDisplay">
          <div class="leadsContentDiv" style="background-color: #67D2E0">
            <v-list-item>
              <v-list-item-icon
                style="background-color: #FFFFFF; padding: 15px; border-radius: 50%"
              >
                <v-icon size="20">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle">Leads Ongoing</v-list-item-subtitle>
                <v-list-item-title class="leadsTitle">44</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div class="leadsAnalyticsText">2 (+1%) over the past 30 days</div>
        </div>
        <div class="leadsDisplay">
          <div class="leadsContentDiv" style="background-color: #E0CA57">
            <v-list-item>
              <v-list-item-icon
                style="background-color: #FFFFFF; padding: 15px; border-radius: 50%"
              >
                <v-icon size="20">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle">Leads Conversion</v-list-item-subtitle>
                <v-list-item-title class="leadsTitle">153</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div class="leadsAnalyticsText">2 (+1%) over the past 30 days</div>
        </div>
        <div class="leadsDisplay">
          <div class="leadsContentDiv">
            <div>
              <v-text-field solo dense background-color="#EDF0F5" flat label="All time"></v-text-field>

              <v-text-field
                style="margin-top: -20px !important"
                solo
                dense
                background-color="#EDF0F5"
                flat
                label="Feb 2020 - Mar 2020"
              ></v-text-field>
            </div>
          </div>
        </div>
      </div>
    </v-row>
    <v-row>
      <div class="summaryTitleSection">
        <div class="titleSectionDiv">Summary</div>
        <div class="titleSearchSection">
          <v-text-field solo dense background-color="#EDF0F5" flat label="Search here"></v-text-field>
        </div>
        <div class="titleSearchSection">
          <v-text-field solo dense background-color="#EDF0F5" flat label="Status"></v-text-field>
        </div>
      </div>
    </v-row>
    <v-row>
      <div class="summaryTableDiv">
        <v-list-item style="background-color: #010101 !important" dark>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Project</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">No of Tasks</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Completed Tasks</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Health</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <div class="tableContentScroll overflow-y-auto">
          <!-- ------ loop list here ------ -->
          <v-list-item-group>
            <v-list-item class="tableContentRecord">
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">PM - Tool</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">423</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">198</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">Healthy</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="tableContentRecord">
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">PM - Tool</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">423</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">198</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">Healthy</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>
      </div>
    </v-row>
    <v-row>
      <div class="summaryTitleSection">
        <div class="titleSectionDiv">Project Status</div>
        <div class="titleSearchSection">
          <v-text-field solo dense background-color="#EDF0F5" flat label="Search here"></v-text-field>
        </div>
        <div class="titleSearchSection">
          <v-text-field solo dense background-color="#EDF0F5" flat label="Status"></v-text-field>
        </div>
      </div>
    </v-row>
    <v-row>
      <div class="summaryTableDiv">
        <v-list-item style="background-color: #010101 !important" dark>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Project</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Created</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Status</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Total Tasks</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Members</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Owner</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Engagement</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Time Taken</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <div class="tableContentScroll overflow-y-auto">
          <!-- ------ loop list here ------ -->
          <v-list-item-group>
            <v-list-item class="tableContentRecord">
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">PM - Tool</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">12-10-2020</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">Pending</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">1245</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">10</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">Naveen</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">12</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">5 Days</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>
      </div>
    </v-row>
  </div>
</template>
