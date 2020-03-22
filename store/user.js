export const state = () => ({
    access_token : '',
    userId: '',
    organizationalRole: ''
})

export const mutations = {
    setAccessToken (state, value) {
      state.access_token = value
    },
    setUserId(state, value){
        state.userId = value
    },
    setOrganizationalRole(state, value){
        state.organizationalRole = value;
    }
  }