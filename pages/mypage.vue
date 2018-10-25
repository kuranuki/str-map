<template lang="pug">
  div
    .headline.text-xs-center.pa-5
      v-btn(@click="clickLogout") ログアウト
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'

const user = namespace('user')

@Component({})
export default class extends Vue {
  @Action('user/logout')
  logout

  clickLogout() {
    this.logout().then(() => this.$router.push('/'))
  }
}
</script>
