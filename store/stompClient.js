import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

export const state = () => ({
  client: null,
  typingStatus: false,
  typingUser: '',
});

export const mutations = {
  SET_STOMP_CLIENT(state, val) {
    // console.log("mutation", val)
    state.client = val;
  },
  SET_TYPING_STATUS(state, status) {
    state.typingStatus = status;
  },
  SET_TYPING_USER(state, typingUser) {
    state.typingUser = typingUser;
  },
};

export const actions = {
  setStompClient({ commit }, taskId) {
    // console.log("Store websocket connection for task", taskId);
    // let socket = new SockJS("http://localhost:8080/api/pm-service" + "/chat");
    // let clientNew = Stomp.over(socket);
    // // const url = "http://localhost:8080/api/pm-service";
    // //   console.log("connecting to ws...");
    // //   let socket = new SockJS(url + "/chat");
    // //   let stompClient = Stomp.over(socket);
    //commit('SET_STOMP_CLIENT',clientNew)
  },
  setTypingStatus({ commit }, status) {
    commit('SET_TYPING_STATUS', status);
  },
  setTypingUser({ commit }, typingUser) {
    commit('SET_TYPING_USER', typingUser);
  },
};
