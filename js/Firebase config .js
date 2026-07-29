/* =========================================================
   FIREBASE CONFIG — Youth Club Chauhag
   Loaded as a module on every page BEFORE forms.js.
   Uses Firebase v10 modular SDK via CDN (matches the config
   the client already generated in the Firebase console).
========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase, ref, push, set, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAN9ddW4dDQzP6G0xflgkN63UvlJ4NHbA",
  authDomain: "youthclubchauhag.firebaseapp.com",
  databaseURL: "https://youthclubchauhag-default-rtdb.firebaseio.com", // Realtime Database URL — confirm in Firebase Console > Realtime Database
  projectId: "youthclubchauhag",
  storageBucket: "youthclubchauhag.firebasestorage.app",
  messagingSenderId: "476525465768",
  appId: "1:476525465768:web:0bc0db241e3aad44eb329d",
  measurementId: "G-H7TQQMSNXB"
};

// Initialize Firebase (once per page)
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/**
 * Write a form submission to a given Realtime Database node.
 * @param {string} nodePath - e.g. "volunteers", "helpRequests", "contactMessages"
 * @param {object} data - plain object of form fields
 * @returns {Promise<string>} the generated push key
 */
export async function submitToFirebase(nodePath, data) {
  const listRef = ref(db, nodePath);
  const newRef = push(listRef);
  await set(newRef, {
    ...data,
    createdAt: serverTimestamp()
  });
  return newRef.key;
}

export { db };
