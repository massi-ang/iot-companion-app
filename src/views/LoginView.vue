<template>
  <div class="home">
    <LoginComp></LoginComp>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginComp from '@/components/Login'

export default {
  name: 'LoginView',
  components: {
    LoginComp
  }
}
</script>
