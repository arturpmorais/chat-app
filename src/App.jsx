import React from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAgDGla5GO-_7mYODbnZvEV0Ldsu7EwCJ0",
  authDomain: "react-chat-app-bff3d.firebaseapp.com",
  projectId: "react-chat-app-bff3d",
  storageBucket: "react-chat-app-bff3d.appspot.com",
  messagingSenderId: "80686586666",
  appId: "1:80686586666:web:6f2be4809a5b13d1ed1c53",
  measurementId: "G-LT1HG1S2LC"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

const App = () => {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn/> }
      </section>
    </div>
  );
}

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
} 

const SignOut = () => {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>
      Sign Out
    </button>
  )
}

const ChatRoom = () => {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  return (
    <>
      <div>
        {
          messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)
        }
      </div>
    </>
  );
}

const ChatMessage = (props) => {
  const { text, uid } = props.message;
  
  return (
    <p>
      {`${text} (${uid})`}
    </p>
  )
}

export default App;
