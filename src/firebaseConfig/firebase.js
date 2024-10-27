
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "@firebase/database"

function StartFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyD-OE8DL84_KClIcqwIT3jGC9Lpq1Uw2dA",
        authDomain: "mapping-history-7242b.firebaseapp.com",
        projectId: "mapping-history-7242b",
        storageBucket: "mapping-history-7242b.appspot.com",
        messagingSenderId: "983809187415",
        appId: "1:983809187415:web:405ee1489336c5eb918d12",
        measurementId: "G-2ZSVNR15TS"
      };
      const app = initializeApp(firebaseConfig);
      //const analytics = getAnalytics(app);
      return getDatabase(app)

}

export default StartFirebase
