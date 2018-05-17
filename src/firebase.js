import * as firebase from 'firebase'
export const init = () => {
    let config = {
        // Initialize Firebase
        apiKey: "AIzaSyA8vFUeTfP21SnjPSTbXibVw1RO0eKrQfU",
        authDomain: "babmutna-536bf.firebaseapp.com",
        databaseURL: "https://babmutna-536bf.firebaseio.com",
        projectId: "babmutna-536bf",
        storageBucket: "babmutna-536bf.appspot.com",
        messagingSenderId: "984927166927"
    };
    firebase.initializeApp(config);
};