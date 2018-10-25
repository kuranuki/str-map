<template>
  <div class="list">
    <v-btn class="close-button" flat icon depressed small @click="remove_list(listId)">
      <v-icon small>delete</v-icon>
    </v-btn>
    <div class="cards">
      <todo-card v-for="(card, index) in list.cards" :key="index"
                 :card="card" :card-index="index" :parent-list-id="listId"/>
      <div @drop="onDrop" @dragover.prevent>
        <v-card>
          <form @submit.prevent="addCardToList">
            <v-text-field v-model="body" placeholder="Add new card"/>
          </form>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import TodoCard from './TodoCard.vue'

@Component({
  components: {
    TodoCard
  }
})
export default class TodoList extends Vue {
  body: string = ''

  @Prop()
  private list!: {}
  @Prop()
  private listId

  @Action('todo/add_card_to_list')
  add_card_to_list
  @Action('todo/remove_list')
  remove_list
  @Action('todo/move_card_to_list')
  move_card_to_list

  addCardToList(): void {
    this.add_card_to_list({
      listId: this.listId,
      body: this.body
    })
    this.body = ''
  }
  onDrop({ dataTransfer }): void {
    this.move_card_to_list({
      from: JSON.parse(dataTransfer.getData('application/json')).from,
      to: {
        listId: this.listId,
        cardIndex: null
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.list {
  margin: 0 10px auto 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 290px;
  width: 290px;
  background-color: #e0e0e0;
  border-radius: 8px;
  padding: 15px;

  .close-button {
    position: absolute;
    top: 6px;
    right: 14px;
    cursor: pointer;
  }

  .title {
    font-size: 22px;
    font-weight: bold;
    word-break: break-word;
  }
  .cards {
    margin-top: 15px;
    width: 100%;

    form {
      padding: 0 20px;
    }
  }
}
</style>
