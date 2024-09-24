import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyA67s0_1pbtnFE2Arr2QaMIktf0THmMBGY",
  authDomain: "push-notification-for-we-26abb.firebaseapp.com",
  projectId: "push-notification-for-we-26abb",
  storageBucket: "push-notification-for-we-26abb.appspot.com",
  messagingSenderId: "119322977801",
  appId: "1:119322977801:web:ec66fb85064924a52f3ad8",
  measurementId: "G-BK2H3P0HPD",
};



function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);

      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BKx3jub1v0latbywC6SDuU6FEjBFNhvlc6f8ivdtw9EHiXB5dIVqbvhmTBgwRbiOPN1zxeAB_68c8TR5dS73NsY",
      }).then((currentToken) => {
        if (currentToken) {
          // console.log("currentTokenss: ", currentToken);
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

// requestPermission();
