import { firebaseMutations, firebaseAction } from 'vuexfire'
// import firestore from '~/plugins/firestore'

// const todoListsRef = firestore.collection('trello-lists')

export const mutations = {
  ...firebaseMutations
}

export const state = () => ({
  // todoLists: []
})

export const actions = {
  init: firebaseAction(({ bindFirebaseRef }) => {
    // bindFirebaseRef('todoLists', todoListsRef.orderBy('timestamp', 'desc'))
    //   .then(() => console.log('success binded'))
    //   .catch(err => console.log(err))
  })
}
