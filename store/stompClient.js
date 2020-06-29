import Stomp from "stompjs";
import SockJS from "sockjs-client";

export const state = () => ({
    client: null,
    typingStatus: false
  });

  export const mutations = {
    SET_STOMP_CLIENT(state, val) {
        console.log("mutation", val)
        state.client = val
    },
    SET_TYPING_STATUS(state, status) {
      state.typingStatus = status
  },
  };


export const actions = {
     setStompClient({ commit }, taskId) {
        console.log("initalize websocket connection for task", taskId);
        const url = "http://localhost:8080/api/pm-service";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
          console.log("connecting to ws...");
          let socket = new SockJS(url + "/chat");          
          let stompClient = Stomp.over(socket);
          commit('SET_STOMP_CLIENT',stompClient)     
    },
    setTypingStatus({ commit }, status) {          
        commit('SET_TYPING_STATUS',status)     
  },
};
  