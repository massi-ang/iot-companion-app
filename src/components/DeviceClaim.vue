<template>
   <div class="panel">
    <div class="panel-heading bgc-dark-raspberry">
      <h3 class="mg-clear tc-white">
        <strong>{{ deviceid }}</strong>
      </h3>
    </div>
    <div class="panel-body">
      <img src="img/lazyload-ph.png" data-src="/img/lamp.jpg" class="img-responsive lazyload" />
      <form id="form_14847" novalidate>
        <div class="form-group">
          <input class="form-control" placeholder="Friendly name" v-model="name"/>
          <input class="form-control" placeholder="SKU" v-model="sku"/>
        </div>
      </form>
      <p>
        You new smart lamp. Click to add to your account.
      </p>
      <div class="text-center">
        <button @click="claim()" class="btn btn-dark-magenta btn-sq btn-lg">Claim</button>
      </div>
    </div>
  </div>
</template>

<script>
import { API, Auth } from 'aws-amplify'

var apiName = 'CompanionAppAPI'
export default {
  name: 'DeviceClaim',
  props: ['deviceid'],
  data() {
      return {
          name: '',
          sku: '',
          userId: ''
      }
  },
  created() {
    Auth.currentAuthenticatedUser()
      .then(async (user) => { 
        this.userId = user.username
      })
      .catch(() => { this.$router.push('/login')});
  },
  methods: {
    claim: function() {
      API.post(apiName, '/devices', { body: { 'userId': this.userId, 'deviceId': this.deviceid, 'sku': this.sku, 'name': this.name}}).then( res => {
      console.log(res)
      this.$router.push('/')
      }).catch(err=> { console.log(err), window.alert('Something went wrong!')})
    }
  }
}
</script>

<style scoped>
bold {
    font-weight: 200
}
</style>