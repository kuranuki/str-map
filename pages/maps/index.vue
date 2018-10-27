<template lang="pug">
  div
    str-entry-dialog(:dialog="!this.isEntered")
    .headline.text-xs-center.pa-1
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

    main-bottom-nav(bottomNav="maps")
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
  @user.State('user')
  user
  @user.Getter('isEntered')
  isEntered
  @Action('maps/createMap')
  createMap
  @Action('maps/init')
  init
  @maps.State('maps')
  maps

  mapName = ''
  valid = true

  created() {
    this.init({ userId: this.user.id })
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
.create {
  background-color: #e0e0e0;
  width: 100%;
  padding: 10px;
  margin-top: 30px;
}
</style>
