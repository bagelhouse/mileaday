import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { firebaseAuthConfig } from './firebaseAuth.config'

firebase.initializeApp(firebaseAuthConfig)