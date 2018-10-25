import { firebaseAction } from 'vuexfire'
import firebase from 'firebase'
import firebaseApp from '~/plugins/firebase-app'

const firebaseAuth = firebaseApp.auth()
const SET_USER = 'SET_USER'
const usersRef = firebaseApp.firestore().collection('users')

export const state = () => ({
  user: null
})

export const mutations = {
  [SET_USER](state, { user }) {
    state.user = user
  }
}

export const actions = {
  login({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebaseAuth.signInWithRedirect(provider)
  },
  logout: firebaseAction(({ commit, unbindFirebaseRef }) => {
    return new Promise((resolve, reject) => {
      firebaseAuth.signOut().then(() => {
        unbindFirebaseRef('user')
        commit(SET_USER, { user: null })
        resolve()
      })
    })
  }),
  onAuthStateChanged: firebaseAction(async ({ bindFirebaseRef }) => {
    return new Promise((resolve, reject) => {
      firebaseAuth.onAuthStateChanged(async authenticatedUser => {
        if (authenticatedUser) {
          await new Promise((resolve, reject) => {
            usersRef
              .doc(authenticatedUser.uid)
              .get()
              .then(doc => {
                if (!doc.exists) {
                  doc.ref
                    .set({
                      name: authenticatedUser.displayName,
                      email: authenticatedUser.email,
                      icon_url: authenticatedUser.photoURL
                    })
                    .then(() => resolve())
                } else {
                  resolve()
                }
              })
          })

          bindFirebaseRef('user', usersRef.doc(authenticatedUser.uid), {
            wait: true
          })
            .then(() => console.log('success binded'))
            .catch(err => console.log(err))

          resolve()
        } else {
          reject()
        }
      })
    })
  })
}

export const getters = {
  isLogined(state): boolean {
    return !!state.user
  }
}
