// Initialize Firebase
import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyCIqW2EEmyPn5QdyzLysaZ1jsXCKj7zAuk',
  authDomain: 'infinitepower-f3ff3.firebaseapp.com',
  databaseURL: 'https://infinitepower-f3ff3.firebaseio.com',
  projectId: 'infinitepower-f3ff3',
  storageBucket: 'infinitepower-f3ff3.appspot.com',
  messagingSenderId: '391847262477'
}

let app = firebase.initializeApp(config)
let db = app.database()
let nodesRef = db.ref('nodes')

export default nodesRef
