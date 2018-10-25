<template lang="pug">
  div(v-if="user")
    .headline.text-xs-center.pa-5
      div
        |  {{ user.name }}
      v-btn(@click="clickLogout") ログアウト
      div
        str-entry-dialog(:dialog="!this.isEntered")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import StrEntryDialog from '~/components/StrEntryDialog.vue'

const user = namespace('user')

@Component({
  components: {
    StrEntryDialog
  }
})
export default class extends Vue {
  @user.Action('logout')
  logout
  @user.State('user')
  user
  @user.Getter('isEntered')
  isEntered

  clickLogout() {
    this.logout().then(() => this.$router.push('/'))
  }
}
</script>
