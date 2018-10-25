<template lang="pug">
  div(v-if="user")
    .headline.text-xs-center.pa-5
      div
        |  {{ user.name }}
      v-btn(@click="clickLogout") ログアウト
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'

const user = namespace('user')

@Component({})
export default class extends Vue {
  @user.Action('logout')
  logout
  @user.State('user')
  user

  clickLogout() {
    this.logout().then(() => this.$router.push('/'))
  }
}
</script>
