export const state = () => ({
  project: {},
  projects: [],
  projectFiles: [],
  projectFolders: [
    {
      folders: '',
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
    state.projectFolders = projectFolders;
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
