<template>
  <div class="app">
    <main>
      <todo-list v-for="(list, index) in todoLists" :key="index"
                 :list="list" :list-id="list.id"/>

      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-btn slot="activator" color="primary" dark>リストの作成</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">リストの作成</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="newListTitle" label="リストの名前" required/>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="blue darken-1" flat @click.native="cancel">キャンセル</v-btn>
            <v-btn color="blue darken-1" flat @click.native="createList">作成</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar
        v-model="snackbar"
        :color="'success'"
        :multi-line="false"
        :timeout="1000"
        :vertical="false"
      >
        作成しました
      </v-snackbar>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import TodoList from '~/components/TodoList.vue'

@Component({
  components: {
    TodoList
  }
})
export default class extends Vue {
  dialog: boolean = false
  snackbar: boolean = false
  newListTitle: string = ''

  @State(state => state.todo.todoLists)
  todoLists
  @Action('todo/init')
  init
  @Action('todo/add_list')
  add_list

  created() {
    this.init()
  }

  createList(): void {
    this.add_list(this.newListTitle).then(() => (this.snackbar = true))
    this.newListTitle = ''
    this.dialog = false
  }

  cancel(): void {
    this.newListTitle = ''
    this.dialog = false
  }
}
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
  main {
    padding: 20px;
    display: flex;
    overflow-x: scroll;
    height: 100%;
  }
}
</style>
