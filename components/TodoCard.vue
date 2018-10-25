<template>
  <div class="cards" draggable="true"
       @drop="onDrop" @dragstart="onDragStart" @dragover.prevent>
    <v-card class="card">
      <v-card-title primary-title>
        <v-layout align-center justify-end row fill-height>
          <v-btn flat icon depressed @click="deleteCard">
            <v-icon small color="grey">delete</v-icon>
          </v-btn>
        </v-layout>
      </v-card-title>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

@Component({})
export default class TodoCard extends Vue {
  @Prop()
  private card!: {}
  @Prop()
  private cardIndex!: number
  @Prop()
  private parentListId

  @Action('todo/remove_card_from_list')
  remove_card_from_list
  @Action('todo/move_card_to_list')
  move_card_to_list

  deleteCard(): void {
    this.remove_card_from_list({
      listId: this.parentListId,
      cardIndex: this.cardIndex
    })
  }
  onDragStart({ dataTransfer }): void {
    dataTransfer.effectAllowed = 'move'
    dataTransfer.setData(
      'application/json',
      JSON.stringify({
        from: {
          listId: this.parentListId,
          cardIndex: this.cardIndex
        }
      })
    )
  }
  onDrop({ dataTransfer }): void {
    this.move_card_to_list({
      from: JSON.parse(dataTransfer.getData('application/json')).from,
      to: {
        listId: this.parentListId,
        cardIndex: this.cardIndex
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.cards {
  .card {
    margin-bottom: 10px;
  }
}
</style>
