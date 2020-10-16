export const state = () => ({
  allTasks: [],
  fullTaskList: [],
  myTasks: [],
  sprintTasks: [],
  userCompletionTasks: [],
  projectTaskCompletion: {},
  taskFiles: [],
  childTasks: [],
  selectedTask: {},
  parentTask: {},
  startIndex: 0,
  endIndex: 10,
  isAllTasks: false,
  totalCount: 0,
  myTaskCount: 0,
});

export const mutations = {
  EMPTY_STORE(state, elements) {
    state.allTasks = elements;
    state.myTasks = elements;
  },
  SET_TOTAL_COUNT(state, count) {
    state.totalCount = count;
  },
  SET_MY_TASK_COUNT(state, count) {
    state.myTaskCount = count;
  },
  SET_INDEX(state, { startIndex, endIndex, isAllTasks }) {
    state.startIndex = startIndex;
    state.endIndex = endIndex;
    state.isAllTasks = isAllTasks;
  },
  SET_SELECTED_TASK(state, task) {
    if (state.selectedTask.taskId === task.taskId) {
      state.selectedTask = {};
      state.selectedTask = task;
    } else {
      state.selectedTask = task;
    }
  },
  SET_SPRINT_TASKS(state, event) {
    state.sprintTasks = event;
  },
  SET_ALL_TASKS(state, event) {
    // const sorted = event.sort((a, b) => {
    //   const userA = a.parentTask.taskCreatedAt.toUpperCase();
    //   const userB = b.parentTask.taskCreatedAt.toUpperCase();

    //   if (userA > userB) return -1;
    //   if (userA < userB) return 1;

    //   return 0;
    // });
    // state.allTasks = event;
    state.allTasks = state.allTasks.concat(event);
  },
  SET_FULL_TASKS_LIST(state, event) {
    state.fullTaskList = event;
  },
  SET_CHILD_TASKS(state, children) {
    state.childTasks = children;
  },
  SET_PARENT_TASK(state, task) {
    state.parentTask = task;
  },
  SET_MY_TASKS(state, event) {
    // state.myTasks = event;
    state.myTasks = state.myTasks.concat(event);
  },
  SET_USER_TASK_COMPLETION(state, event) {
    // const sorted = event.sort((a, b) => {
    //   const userA = a.assigneeFirstName.toUpperCase();
    //   const userB = b.assigneeFirstName.toUpperCase();

    //   if (userA < userB) return -1;
    //   if (userA > userB) return 1;

    //   return 0;
    // });
    state.userCompletionTasks = event;
  },
  SET_PROJECT_TASK_COMPLETION(state, projectTaskCompletion) {
    state.projectTaskCompletion = projectTaskCompletion;
  },
  UPDATE_TASK_SPRINT(state, { taskId, sprintId }) {
    const index = state.allTasks.findIndex((i) => i.taskId === taskId);
    const task = state.allTasks[index];
    task.sprintId = sprintId;
    state.allTasks.splice(index, 1, task);
  },
  SET_TASK_FILES(state, files) {
    state.taskFiles = files;
  },
  APPEND_TASK_FILE(state, taskFile) {
    state.taskFiles.push(taskFile);
  },
  REMOVE_TASK_FILE(state, taskFileId) {
    const index = state.taskFiles.findIndex((i) => i.taskFileId === taskFileId);
    state.taskFiles.splice(index, 1);
  },
  UPDATE_TASK(state, { taskId, taskName }) {
    console.log('update task', taskId, taskName);
    const index = state.allTasks.findIndex(
      (i) => i.parentTask.taskId == taskId
    );
    if (index > -1) {
      const task = state.allTasks[index];
      const parentTask = task.parentTask;
      parentTask.taskName = taskName;
      state.allTasks.splice(index, 1, task);
    }
  },

  UPDATE_SELECTED_DATE(state, { type, date }) {
    // console.log('selectedtask', type, date);

    const selectedTask = state.selectedTask;
    if (type == 'dueDate') {
      selectedTask.taskDueDateAt = date;
    } else {
      selectedTask.taskReminderAt = date;
    }
    // console.log('selectedtask', selectedTask);
    state.selectedTask = selectedTask;
  },
  UPDATE_SELECTED_TASK_NAME(state, taskName) {
    state.selectedTask.taskName = taskName;
  },
};

export const actions = {
  emptyStore({ commit, rootState }) {
    commit('EMPTY_STORE', []);
  },
  async fetchTotalTaskCount({ commit, rootState }, projectId) {
    const user = rootState.user.userId;
    let taskLength;
    try {
      taskLength = await this.$axios.$get(
        `/projects/${projectId}/tasks/count`,
        {
          headers: {
            userId: user,
          },
        }
      );
      console.log('task length', taskLength.data);
      commit('SET_TOTAL_COUNT', taskLength.data);
    } catch (error) {
      console.log('Error fetching task count length', error);
    }
  },
  async fetchMyTaskCount({ commit, rootState }, projectId) {
    const user = rootState.user.userId;
    let taskLength;
    try {
      taskLength = await this.$axios.$get(
        `/projects/${projectId}/tasks/user/count?userId=${user}`
      );
      console.log('task length', taskLength.data);
      commit('SET_MY_TASK_COUNT', taskLength.data);
    } catch (error) {
      console.log('Error fetching task count length', error);
    }
  },
  setIndex({ commit }, { startIndex, endIndex, isAllTasks }) {
    // console.log('SETINDEX->>>', allTasks);
    commit('SET_INDEX', { startIndex, endIndex, isAllTasks });
  },
  setSelectedTask({ commit }, task) {
    // console.log('selected->>>', task);
    commit('SET_SELECTED_TASK', task);
  },
  setSelectedTaskName({ commit }, taskName) {
    // console.log('selected->>>', task);
    commit('UPDATE_SELECTED_TASK_NAME', taskName);
  },

  async setCurrentTask({ commit, rootState }, { projectId, taskId }) {
    const userId = rootState.user.userId;
    let taskResponse;
    try {
      taskResponse = await this.$axios.$get(
        `/projects/${projectId}/tasks/${taskId}`,
        {
          headers: {
            user: userId,
          },
        }
      );
      commit('SET_SELECTED_TASK', taskResponse.data);
      // console.log('Selected Task get response', taskResponse.data);
    } catch (e) {
      console.log('Error fetching task', e);
    }
  },

  updateTask({ commit }, { taskId, taskName }) {
    // console.log('update task', taskId, taskName);
    commit('UPDATE_TASK', { taskId, taskName });
  },

  updateProjectDates({ commit }, { type, date }) {
    commit('UPDATE_SELECTED_DATE', { type, date });
  },

  async fetchParentTask(
    { commit, rootState, dispatch },
    { projectId, taskId }
  ) {
    const userId = rootState.user.userId;
    let taskResponse;
    try {
      taskResponse = await this.$axios.$get(
        `/projects/${projectId}/tasks/${taskId}`,
        {
          headers: {
            user: userId,
          },
        }
      );
      commit('SET_PARENT_TASK', taskResponse.data);
      // console.log('fetchParentTask', taskResponse.data);
      dispatch('user/fetchParentTaskUser', taskResponse.data.taskAssignee, {
        root: true,
      });
    } catch (e) {
      console.log('Error fetching task', e);
    }
  },

  fetchChildren({ commit, rootState }, { projectId, taskId }) {
    const userId = rootState.user.userId;
    this.$axios
      .get(`projects/${projectId}/tasks/${taskId}/children`, {
        headers: {
          user: userId,
        },
      })
      .then((response) => {
        // console.log(
        //   'CHILD TASKS ARE RETRIEVED SUCCESSFULLY-->',
        //   response.data.data
        // );
        commit('SET_CHILD_TASKS', response.data.data);
      })
      .catch((e) => {
        console.log('error retrieving children', e);
      });
  },
  fetchTasksAllTasks({ commit, rootState }, projectId) {
    const userId = rootState.user.userId;
    this.$axios
      .get(
        `projects/${projectId}/tasks?userId=${userId}&startIndex=${rootState.task.startIndex}&endIndex=${rootState.task.endIndex}&allTasks=${rootState.task.isAllTasks}`,
        {
          headers: {
            type: 'project',
          },
        }
      )
      .then((response) => {
        // console.log(
        //   'ALL TASKS ARE RETRIEVED SUCCESSFULLY-->',
        //   response.data.data
        // );
        commit('SET_ALL_TASKS', response.data.data);
      })
      .catch((e) => {
        console.log('error', e);
      });
  },
  fetchFullTaskList({ commit, rootState }, projectId) {
    const userId = rootState.user.userId;
    this.$axios
      .get(
        `projects/${projectId}/tasks?userId=${userId}&startIndex=${rootState.task.startIndex}&endIndex=${rootState.task.endIndex}&allTasks=true`,
        {
          headers: {
            type: 'project',
          },
        }
      )
      .then((response) => {
        commit('SET_FULL_TASKS_LIST', response.data.data);
      })
      .catch((e) => {
        console.log('error', e);
      });
  },

  fetchSprintTasks({ commit, rootState }, projectId) {
    const userId = rootState.user.userId;
    this.$axios
      .get(
        `projects/${projectId}/tasks?userId=${userId}&startIndex=${rootState.task.startIndex}&endIndex=${rootState.task.endIndex}&allTasks=true`,
        {
          headers: {
            type: 'project',
          },
        }
      )
      .then((response) => {
        // console.log(
        //   'ALL TASKS ARE RETRIEVED SUCCESSFULLY-->',
        //   response.data.data
        // );
        commit('SET_SPRINT_TASKS', response.data.data);
      })
      .catch((e) => {
        console.log('error', e);
      });
  },

  fetchTasksMyTasks({ commit, rootState }, projectId) {
    const userId = rootState.user.userId;
    this.$axios
      .get(
        `projects/${projectId}/tasks/user?userId=${userId}&startIndex=${rootState.task.startIndex}&endIndex=${rootState.task.endIndex}`
      )
      .then((response) => {
        // console.log(
        //   'MY TASKS ARE RETRIEVED SUCCESSFULLY-->',
        //   response.data.data
        // );
        commit('SET_MY_TASKS', response.data.data);
      })
      .catch((e) => {
        console.log('error', e);
      });
  },

  fetchProjectUserCompletionTasks({ commit, rootState }, projectId) {
    const userId = rootState.user.userId;
    this.$axios
      .get(`projects/${projectId}/tasks/${userId}/completion/details`, {
        headers: {
          user: userId,
          type: 'project',
        },
      })
      .then((response) => {
        // console.log('Completion details -->', response.data.data);
        commit('SET_USER_TASK_COMPLETION', response.data.data);
      })
      .catch((e) => {
        console.log('error fetching completed tasks', e);
      });
  },

  fetchProjectTaskCompletion({ commit, rootState }, projectId) {
    const userId = rootState.user.userId;

    this.$axios
      .get(`projects/${projectId}/tasks/completion`, {
        headers: {
          user: userId,
          type: 'project',
        },
      })
      .then((response) => {
        // console.log(
        //   'project task completion from store -->',
        //   response.data.data
        // );
        commit('SET_PROJECT_TASK_COMPLETION', response.data.data);
      })
      .catch((e) => {
        console.log('error fetching completed tasks', e);
      });
  },

  updateSprintOfATask({ commit }, { taskId, sprintId }) {
    // console.log('update sprint', sprintId, taskId);
    commit('UPDATE_TASK_SPRINT', { taskId, sprintId });
  },

  setTaskFiles({ commit }, taskFiles) {
    // console.log('taskFiles', taskFiles);
    commit('SET_TASK_FILES', taskFiles);
  },

  async fetchTaskFiles({ commit, rootState }, { projectId, taskId }) {
    const userId = rootState.user.userId;
    let taskFilesResponse;
    try {
      taskFilesResponse = await this.$axios.$get(
        `/projects/${projectId}/tasks/${taskId}/files`,
        {
          headers: {
            user: userId,
            type: 'project',
          },
        }
      );
      // console.log('store files--->', taskFilesResponse.data);
      commit('SET_TASK_FILES', taskFilesResponse.data);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  },

  appendTaskFile({ commit }, taskFile) {
    commit('APPEND_TASK_FILE', taskFile);
  },

  removeTaskFile({ commit }, taskFileId) {
    commit('REMOVE_TASK_FILE', taskFileId);
  },
};

export const getters = {
  getAllTasks: (state) => {
    return state.allTasks;
  },
  getMyTasks: (state) => {
    return state.myTasks;
  },
  getuserCompletionTasks: (state) => {
    return state.userCompletionTasks;
  },
};
