<template lang="pug">
  div
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
        | 一覧画面aaa
        ul
          li(v-for="(item, index) in maps" :key="index")
            nuxt-link(:to="'/maps/' + item.id") {{ item.name }}
        div
          nuxt-link(to="/") トップpに
        div
          nuxt-link(to="/maps/abc") つよみマップ
        .create
          v-form(ref="form" v-model="valid" lazy-validation)
            v-text-field(v-model="mapName" label="名前")
            v-btn(color="blue darken-1" flat="" @click="clickCreateMap") 作成
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
const maps = namespace('maps')

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
  @Action('maps/createMap')
  createMap
  @Action('maps/init')
  init
  @maps.State('maps')
  maps

  bottomNav = 'mypage'
  mapName = ''
  valid = true

  created() {
    this.init({ userId: this.user.id })
  }

  clickLogout() {
    this.logout().then(() => this.$router.push('/'))
  }

  clickCreateMap() {
    if (this.mapName !== '') {
      this.createMap({ mapName: this.mapName, userId: this.user.id })
      this.mapName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.strength {
  padding: 10px;
}
.create {
  background-color: #e0e0e0;
  width: 100%;
  padding: 10px;
  margin-top: 30px;
}
</style>
