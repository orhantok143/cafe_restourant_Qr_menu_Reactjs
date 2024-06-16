import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA08TZwvrJ3Xis5QY7PnLAyGGf2hVsiTJg",
    authDomain: "cafe-cd33f.firebaseapp.com",
    projectId: "cafe-cd33f",
    storageBucket: "cafe-cd33f.appspot.com",
    messagingSenderId: "145600293001",
    appId: "1:145600293001:web:fccd4275cf323f5a90fe58",
    measurementId: "G-KM3JE7DBQ4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };