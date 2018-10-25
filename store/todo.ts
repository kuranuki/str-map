import { firebaseAction } from 'vuexfire'
import firestore from '~/plugins/firestore'

const todoListsRef = firestore.collection('trello-lists')

const moveAt = (array, index, at) => {
  if (index === at || index > array.length - 1 || at > array.length - 1) {
    return array
  }
  const value = array[index]
  const tail = array.slice(index + 1)

  array.splice(index)
  array.push(...tail)
  array.splice(at, 0, value)
  return array
}

export const state = () => ({
  todoLists: []
})

export const mutations = {}

export const actions = {
  init: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('todoLists', todoListsRef.orderBy('timestamp'))
      .then(() => console.log('success binded'))
      .catch(err => console.log(err))
  }),
  add_list: firebaseAction((context, title) => {
    return new Promise((resolve, reject) => {
      todoListsRef
        .add({
          title,
          cards: [],
          timestamp: Date.now()
        })
        .then(docRef => {
          resolve(docRef.id)
        })
    })
  }),
  remove_list: firebaseAction((context, listId) => {
    todoListsRef.doc(listId).delete()
  }),
  add_card_to_list: firebaseAction((context, { listId, body }) => {
    todoListsRef.doc(listId).update({
      cards: cards(context, listId).concat({ body })
    })
  }),
  remove_card_from_list: firebaseAction((context, { listId, cardIndex }) => {
    todoListsRef.doc(listId).update({
      cards: cards(context, listId).filter((_, index) => index !== cardIndex)
    })
  }),
  move_card_to_list: firebaseAction((context, { from, to }) => {
    const fromListRef = todoListsRef.doc(from.listId)
    const toListRef = todoListsRef.doc(to.listId)

    firestore
      .runTransaction(async transaction => {
        const [fromList, toList] = [
          await transaction.get(fromListRef),
          await transaction.get(toListRef)
        ]
        const targetCard = fromList.data()!.cards[from.cardIndex]
        let toCards = toList.data()!.cards.concat()

        if (from.listId === to.listId) {
          if (to.cardIndex !== null) {
            toCards = moveAt(toCards, from.cardIndex, to.cardIndex)
          } else {
            toCards = toCards.filter((_, index) => index !== from.cardIndex)
            toCards.push(targetCard)
          }
        } else {
          await transaction.update(fromListRef, {
            cards: fromList
              .data()!
              .cards.filter((_, index) => index !== from.cardIndex)
          })
          if (to.cardIndex !== null) {
            toCards.splice(to.cardIndex, 0, targetCard)
          } else {
            toCards.push(targetCard)
          }
        }
        await transaction.update(toListRef, {
          cards: toCards
        })
        return transaction
      })
      .then(() => console.log('move_card_to_list - success'))
      .catch(error => console.error('move_card_to_list - failed', error))
  })
}

const cards = (context, listId) => {
  return context.state.todoLists.find(list => list.id === listId).cards
}

export const getters = {}
