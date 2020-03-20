// import jsonwebtoken from "jsonwebtoken";
var jwt = require('jsonwebtoken');

export default async function ({ store, error , app}) {
    // await store.dispatch('kktoken/fetchProductCodesList')
    let token = app.$auth.getToken('keycloak')
    // console.log("MIDD-TOKEN", token)
    store.commit('project/increment', token);

    token = token.slice(7, token.length).trimLeft();
    const decodedJwt = jwt.decode(token); 
    console.log("DECODED", decodedJwt)
    console.log("DECODED", decodedJwt.resource_access)

    console.log("MIDDLEWARE--------------->", store.state.project.all)
  }
   