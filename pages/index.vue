<template lang="pug">
  v-layout(column="" justify-center="" align-center="")
    v-flex(xs12="" sm8="" md6="")
      .text-xs-center つよみマップ
      div(v-if="isLogined")
        nuxt-link(to="/mypage") マイページへ
      div(v-else)
        v-btn(@click="clickLogin") ログイン
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import router from 'vue-router'

@Component({})
export default class extends Vue {
  @Action('user/login')
  login
  @Getter('user/isLogined')
  isLogined

  clickLogin() {
    this.$router.push('/login')
    this.login()
  }
}
</script>
