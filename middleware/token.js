// import jsonwebtoken from "jsonwebtoken";
var jwt = require('jsonwebtoken');
export default async function ({ store, error , app}) {
    let token = " " + app.$auth.getToken('keycloak')
    console.log("access_token", token);
    store.commit('user/setAccessToken', token);
    token = token.slice(8, token.length).trimLeft();
    const decodedJwt = jwt.decode(token); 
    console.log("decodedJWT",decodedJwt);
    if(decodedJwt != null){
      console.log("no auth token")
      store.commit('user/setUserId', decodedJwt.userId);
      // $auth.loginWith('keycloak')
    }
  }