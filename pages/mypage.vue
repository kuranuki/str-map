<template lang="pug">
  div
    .headline.text-xs-center.pa-5
      | Active: {{ bottomNav }}
      v-btn(@click="clickLogout") ログアウト
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'

const strength = namespace('user')

@Component({})
export default class extends Vue {}
</script>
