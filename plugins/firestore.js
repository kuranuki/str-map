import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAmlrZlWrXHR3vtHWDYQPIBS6rzFFhkSuM',
    authDomain: 'tsuyomi-map.firebaseapp.com',
    databaseURL: 'https://tsuyomi-map.firebaseio.com',
    projectId: 'tsuyomi-map',
    storageBucket: 'tsuyomi-map.appspot.com',
    messagingSenderId: '732980104001'
  })
}
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })
export default firestore
