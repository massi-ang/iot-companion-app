<template>
  <div id="app">
    <div class="bloc bgc-paynes-grey d-bloc" id="bloc-0">
      <div class="container bloc-sm">
        <nav class="navbar row">
          <div class="navbar-header">
            <router-link class="navbar-brand ltc-white" to="/"><img src="/img/iot.png" alt="logo" width="45" height="45" />AIoT</router-link>
            <button id="nav-toggle" type="button" class="ui-navbar-toggle navbar-toggle" data-toggle="collapse" data-target=".navbar-1">
              <span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
            </button>
          </div>
          <div class="collapse navbar-collapse navbar-1 special-dropdown-nav">
            <ul class="site-navigation nav navbar-nav">
              <li>
                <router-link to="/" class="ltc-white">Home</router-link>
              </li>
              <li v-if="this.signedIn">
                <amplify-sign-out></amplify-sign-out>
              </li>
              <li v-if="!this.signedIn">
                <router-link to="/login" class="ltc-white">Login</router-link>
              </li>
            </ul>
          </div>
        </nav>
        <router-view/>
      </div>
      
    </div>
    
    
  </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'

export default {
  name: 'app',
  data() {
    return {
      signedIn: false
    }
  },
  beforeCreate() {
    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.signedIn = true
        this.$router.push('/')
      }
      if (info === 'signedOut') {
        this.$router.push('/login')
        this.signedIn = false
      }
    });

    Auth.currentAuthenticatedUser()
      .then(() => {
        this.signedIn = true
      })
      .catch(() => this.signedIn = false)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
