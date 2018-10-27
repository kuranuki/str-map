<template lang="pug">
  div
    str-entry-dialog(:dialog="!this.isEntered")
    .headline.text-xs-center.pa-5
      v-btn(@click="clickLogout") ログアウト

    main-bottom-nav(bottomNav="settings")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import StrEntryDialog from '~/components/StrEntryDialog.vue'
import MainBottomNav from '~/components/MainBottomNav.vue'

const user = namespace('user')
const maps = namespace('maps')

@Component({
  components: {
    StrEntryDialog,
    MainBottomNav
  }
})
export default class extends Vue {
  @user.Action('logout')
  logout
  @user.Getter('isEntered')
  isEntered

  clickLogout() {
    this.logout().then(() => this.$router.push('/'))
  }
}
</script>
