import firebase from 'firebase'
import firebaseApp from '~/plugins/firebase-app'

const firebaseAuth = firebaseApp.auth()
const SET_USER = 'SET_USER'

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
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      firebaseAuth.signOut().then(() => {
        commit(SET_USER, { user: null })
        resolve()
      })
    })
  },
  onAuthStateChanged({ commit }) {
    return new Promise((resolve, reject) => {
      firebaseAuth.onAuthStateChanged(authenticatedUser => {
        if (authenticatedUser) {
          commit(SET_USER, { user: authenticatedUser.displayName })
          resolve()
        } else {
          reject()
        }
      })
    })
  }
}

export const getters = {
  isLogined(state): boolean {
    return !!state.user
  }
}
