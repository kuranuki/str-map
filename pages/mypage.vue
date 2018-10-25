<template lang="pug">
  div(v-if="user")
    str-entry-dialog(:dialog="!this.isEntered")
    .headline.text-xs-center.pa-5
      div(v-if="bottomNav === 'mypage'")
        v-avatar(:tile="false", :size="100", color="grey lighten-4")
          img(:src="user.icon_url")
        div {{ user.name }}
        .strength(:style="{ backgroundColor: colorIndex[user.strength1] }") １位： {{ user.strength1 }}
        .strength(:style="{ backgroundColor: colorIndex[user.strength2] }") ２位： {{ user.strength2 }}
        .strength(:style="{ backgroundColor: colorIndex[user.strength3] }") ３位： {{ user.strength3 }}
        .strength(:style="{ backgroundColor: colorIndex[user.strength4] }") ４位： {{ user.strength4 }}
        .strength(:style="{ backgroundColor: colorIndex[user.strength5] }") ５位： {{ user.strength5 }}
      div(v-else-if="bottomNav === 'strmap'")
        | 一覧画面
        div
          nuxt-link(to="/") トップpに
        div
          nuxt-link(to="/maps/abc") つよみマップ
      div(v-else)
        v-btn(@click="clickLogout") ログアウト

    v-bottom-nav(:active.sync="bottomNav" :value="true" color="white" fixed="")
      v-btn(color="teal" flat value="mypage")
        span マイページ
        v-icon face
      v-btn(color="teal" flat value="strmap")
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
  @Getter('strength/colorIndex')
  colorIndex

  bottomNav = 'mypage'

  clickLogout() {
    this.logout().then(() => this.$router.push('/'))
  }
}
</script>

<style lang="scss" scoped>
.strength {
  padding: 10px;
}
</style>
