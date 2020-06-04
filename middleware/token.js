import jwt from 'jsonwebtoken';

export default async function({ store, error, app }) {
  let token = ' ' + app.$auth.getToken('keycloak');
  store.commit('user/setAccessToken', token);
  token = token.slice(8, token.length).trimLeft();
  const decodedJwt = jwt.decode(token);
  // console.log('decodedJWT', token);
  if (decodedJwt != null) {
    // console.log('Bearer token present');
    store.commit('user/setUserId', decodedJwt.userId);
    const organizationRoles = decodedJwt.realm_access.roles;
    let userRoles = [];
    organizationRoles.forEach((organizationRole) => {
      if (
        organizationRole != 'offline_access' ||
        organizationRole != 'uma_authorization'
      ) {
        userRoles.push(organizationRole);
      }
    });
    // if (organizationRole.indexOf('SUPER_ADMIN') > -1) {
    console.log('user roles --->', userRoles);
    store.commit('user/setOrganizationalRole', userRoles);
    // } else {
    //   // console.log('user role --->', 'USER');
    //   store.commit('user/setOrganizationalRole', 'USER');
    // }
  } else {
    console.log('No Bearer token present');
  }
}
