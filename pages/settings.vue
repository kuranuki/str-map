<template lang="pug">
  div
    str-entry-dialog(:dialog="!this.isEntered")
    .headline.text-xs-center.pa-5
      v-btn(@click="clickLogout") ログアウト

    v-bottom-nav(:active.sync="bottomNav" :value="true" color="white" fixed="")
      v-btn(color="teal" flat value="mypage" @click="$router.push('/mypage')")
        span マイページ
        v-icon face
      v-btn(color="teal" flat value="strmap" @click="$router.push('/maps')")
        span つよみマップ
        v-icon assessment
      v-btn(color="teal" flat value="settings")
        span 設定
        v-icon settings
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import StrEntryDialog from '~/components/StrEntryDialog.vue'

const user = namespace('user')
const maps = namespace('maps')

@Component({
  components: {
    StrEntryDialog
  }
})
export default class extends Vue {
  @user.Action('logout')
  logout
  @user.Getter('isEntered')
  isEntered

  bottomNav = 'settings'

  clickLogout() {
    this.logout().then(() => this.$router.push('/'))
  }
}
</script>
