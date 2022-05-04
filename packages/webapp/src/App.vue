<template>
  <div id="app">
    <github-login v-if="$store.state.auth.token === null"/>
    <github-repos v-else/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GithubLogin from './components/auth/GithubLogin.vue';
import GithubRepos from './components/GithubRepos.vue'

@Component({
  components: {
    GithubLogin,
    GithubRepos
  },
  mounted() {
    const bearerToken = this.$cookies.get('bearer')
    this.$store.state.auth.token = bearerToken
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
