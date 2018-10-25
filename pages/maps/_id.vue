<template lang="pug">
  div
    .headline.text-xs-center.pa-5
      | {{ mapDetail.name }}
    v-data-table(:headers="strHeaders" :items="mapDetail.users" hide-actions class="elevation-1 mb-5")
      template(slot="items" slot-scope="props")
        td(:style="{ width: '20%', padding: '5px 0' }")
          v-avatar(:tile="false", :size="26", color="grey lighten-4")
            img(:src="props.item.icon_url")
        td(:style="{ width: '16%', backgroundColor: colorIndex[props.item.strength1] }") {{ props.item.strength1 }}
        td(:style="{ width: '16%',  backgroundColor: colorIndex[props.item.strength2] }") {{ props.item.strength2 }}
        td(:style="{ width: '16%',  backgroundColor: colorIndex[props.item.strength3] }") {{ props.item.strength3 }}
        td(:style="{ width: '16%',  backgroundColor: colorIndex[props.item.strength4] }") {{ props.item.strength4 }}
        td(:style="{ width: '16%',  backgroundColor: colorIndex[props.item.strength5] }") {{ props.item.strength5 }}
    div
      nuxt-link(to="/maps") 戻る
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'

const maps = namespace('maps')

@Component({})
export default class extends Vue {
  @Action('maps/initMapDetail')
  initMapDetail
  @maps.State('mapDetail')
  mapDetail
  @Getter('strength/colorIndex')
  colorIndex

  created() {
    this.initMapDetail({ mapId: this.$route.params.id })
  }
}
</script>
