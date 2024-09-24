import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA67s0_1pbtnFE2Arr2QaMIktf0THmMBGY",
  authDomain: "push-notification-for-we-26abb.firebaseapp.com",
  projectId: "push-notification-for-we-26abb",
  storageBucket: "push-notification-for-we-26abb.appspot.com",
  messagingSenderId: "119322977801",
  appId: "1:119322977801:web:ec66fb85064924a52f3ad8",
  measurementId: "G-BK2H3P0HPD",
};



const apiUrl = process.env.REACT_APP_API_URL;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


const saveTokenToServer = async(token) => {
 
  const aaa= await { user_id: localStorage.getItem("user_id"),token:token };
 
     
  
  const responce=await fetch(`${apiUrl}/update_and_save_notification_for_web/`,{
    method:"POST",
    headers:{     
        "Content-Type":"application/json",
       }, 
       body:JSON.stringify(aaa) 
   })  
const result=await responce.json();

if(result.success===true){  
 
 return result;
}else{  
    console.log('error')
}  
    
  
};
export const requestPermission = () => {

  


  console.log("Requesting User permission.........");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("notification user permission Granted.........");

      return getToken(messaging, { 
        vapidKey:
          "BKx3jub1v0latbywC6SDuU6FEjBFNhvlc6f8ivdtw9EHiXB5dIVqbvhmTBgwRbiOPN1zxeAB_68c8TR5dS73NsY",
      })
        .then((currentToken) => {
          if (currentToken) {
            saveTokenToServer(currentToken)
            console.log("Client Token : ", currentToken);
          } else {
            console.log("Failed to generate the app re...");
          }
        })
        .catch((err) => {
          console.log(
            "An Error occurred when requesting  to recive the token.",
            err
          );
        });
    } else {
      console.log("user permission denied.");
    }
  });
};

requestPermission();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
