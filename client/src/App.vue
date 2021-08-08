<template>
  <div id="app" class="min-h-screen max-w-screen-lg m-auto">
    <prompt />
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import Prompt from './components/Prompt.vue'
export default {
  components: {
    Prompt
  },
  data() {
    return {
      EventHub: new Vue() 
    }
  },
  provide() {
    return {
      EventHub: this.EventHub
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
