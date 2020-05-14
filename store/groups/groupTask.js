export const state = () => ({
  groupTasks: [],
  groupTaskFiles: [],
  selectedGroupTask: {},
  children: [],
  parentTask: {
    taskId: '',
    taskName: '',
    taskAssignee: '',
    taskGroupId: '',
    taskStatus: '',
    taskDueDateAt: '',
    taskAssigneeProfileImage: '',
    isParent: true,
  },
});

export const mutations = {
  SET_GROUP_TASKS(state, groupTasks) {
    state.groupTasks = groupTasks;
  },

  SET_CHILD_TASKS(state, children) {
    state.children = children;
  },

  ADD_GROUP_TASK(state, groupTask) {
    state.groupTasks.push(groupTask);
  },

  ADD_SELECTED_TASK(state, task) {
    state.selectedGroupTask = task;
  },

  SET_GROUP_TASK_FILES(state, groupTaskFiles) {
    state.groupTaskFiles = groupTaskFiles;
  },

  APPEND_TASK_FILE(state, taskFile) {
    state.groupTaskFiles.push(taskFile);
  },

  DELETE_TASK_FILE(state, taskFileId) {
    const index = state.groupTaskFiles.findIndex(
      (i) => i.taskFileId === taskFileId
    );
    if (index > -1) {
      state.groupTaskFiles.splice(index, 1);
    }
  },

  ADD_PARENT_TASK(state, taskId) {
    console.log('parenttaskiD', taskId);

    console.log('parent', state.groupTasks);
    for (let index = 0; index < state.groupTasks.length; index++) {
      const parentTask = state.groupTasks[index];
      console.log('parent', parentTask.parentTask);

      if (parentTask.parentTask.taskId === taskId) {
        state.parentTask = parentTask.parentTask;
      }
    }
    console.log('parent!', state.parentTask);
  },

  UPDATE_SELECTED_DATE(state, { type, date }) {
    console.log('selectedtask', type, date);

    const selectedGroupTask = state.selectedGroupTask;
    if (type == 'dueDate') {
      selectedGroupTask.taskDueDateAt = date;
    } else {
      selectedGroupTask.taskReminderAt = date;
    }
    console.log('selectedtask', selectedGroupTask);
    state.selectedGroupTask = selectedGroupTask;
    console.log('selectedtask', state.selectedGroupTask);
  },

  UPDATE_GROUP_TASK(state, { taskId, type, value }) {
    // const task = state.groupTasks.find(element => element.taskId = taskId);
    console.log('updateTask', taskId, type, value);
    const prevTasks = state.groupTasks;
    const index = prevTasks.findIndex((i) => i.parentTask.taskId === taskId);
    const updateTask = prevTasks[index];
    updateTask[type] = value;
    console.log('index updated task', index, updateTask);
    state.groupTasks.splice(index, 1, updateTask);
  },

  UPDATE_GROUP_TASK_DATES(state, { taskId, dueDate, remindDate }) {
    console.log('updateTask dates', taskId, dueDate, remindDate);
    const prevTasks = state.groupTasks;
    const index = prevTasks.findIndex((i) => i.taskId === taskId);
    const updateTask = prevTasks[index];
    updateTask.taskDueDateAt = dueDate;
    updateTask.taskReminderAt = remindDate;
    console.log('index updated task', index, updateTask);
    state.groupTasks.splice(index, 1, updateTask);
  },

  REMOVE_TASK(state, taskId) {
    const index = state.groupTasks.findIndex((i) => i.taskId === taskId);
    console.log('index remove', index, taskId);
    state.groupTasks.splice(index, 1);
  },
};

export const actions = {
  async fetchGroupTasks({ commit, rootState }, { taskGroupId, userId }) {
    console.log('fetchGroupTasks', taskGroupId, userId);
    const user = rootState.user.userId;
    let getGroupTaskResponse;
    try {
      getGroupTaskResponse = await this.$axios.$get(
        `/taskgroup/${taskGroupId}/tasks?userId=${userId}`,
        {
          headers: {
            user: user,
            type: 'taskGroup',
          },
        }
      );
      console.log('group task get response', getGroupTaskResponse.data);
      commit('SET_GROUP_TASKS', getGroupTaskResponse.data);
    } catch (e) {
      console.log('Error fetching group tasks', e);
    }
  },

  updateProjectDates({ commit }, { type, date }) {
    commit('UPDATE_SELECTED_DATE', { type, date });
  },

  setGroupTaskFiles({ commit }, taskFiles) {
    commit('SET_GROUP_TASK_FILES', taskFiles);
  },

  appendTaskFile({ commit }, taskFile) {
    commit('APPEND_TASK_FILE', taskFile);
  },

  deleteTaskFile({ commit }, taskFileId) {
    commit('DELETE_TASK_FILE', taskFileId);
  },

  async addTaskToGroup(
    { commit, rootState, state, dispatch },
    { taskName, taskGroupId, parentTaskId }
  ) {
    const userId = rootState.user.userId;
    let response;
    try {
      response = await this.$axios.$post(`/taskgroup/${taskGroupId}/task`, {
        taskName: taskName,
        taskGroupId: taskGroupId,
        taskInitiator: userId,
        taskDueDate: null,
        taskRemindOnDate: null,
        parentTaskId: parentTaskId,
      });
      const newGroup = response.data;
      // console.log('group tasks', state.groupTasks.length == 0);
      // if (state.groupTasks.length !== 0) {
      //   newGroup.taskAssigneeProfileImage =
      //     state.groupTasks[0].taskAssigneeProfileImage;
      // commit('ADD_GROUP_TASK', newGroup);
      // } else {
      dispatch('fetchGroupTasks', {
        taskGroupId: taskGroupId,
        userId: userId,
      });
      // }

      console.log('Added Task to Group Successfully!', response.data);
    } catch (e) {
      console.log('Error adding a group task', e);
    }
  },

  updateGroupTask({ commit }, { taskId, type, value }) {
    console.log('taskId', taskId, ' task name', value);
    commit('UPDATE_GROUP_TASK', {
      taskId: taskId,
      type: type,
      value: value,
    });
  },

  updateGroupTaskDates({ commit }, { taskId, dueDate, remindDate }) {
    commit('UPDATE_GROUP_TASK_DATES', {
      taskId: taskId,
      dueDate: dueDate,
      remindDate: remindDate,
    });
  },

  removeTaskFromTaskGroup({ commit }, taskId) {
    commit('REMOVE_TASK', taskId);
  },

  addSelectedGroupTask({ commit }, taskGroupTask) {
    commit('ADD_SELECTED_TASK', taskGroupTask);
  },

  async setCurrentTask({ commit, rootState }, { taskGroupId, taskId }) {
    const userId = rootState.user.userId;
    let taskResponse;
    try {
      taskResponse = await this.$axios.$get(
        `/taskgroup/${taskGroupId}/tasks/${taskId}`,
        {
          headers: {
            user: userId,
          },
        }
      );
      commit('ADD_SELECTED_TASK', taskResponse.data);
      console.log('Selected Task get response', taskResponse.data);
    } catch (e) {
      console.log('Error fetching task', e);
    }
  },
  fetchChildren({ commit, rootState }, { taskGroupId, taskId }) {
    const userId = rootState.user.userId;
    this.$axios
      .get(`taskgroup/${taskGroupId}/tasks/${taskId}/children`, {
        headers: {
          user: userId,
        },
      })
      .then((response) => {
        console.log(
          'CHILD TASKS ARE RETRIEVED SUCCESSFULLY-->',
          response.data.data
        );
        commit('SET_CHILD_TASKS', response.data.data);
      })
      .catch((e) => {
        console.log('error retrieving children', e);
      });
  },

  addParentTask({ commit }, taskId) {
    commit('ADD_PARENT_TASK', taskId);
  },
};

export const getters = {
  getGroups: (state) => {
    return state.myGroups;
  },
};
