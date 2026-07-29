// Firebase konfiguracja
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { 
    getFirestore 
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";



const firebaseConfig = {

    apiKey: "AIzaSyA-FBkPlELV5PgrBX6AY2ssxUWYPuNSGIM",

    authDomain: "kolonia-pasjonatow.firebaseapp.com",

    projectId: "kolonia-pasjonatow",

    storageBucket: "kolonia-pasjonatow.firebasestorage.app",

    messagingSenderId: "621113420703",

    appId: "1:621113420703:web:0589504467dbe2b6582baa"

};



const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
