<template lang="pug">
    v-layout(column="" justify-center="" align-center="")
      v-flex(xs12="" sm8="" md6="")
        .text-xs-center
          v-progress-circular.loading-page__progress-circular(indeterminate :size='100' :width='7' color='#6BAE42')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

@Component({})
export default class extends Vue {
  // @Action('user/onAuthStateChanged')
  // onAuthStateChanged
  // created() {
  //   this.onAuthStateChanged().then(() => {
  //     this.$router.push('/inspire')
  //   })
  // }
}
</script>
