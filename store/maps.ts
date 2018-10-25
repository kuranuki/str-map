import { firebaseAction } from 'vuexfire'
import firebase from 'firebase'
import firebaseApp from '~/plugins/firebase-app'

const mapsRef = firebaseApp.firestore().collection('maps')

export const state = () => ({
  maps: [],
  mapDetail: []
})

export const mutations = {}

export const actions = {
  init: firebaseAction(({ state, bindFirebaseRef }, { userId }) => {
    if (state.maps.length > 0) {
      return
    }
    bindFirebaseRef('maps', mapsRef.where('user_ids', 'array-contains', userId))
      .then(() => console.log('success binded mapsRef'))
      .catch(err => console.log(err))
  }),
  createMap: firebaseAction(({ state }, { mapName, userId, users }) => {
    mapsRef.add({ name: mapName, user_ids: [userId], users: users })
  }),
  initMapDetail: firebaseAction(({ bindFirebaseRef }, { mapId }) => {
    bindFirebaseRef('mapDetail', mapsRef.doc(mapId))
      .then(() => console.log('success binded mapsRef'))
      .catch(err => console.log(err))
  })
}

export const getters = {}
