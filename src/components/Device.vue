<template>
  <div class="panel">
    <div class="panel-heading bgc-dark-raspberry">
      <h3 class="mg-clear tc-white">
        <strong>{{device.friendly_name}}</strong>
      </h3>
    </div>
    <div class="panel-body">
      
      <img v-if="device.state && device.state.powerState == 'OFF'" src="/img/lazyload-ph.png" data-src="img/lamp_off.jpg" class="img-responsive lazyload medium-size" />
      <img v-if="device.state && device.state.powerState == 'ON'" src="/img/lazyload-ph.png" data-src="img/lamp_on.jpg" class="img-responsive lazyload medium-size" />
      <img v-if="device.state && !device.state.powerState" src="/img/lazyload-ph.png" data-src="img/lamp_unknown.jpg" class="img-responsive lazyload medium-size" />
      <p>
        You new smart lamp. Click to remove from your account.
      </p>
      <div class="text-center">
        <button class="btn btn-dark-magenta btn-sq btn-lg" @click="unclaim()">Unclaim</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceComp',
  props: ['device'],
  methods: {
    unclaim() {
      window.alert('Implement me!')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

medium-size {
  width: 200px
}
</style>
