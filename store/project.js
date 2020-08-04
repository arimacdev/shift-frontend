export const state = () => ({
  project: {},
  projects: [],
  projectFiles: [],
  selectedFolderFiles: {
    folders: [],
    files: [],
  },
  filterFiles: {
    folders: [],
    files: [],
  },
  projectFolders: [
    {
      folders: [],
      files: [],
    },
  ],
  seletedProject: {},
});

export const mutations = {
  SET_PROJECT(state, project) {
    state.project = project;
  },
  CLEAR_PROJECT(state) {
    state.project = {};
  },
  FETCH_ALL_PROJECTS(state, projects) {
    const sorted = projects.sort((a, b) => {
      const projectA = a.projectName.toUpperCase();
      const projectB = b.projectName.toUpperCase();

      if (projectA < projectB) return -1;
      if (projectA > projectB) return 1;

      return 0;
    });
    state.projects = projects;
  },
  FETCH_ALL_PROJECTS_FILES(state, projectFiles) {
    state.projectFiles = projectFiles;
  },
  FETCH_ALL_PROJECTS_FOLDERS(state, projectFolders) {
    const sorted = projectFolders.folders.sort((a, b) => {
      const folderA = a.folderType;
      const folderB = b.folderType;

      if (folderA < folderB) return -1;
      if (folderA > folderB) return 1;

      return 0;
    });
    state.projectFolders = projectFolders;
  },
  FILTER_PROJECTS_FOLDERS(state, filterFiles) {
    const sorted = filterFiles.folders.sort((a, b) => {
      const folderA = a.folderType;
      const folderB = b.folderType;

      if (folderA < folderB) return -1;
      if (folderA > folderB) return 1;

      return 0;
    });
    state.filterFiles = filterFiles;
  },
  FETCH_ALL_PROJECTS_FOLDER_FILES(state, selectedFolderFiles) {
    state.selectedFolderFiles = selectedFolderFiles;
  },
  ADD_PROJECT_FILES(state, projectFiles) {
    state.projectFiles.push(...projectFiles);
  },
  REMOVE_PROJECT_FILE(state, projectFile) {
    const index = state.projectFiles.findIndex(
      (i) => i.projectFileId === projectFile
    );
    state.projectFiles.splice(index, 1);
  },
  SET_SELECTED_PROJECT(state, project) {
    state.seletedProject = project;
  },
  CLEAR_FOLDER_FILES(state){
    state.selectedFolderFiles = {
      folders: [],
      files: [],
    }
  }
};
export const actions = {
  async fetchProject({ commit, rootState }, projectId) {
    const user = rootState.user.userId;
    let projectResponse;
    try {
      projectResponse = await this.$axios.$get(`/projects/${projectId}`, {
        headers: {
          user: user,
        },
      });
      commit('SET_PROJECT', projectResponse.data);
      // console.log('fetch project response from store', projectResponse.data);
    } catch (e) {
      console.log('Error fetching fetchProject', e);
    }
  },

  clearProject({ commit }) {
    commit('CLEAR_PROJECT');
  },

  async fetchAllProjects({ commit, rootState }) {
    const user = rootState.user.userId;
    let projectResponse;
    try {
      projectResponse = await this.$axios.$get(`/projects?userId=${user}`, {
        headers: {
          user: user,
        },
      });
      commit('FETCH_ALL_PROJECTS', projectResponse.data);
      // console.log(
      //   'fetch all project response from store',
      //   projectResponse.data
      // );
    } catch (e) {
      // console.log('Error fetching projects from store', e);
    }
  },

  async fetchAllProjectFiles({ commit, rootState }, projectId) {
    const user = rootState.user.userId;
    let projectFilesResponse;
    try {
      projectFilesResponse = await this.$axios.$get(
        `/projects/${projectId}/files`,
        {
          headers: {
            user: user,
          },
        }
      );
      // console.log('project files--->', projectFilesResponse.data);
      commit('FETCH_ALL_PROJECTS_FILES', projectFilesResponse.data);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  },
  async fetchAllProjectFolders({ commit, rootState }, projectId) {
    const user = rootState.user.userId;
    let projectFilesResponse;
    try {
      projectFilesResponse = await this.$axios.$get(
        `/projects/${projectId}/folder`,
        {
          headers: {
            user: user,
          },
        }
      );
      // console.log('project files--->', projectFilesResponse.data);
      commit('FETCH_ALL_PROJECTS_FOLDERS', projectFilesResponse.data);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  },
  async fetchFilterProjectFolders(
    { commit, rootState },
    { projectId, filterText }
  ) {
    const user = rootState.user.userId;
    let projectFilesResponse;
    try {
      projectFilesResponse = await this.$axios.$get(
        `/projects/${projectId}/folder/search?name=${filterText}`,
        {
          headers: {
            user: user,
          },
        }
      );
      // console.log('project files--->', projectFilesResponse.data);
      commit('FILTER_PROJECTS_FOLDERS', projectFilesResponse.data);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  },
  clearFolderFiles({commit}){
    commit('CLEAR_FOLDER_FILES');
  },
  async fetchAllSelectedFolderFiles(
    { commit, rootState },
    { projectId, folderId }
  ) {
    const user = rootState.user.userId;
    let projectFilesResponse;
    try {
      projectFilesResponse = await this.$axios.$get(
        `/projects/${projectId}/folder/${folderId}`,
        {
          headers: {
            user: user,
          },
        }
      );
      // console.log('project files--->', projectId, folderId);
      commit('FETCH_ALL_PROJECTS_FOLDER_FILES', projectFilesResponse.data);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  },
  async addProjectFile({ commit }, projectFiles) {
    commit('ADD_PROJECT_FILES', projectFiles);
  },

  async removeProjectFile({ commit }, projectFiles) {
    commit('REMOVE_PROJECT_FILE', projectFiles);
  },
  addSelectedProject({ commit }, project) {
    commit('SET_SELECTED_PROJECT', project);
  },
};


export const getters = {
  getProject: (state) => {
    return state.project;
  },
};

export const setters = {};
