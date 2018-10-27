<template lang="pug">
  v-bottom-nav(:active="bottomNav" :value="true" color="white" fixed="")
    template(v-for='(item, index) in menus')
      v-btn(color="teal" flat :value="item.value" @click="$router.push('/' + item.value)")
        span {{ item.name }}
        v-icon {{ item.icon }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class MainBottomNav extends Vue {
  @Prop()
  private bottomNav

  get menus() {
    return [
      { value: 'mypage', name: 'マイページ', icon: 'face' },
      { value: 'maps', name: 'つよみマップ', icon: 'assessment' },
      { value: 'settings', name: '設定', icon: 'settings' }
    ]
  }
}
</script>
