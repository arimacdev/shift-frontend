import axios from 'axios';

  export const state = () => ({
    subtasks: [],
    subTaskFiles: []
})

export const mutations = {  
    SET_SUBTAKS(state, subtasks){
      state.subtasks = subtasks;
    },
    SET_SUBTAK__FILES(state, subTaskFiles){
        state.subTaskFiles = subTaskFiles;
      }
  }

export const actions = {
    async fetchSubTasks({commit, rootState}, {projectId, taskId}){
      console.log("store fetch subtasks", projectId, taskId)
        const userId = rootState.user.userId;
        let subTaskResponse;
        try {
             subTaskResponse = await this.$axios.$get(`/projects/${projectId}/tasks/${taskId}/subtask?userId=${userId}`,{
              headers: {
                'type': 'project'
             }
            }) 
             console.log("fetch subtasks from store--->", subTaskResponse.data);
             commit('SET_SUBTAKS', subTaskResponse.data);
       //get files related to task
       let taskFilesResponse;
       try {
       taskFilesResponse = await this.$axios.$get(`/projects/${projectId}/tasks/${taskId}/files`,
       {
         headers: {
           user: userId,
           'type': 'project'
        }
       }
       ) 
       console.log("fetch files from store --->", taskFilesResponse.data)     ;
       commit('SET_SUBTAK__FILES', taskFilesResponse.data);   
        } catch (error) {
           console.log("Error fetching data", error);
        }                      
        } catch (error) {
           console.log("Error fetching data", error);
        }       
       
    }    
  }

export const getters = {
    getSubTasks: state => {
      return state.subtasks
    },
    getSubTaskFiles: state => {
        return state.subTaskFiles
      }     
}