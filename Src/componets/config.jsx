// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytesResumable,listAll } from "firebase/storage";
import { async } from "@firebase/util";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARBznYzRkVLq-NnJ7J65F0pWEklzY1GP8",
  authDomain: "mealfinderjessehernandez.firebaseapp.com",
  projectId: "mealfinderjessehernandez",
  storageBucket: "mealfinderjessehernandez.appspot.com",
  messagingSenderId: "626321293981",
  appId: "1:626321293981:web:1159fa6a195e766b898a74",
  measurementId: "G-7592LKHTKY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage();

//Initialize  database
export const db = getDatabase(app);
export const FIREBASE_AUTH = getAuth(app);

export const listFiles= async () => {
  const storage = getStorage();

// Create a reference under which you want to list
const listRef = ref(storage, 'images');
const listResp = await listAll(listRef)
 return listResp.items
}


/**
 * 
 * @param {*} uri 
 * @param {*} name 
 */
export const uploadToFirebase = async (uri,name,onProgress) => { ///npm install whatwg-fetch@3.6.2 if there is a range error [200,599]
  const fetchResponse=  await fetch(uri);
  const theBlob = await fetchResponse.blob();
  // console.log(theBlob);

const imageRef = ref( getStorage(), 'images/' +  name);


const uploadTask = uploadBytesResumable(imageRef, theBlob);

return  new Promise((resolve,reject)  => {

uploadTask.on(
  'state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    onProgress && onProgress(progress)
    
  }, 
  (error) => {
    reject(error)
  }, 
  async () => {
    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
    resolve({
      downloadUrl,
      metadata : uploadTask.snapshot.metadata,
    })
  }
)
})

}
