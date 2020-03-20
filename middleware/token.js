// import jsonwebtoken from "jsonwebtoken";
var jwt = require('jsonwebtoken');

export default async function ({ store, error , app}) {
    let token = " " + app.$auth.getToken('keycloak')
    store.commit('user/setAccessToken', token);
    token = token.slice(8, token.length).trimLeft();
    const decodedJwt = jwt.decode(token); 
    store.commit('user/setUserId', decodedJwt);
  }
   