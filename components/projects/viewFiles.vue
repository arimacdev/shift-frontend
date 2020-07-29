<template>
  <div class="fileScroll overflow-y-auto">
    <div class="buttonMenuDiv">
      <v-menu min-width="200px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn small rounded outlined color="#949494" v-bind="attrs" v-on="on">
            <v-icon size="20" dark>mdi-plus</v-icon>
            <v-list-item-title
              style="color: #576377 !important"
              class="text-capitalize fontRestructure14"
            >New</v-list-item-title>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-file-upload-outline</v-icon>
            </v-list-item-action>
            <v-list-item-title style="color: #576377 !important">New File Upload</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-row style="margin-top: 30px">
      <v-col>
        <v-list-item-title>Files</v-list-item-title>
      </v-col>
    </v-row>
  </div>
</template>