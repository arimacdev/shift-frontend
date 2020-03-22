import axios from 'axios';

  export const state =  {
        userProfile: {}
  }

  export const mutations = {
      SET_PROFILE_PICTURE(state, event){
        state.userProfile = event
      }
    // ADD_EVENT(state, event){
    //   state.events.push(event);
    // },
    // SET_EVENTS(state, events){
    //   state.events = events;
    // },
    // SET_EVENT(state, event){
    //   state.event = event;
    // }
  }

  export const actions = {
    fetchProfilePicture({commit, rootState}){
        const userId = rootState.user.userId;
        console.log("Call user profile", rootState.user.userId);
        axios
        .get(`http://localhost:8080/api/pm-service/users/${userId}`)
        .then(res => {
            console.log("state data --->", res.data.data);
            commit('SET_PROFILE_PICTURE', res.data.data);
        })
        .catch(error => {
            console.log("Error fetching user data")
        //     const notification = {
        //       type: 'error',
        //       message: 'There was a problem fetching event' + error.message
        //   }
            // dispatch('add', notification)
        })
    //   }
    }

    //   fetchEvent({commit, getters, dispatch}, id){
    //     var event = getters.getEventById(id);
    //     if(event){
    //       commit('SET_EVENT', event);
    //     } else {
    //     axios
    //     .get('http://localhost:3000/events/'+ id)
    //     .then(res => {
    //         console.log("Response", res.data);
    //         commit('SET_EVENT', res.data);
    //     })
    //     .catch(error => {
    //         console.log("error: ", error.response)
    //         const notification = {
    //           type: 'error',
    //           message: 'There was a problem fetching event' + error.message
    //       }
    //         dispatch('add', notification)
    //     })
    //   }
    //   }
  
    // createEvent({commit, dispatch}, event){      
    //   axios.post('http://localhost:3000/events', event).then(() => {
    //     commit('ADD_EVENT', event)
    //     const notification = {
    //         type: 'success',
    //         message: 'Your event has been created' 
    //     }
    //       dispatch('add', notification)
    //   }).catch(error => {
    //     const notification = {
    //         type: 'error',
    //         message: 'There was a problem creating your event' + error.message
    //     }
    //     dispatch('add', notification)
    //     throw error
    //   })
    // },
    // fetchEvents({commit, dispatch}){
    //   axios
    //         .get('http://localhost:3000/events')
    //         .then(res => {
    //             console.log("Response", res.data);
    //             commit('SET_EVENTS', res.data);
    //         })
    //         .catch(error => {
    //             console.log("error: ", error)
    //             const notification = {
    //                 type: 'error',
    //                 message: 'There was a problem fetching events' + error.message
    //             }
    //             dispatch('add', notification)
    //         })
    // },
  
    
  }

  export const getters = {
    profilePic: state => {
      return state.profilePic
    },
    // doneTodos: state => {
    //   return state.todos.filter(todo => todo.done)
    // },
    // activeTodosCount: (state, getters) => {
    //   return state.todos.length - getters.doneTodos.length
    // },
    // getEventById: (state) => (id) => {
    //   return state.events.find(event => event.id === id)
    // }
}