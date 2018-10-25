<template lang="pug">
  v-dialog(v-model="showDialog" fullscreen="" hide-overlay="" transition="dialog-bottom-transition")
    v-card
      v-form(ref="form" v-model="valid" lazy-validation)
        v-toolbar(dark="" color="primary")
          v-toolbar-title ステータス登録
          v-spacer
          v-toolbar-items
            v-btn(dark="" flat="" @click.native="save" :disabled="!valid") Save
        v-list(three-line="" subheader="")
          v-list-tile(avatar="")
            v-list-tile-content
              v-list-tile-title つよみ１位
              v-flex(xs12="" sm6="" d-flex="")
                v-select(v-model="str1" :items="strFlatValues" label="Outline style" outline="" :rules="[v => !!v || 'Item is required']")
          v-list-tile(avatar="")
            v-list-tile-content
              v-list-tile-title つよみ２位
              v-flex(xs12="" sm6="" d-flex="")
                v-select(v-model="str2" :items="strFlatValues" label="Outline style" outline="" :rules="[v => !!v || 'Item is required']")
          v-list-tile(avatar="")
            v-list-tile-content
              v-list-tile-title つよみ３位
              v-flex(xs12="" sm6="" d-flex="")
                v-select(v-model="str3" :items="strFlatValues" label="Outline style" outline="" :rules="[v => !!v || 'Item is required']")
          v-list-tile(avatar="")
            v-list-tile-content
              v-list-tile-title つよみ４位
              v-flex(xs12="" sm6="" d-flex="")
                v-select(v-model="str4" :items="strFlatValues" label="Outline style" outline="" :rules="[v => !!v || 'Item is required']")
          v-list-tile(avatar="")
            v-list-tile-content
              v-list-tile-title つよみ５位
              v-flex(xs12="" sm6="" d-flex="")
                v-select(v-model="str5" :items="strFlatValues" label="Outline style" outline="" :rules="[v => !!v || 'Item is required']")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component({})
export default class StrEntryDialog extends Vue {
  @Prop()
  private dialog
  @Getter('strength/strFlatValues')
  strFlatValues
  @Action('user/setStrength')
  setStrength

  showDialog = true
  valid = true

  str1 = ''
  str2 = ''
  str3 = ''
  str4 = ''
  str5 = ''

  created() {
    this.showDialog = this.dialog
  }
  save() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.setStrength({
        str1: this.str1,
        str2: this.str2,
        str3: this.str3,
        str4: this.str4,
        str5: this.str5
      })
      this.showDialog = false
    }
  }
}
</script>
