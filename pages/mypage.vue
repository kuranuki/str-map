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
        | つよみマップ一覧
        v-list(two-line='')
          template(v-for='(item, index) in maps')
            v-list-tile(:key='item.id' avatar='' ripple='' @click='goMap(item.id)')
              v-list-tile-content
                v-list-tile-title {{ item.name }}
                v-list-tile-sub-title.text--primary
                  span(v-for="(user, user_index) in item.users" :key="user_index")
                    v-avatar(:tile="false", :size="24", color="grey lighten-4")
                      img(:src="user.icon_url")
            v-divider(v-if='index + 1 < maps.length' :key='index')
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

  goMap(mapId) {
    this.$router.push('/maps/' + mapId)
  }

  clickCreateMap() {
    if (this.mapName !== '') {
      this.createMap({
        mapName: this.mapName,
        userId: this.user.id,
        users: [this.user]
      })
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
