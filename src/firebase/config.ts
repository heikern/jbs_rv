import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyASqOTqhfYelepBt6xPeh2dYBjwLXOGo8w",
  authDomain: "jbs-rv.firebaseapp.com",
  projectId: "jbs-rv",
  storageBucket: "jbs-rv.firebasestorage.app",
  messagingSenderId: "536560238325",
  appId: "1:536560238325:web:eaedc09ce6986e3d878fbc",
  measurementId: "G-14S0TXSZX5"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export { firebaseApp, analytics };
