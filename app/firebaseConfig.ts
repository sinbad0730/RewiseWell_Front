import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDINwgLG2WeUtArHLcfAz9tF43qSMGNf-A",
    authDomain: "revisewell-116dc.firebaseapp.com",
    projectId: "revisewell-116dc",
    storageBucket: "revisewell-116dc.firebasestorage.app",
    messagingSenderId: "1086214138234",
    appId: "1:1086214138234:web:907f3d4b61a0598a4d0ec3",
    measurementId: "G-F14LTCRM2S",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
