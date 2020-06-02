import colors from 'vuetify/es5/util/colors';

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '' },
  /*
   ** Global CSS
   */
  css: ['@/assets/style.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vuelidate.js',
    '~/plugins/datepicker.js',
    '~/plugins/vuedatetime.js',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/auth'],
<<<<<<< Updated upstream
=======
  env: {
    SLACK_AUTHORIZATION_ENDPOINT:
      process.env.SLACK_AUTHORIZATION_ENDPOINT ||
      'https://slack.com/oauth/v2/authorize',
    SLACK_TOKEN_ENDPOINT:
      process.env.SLACK_TOKEN_ENDPOINT || 'SLACK_TOKEN_ENDPOINT',
    SLACK_CLIENT_ID:
      process.env.SLACK_CLIENT_ID || '345426929140.1020110511447',
    SLACK_CLIENT_SECRET:
      process.env.SLACK_CLIENT_SECRET || 'fd851b7af77e525c1700879de9b328ab',
    ORGANIZATION_URL:
      process.env.ORGANIZATION_URL || 'https://project.arimaclanka.com',
  },
>>>>>>> Stashed changes
  /*
   ** Base URL
   ** http://pmtool.devops.arimac.xyz/api/pm-service
   ** http://localhost:8080/api/pm-service
   ** UserId - Admin
   ** 138bbb3d-02ed-4d72-9a03-7e8cdfe89eff
   */
  axios: {
    baseURL: `${process.env.BASE_URL}/api/pm-service`,
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
<<<<<<< Updated upstream
<<<<<<< Updated upstream

  env: {
    ORGANIZATION_URL:
      process.env.ORGANIZATION_URL || 'https://project.arimaclanka.com',
  },

=======
=======
>>>>>>> Stashed changes
  env: {
    ORGANIZATION_URL:
      process.env.ORGANIZATION_URL || 'https://project.arimaclanka.com',
    LOGOUT_URL:
      process.env.LOGOUT_URL ||
      'https://project.arimaclanka.com/auth/realms/pm-tool/protocol/openid-connect/logout',
  },
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  auth: {
    strategies: {
      local: false,
      keycloak: {
        _scheme: 'oauth2',
        authorization_endpoint: `${process.env.BASE_URL}/auth/realms/pm-tool/protocol/openid-connect/auth`,
        userinfo_endpoint: `${process.env.BASE_URL}/auth/realms/pm-tool/protocol/openid-connect/userinfo`,
        access_token_endpoint: `${process.env.BASE_URL}/auth/realms/pm-tool/protocol/openid-connect/token`,
        scope: ['openid', 'roles', 'profile'],
        grant_type: 'authorization_code',
        response_type: 'code',
        token_type: 'Bearer',
        client_id: `${process.env.KEYCLOAK_CLIENT_ID}`,
        token_key: 'access_token',
      },
    },
    redirect: {
      login: '/',
      home: '/projects/projects',
      callback: '/',
    },
    localStorage: false,
  },

  router: {
    middleware: ['auth', 'token'],
  },

  constants: {
    hostUrl: `${process.env.BASE_URL}`,
    appUrl: `${process.env.BASE_URL}`,
    realm: `${process.env.KEYCLOAK_REALM}`,
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
};
