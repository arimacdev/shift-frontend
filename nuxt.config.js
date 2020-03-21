import colors from 'vuetify/es5/util/colors'

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
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '' },
  /*
  ** Global CSS
  */
  css: [
    "@/assets/style.css"
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/vuelidate.js'],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
     '@nuxtjs/auth'
  ],
/*
  ** Base URL
  ** http://pmtool.devops.arimac.xyz/api/pm-service
  ** http://localhost:8080/api/pm-service
  ** UserId - Admin
  ** 138bbb3d-02ed-4d72-9a03-7e8cdfe89eff
  */
  axios: {
      
    baseURL: 'http://pmtool.devops.arimac.xyz/api/pm-service'
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
 auth: {
  strategies: {
    local: false,
    keycloak: {
      _scheme: 'oauth2',
      authorization_endpoint: 'http://pmtool.devops.arimac.xyz/auth/realms/pm-tool/protocol/openid-connect/auth',
      userinfo_endpoint: 'http://pmtool.devops.arimac.xyz/auth/realms/pm-tool/protocol/openid-connect/userinfo',
      access_token_endpoint: 'http://pmtool.devops.arimac.xyz/auth/realms/pm-tool/protocol/openid-connect/token',
      scope: ['openid', 'roles', 'profile'],
      grant_type: 'authorization_code',
      response_type: 'code',
      token_type: 'Bearer',
      client_id: 'pmtool-frontend',
      token_key: 'access_token'
    }
  },
  redirect: {
    login: '/',
    home: '/mainPages/projects',
    callback: '/'
  },
  localStorage: false
},

router: {
  middleware: ['auth', 'token']
},


constants: {
  hostUrl: 'http://pmtool.devops.arimac.xyz',
  appUrl: 'http://pmtool.devops.arimac.xyz',
  realm: 'pm-tool'
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
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
