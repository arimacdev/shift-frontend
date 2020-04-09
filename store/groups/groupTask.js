export const state = () => ({
    groupTasks: [],
})

export const mutations = {
    SET_GROUP_TASKS(state, groupTasks){
        state.groupTasks = groupTasks;
    },

    ADD_GROUP_TASK(state, groupTask){
        state.groupTasks.push(groupTask);
    },

    UPDATE_GROUP_TASK(state, {taskId,  type, value}){
    // const task = state.groupTasks.find(element => element.taskId = taskId);
        console.log("updateTask", taskId, type, value)
        const prevTasks = state.groupTasks;
        const index = prevTasks.findIndex(i => i.taskId === taskId)
        const updateTask = prevTasks[index];
        updateTask[type] = value
        console.log("index updated task",  index, updateTask);
        state.groupTasks.splice(index, 1, updateTask);
    },

    UPDATE_GROUP_TASK_DATES(state, {taskId, dueDate, remindDate}){
        console.log("updateTask dates", taskId, dueDate, remindDate)
        const prevTasks = state.groupTasks;
        const index = prevTasks.findIndex(i => i.taskId === taskId);
        const updateTask = prevTasks[index];
        updateTask.taskDueDateAt = dueDate;
        updateTask.taskReminderAt = remindDate;
        console.log("index updated task",  index, updateTask);
        state.groupTasks.splice(index, 1, updateTask);
    },

    REMOVE_TASK(state, taskId){
        const index = state.groupTasks.findIndex(i => i.taskId === taskId);
        console.log("index remove", index, taskId)
        state.groupTasks.splice(index, 1);
    }
}

export const actions = {

    async fetchGroupTasks({commit, rootState}, {taskGroupId, userId}){
      const user = rootState.user.userId;
       let getGroupTaskResponse;
       try {
           getGroupTaskResponse = await this.$axios.$get(`/projects/${taskGroupId}/tasks?userId=${userId}`,
           {
               headers : {
                   user: user,
                   type: 'taskGroup'
               }
           })
           console.log("group task get response", getGroupTaskResponse.data);
           commit('SET_GROUP_TASKS', getGroupTaskResponse.data)
       } catch(e) {
           console.log("Error fetching group tasks",e);
       }
    },

    async addTaskToGroup({commit, rootState, state, dispatch}, {taskName, taskGroupId}){
        const userId = rootState.user.userId;
        let response;
        try{
        response = await this.$axios.$post(`/projects/${taskGroupId}/tasks`, 
        {
          taskName: taskName,
          projectId: taskGroupId,
          taskInitiator: userId,
          taskDueDate: null,
          taskRemindOnDate: null,
          taskType: 'taskGroup'
        }
      )
      const newGroup = response.data;
      console.log("group tasks", state.groupTasks.length == 0)
      if(state.groupTasks.length !== 0){
        newGroup.taskAssigneeProfileImage = state.groupTasks[0].taskAssigneeProfileImage;
        commit('ADD_GROUP_TASK', newGroup);
      } else {
        dispatch('fetchGroupTasks',{
            taskGroupId: taskGroupId,
            userId: userId
          });
      }
     
      console.log("Added Task to Group Successfully!",response.data);
     } catch(e){
        console.log("Error adding a group task", e);
     } 
    },

    updateGroupTask({commit}, {taskId, type, value}){
        console.log("taskId", taskId, " task name", value)
            commit('UPDATE_GROUP_TASK',{
                taskId: taskId,
                type : type,
                value : value
            })       
    },

    updateGroupTaskDates({commit}, {taskId, dueDate, remindDate}){
            commit('UPDATE_GROUP_TASK_DATES',{
                taskId: taskId,
                dueDate : dueDate,
                remindDate : remindDate
            })       
    },

    removeTaskFromTaskGroup({commit}, taskId){
        commit('REMOVE_TASK', taskId)
    }
}

export const getters = {
    getGroups: state => {
      return state.myGroups
    }
}