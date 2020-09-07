import jwt from 'jsonwebtoken';

export default async function({ store, error, app }) {
  let token = ' ' + app.$auth.getToken('keycloak');
  let re_token = ' ' + app.$auth.getRefreshToken('keycloak');

  let refresh_token = re_token.slice(8, re_token.length).trimLeft();
  store.commit('user/setAccessToken', token);
  store.commit('user/setRefreshToken', refresh_token);
  token = token.slice(8, token.length).trimLeft();
  const decodedJwt = jwt.decode(token);
  const currentTime = new Date();
  // console.log('decodedJWT', token);
  if (decodedJwt != null) {
    // if (decodedJwt.exp >= currentTime.getTime()) {
    //   console.log(
    //     'VALID TOKEN------->' + decodedJwt.exp + '/' + currentTime.getTime()
    //   );
    // } else {
    //   console.log(
    //     'INVALID TOKEN------->' + decodedJwt.exp + '/' + currentTime.getTime()
    //   );
    // }

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
