import jwt from 'jsonwebtoken';

export default async function({ store, error, app }) {
  let token = ' ' + app.$auth.getToken('keycloak');
  store.commit('user/setAccessToken', token);
  token = token.slice(8, token.length).trimLeft();
  const decodedJwt = jwt.decode(token);
  console.log('decodedJWT', decodedJwt);
  if (decodedJwt != null) {
    console.log('Bearer token present');
    store.commit('user/setUserId', decodedJwt.userId);
    const organizationRole = decodedJwt.realm_access.roles;
    if (organizationRole.indexOf('SUPER_ADMIN') > -1) {
      console.log('user role --->', 'SUPER_ADMIN');
      store.commit('user/setOrganizationalRole', 'SUPER_ADMIN');
    } else {
      console.log('user role --->', 'USER');
      store.commit('user/setOrganizationalRole', 'USER');
    }
  } else {
    console.log('No Bearer token present');
  }
}
