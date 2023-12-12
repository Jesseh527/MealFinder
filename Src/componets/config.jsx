// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase,ref as refD, onValue,set,get,update,serverTimestamp} from "firebase/database";
import {getAuth} from "firebase/auth";
import { getDownloadURL, getStorage, ref as refS, uploadBytesResumable,listAll } from "firebase/storage";
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

export const getUserFromID = async (userID) =>{// returns username from userID, may change to just return the userprofile later
  const userRef = refD(db, `users/${userID}`);
  try {
    // Reference to the user's profile in the Realtime Database
    const userRef = refD(db, `users/${userID}`); // Using the refD function for database reference

    // Fetch the user profile data
    const snapshot = await get(userRef); // Using the get function to fetch the data
    const userProfile = snapshot.val();
    return userProfile;
    
  } catch (error) {
    console.error('Error geting Username:', error.message);
    throw error;
  }
}
export const listFiles= async () => {
  const storage = getStorage();

// Create a reference under which you want to list
const listRef = refS(storage, 'images');
const listResp = await listAll(listRef)
 return listResp.items
}
export const generateUniqueId =  () => {
  try{

  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 10000); // Adjust the range as needed
  

  return `${timestamp}-${randomNumber}`;
  }catch(error){console.error('Error generating numbers', error.message);
  throw error;}
};
export const getUserProfile = async (userId) => {
  try {
    // Reference to the user's profile in the Realtime Database
    const userRef = refD(db, `users/${userId}`); // Using the refD function for database reference

    // Fetch the user profile data
    const snapshot = await get(userRef); // Using the get function to fetch the data
    const userProfile = snapshot.val();

    return userProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    throw error;
  }
};
export const getRecipInfo = async () => {
  try {
    // Reference to the user's profile in the Realtime Database
    const postRef = refD(db, `recipe/`); // Using the refD function for database reference

    // Fetch the user profile data
    const snapshot = await get(postRef); // Using the get  function to fetch the data
    const postProfile = snapshot.val();

    return postProfile;
  } catch (error) {
    console.error('Error fetching recipe profile:', error.message);
    throw error;
  }
};
export function createNewPost(title,cooktime,preptime,description,directions,ingredients,userID,newPostID,caloriePerServing,servingSize,totalServings){
  
  const db = getDatabase();
  console.log("TIme:");
  console.log({ '.sv': 'timestamp' })
  console.log(serverTimestamp)
  set(refD(db, 'recipe/' + newPostID), {  
    postID: newPostID,
    title:title,
    author:userID,
    cooktime:cooktime,
    preptime:preptime,
    description:description,
    directions:directions,  
    ingredients:ingredients,
    image:newPostID + ".jpg",
    averageRating:0,
    ratings:[],
    caloriePerServing:caloriePerServing,
    servingSize:servingSize,
    totalServings:totalServings,
    timestamp: { '.sv': 'timestamp' },
    
  });
  
}
export function createUserInRTDB(userId, name, email) {//creats user in database
  const db = getDatabase();
  set(refD(db, 'users/' + userId), {
    username: name,
    userID:userId,
    email: email,
    folowing: [],
    profile:{
      bio:"hello my name is " + name,
      favorite_ingredients:[],
      alergies:[],
      hatted_favorite:[],  
    }
    
  });
  const tempImage =  require("../../assets/tempProfileImage.jpg");
  // const newUserUri = tempImage.assets
  // uploadToFirebase(tempImage, "userImage/"+ userId+".jpg",(v)=> console.log(v));
}
/**
 * 
 * @param {*} uri 
 * @param {*} name 
 */
export const uploadToFirebase = async (uri,name,onProgress) => { ///npm install whatwg-fetch@3.6.2 if there is a range error [200,599]
  const fetchResponse=  await fetch(uri);
  const theBlob = await fetchResponse.blob();

const imageRef = refS( getStorage(),  name);


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


export const updateUserRating = async (userId, postId, rating) => {
  const postRef = refD(db, `recipe/${postId}/ratings/${userId}`);

  try {
    // Update the user's rating for the specific post
    await set(postRef, rating);
  } catch (error) {
    console.error('Error updating user rating:', error.message);
    throw error;
  }
};

export const updatePostRating = async (postId) => {
  const postRef = refD(db, `recipe/${postId}`);

  try {
    const postSnapshot = await get(postRef);
    const post = postSnapshot.val();

    if (!post) {
      console.error('Post not found');
      return;
    }

    const ratings = Object.values(post.ratings || {});
    const averageRating =
      ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;

    // Update only the averageRating property
    await update(postRef, { averageRating });
  } catch (error) {
    console.error('Error updating post rating:', error.message);
    throw error;
  }
};


export const getUserPosts = async (userId) => {
  try {
    // Reference to the recipes in the Realtime Database
    const postRef = refD(db, `recipe/`);

    // Fetch all posts
    const snapshot = await get(postRef);
    const allPosts = snapshot.val();

    // Filter post IDs based on the author's ID
    const userPostIds = Object.keys(allPosts || []).filter(postId => {
      const post = allPosts[postId];
      return post && post.author === userId; 
    });

    return userPostIds;
  } catch (error) {
    console.error('Error fetching user posts:', error.message);
    throw error;
  }
};
export const getRecipInfoFromPostId = async (id) => {
  try {
    // Reference to the user's profile in the Realtime Database
    const postRef = refD(db, `recipe/`+id); // Using the refD function for database reference

    // Fetch the user profile data
    const snapshot = await get(postRef); // Using the get  function to fetch the data
    const postProfile = snapshot.val();
    console.log('TTTTTTTTTTTTTTTTT');
    console.log(postProfile);
    return postProfile;
  } catch (error) {
    console.error('Error fetching recipe profile:', error.message);
    throw error;
  }
};