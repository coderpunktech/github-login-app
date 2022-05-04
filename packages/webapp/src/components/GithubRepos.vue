<template>
  <div class="container hero">
    <div v-if="!loading && error === null">
      <div class="card custom" v-for="(repo, $index) in repos" v-bind:key="$index" @click="open(repo.html_url)">
        <div class="card-content">
          <p class="title">{{ repo.name }}</p>
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="repo.owner.avatar_url" :alt="repo.owner.login">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ repo.owner.type }}</p>
              <p class="subtitle is-6">{{ repo.owner.login }}</p>
            </div>
          </div>

          <div class="content">
            <p v-if="repo.description !== null">
              {{ repo.description }}
            </p>
            <p v-else>
              No description.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!loading && error !== ''">
      <b-message type="is-danger">
        {{ error }}
      </b-message>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  data() {
    return {
      repos: [],
      loading: true,
      error: ''
    }
  },
  methods: {
    open(url: string) {
      window.open(url)
    }
  },
  mounted() {
    const token = this.$store.state.auth.token
    this.error = ''
    axios({
      method: 'get',
      url: 'https://api.github.com/user/repos',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      this.loading = false
      this.repos = response.data
    }).catch((err) => {
      this.loading = false
      this.repos = []
      this.error = 'Error fetching the user repos'
      console.error(err)
    })
  }
})
</script>
<style lang="css">
.custom {
  width: 300px;
  display: inline-table;
  margin: 5px;
  height: 350px;
}
</style>