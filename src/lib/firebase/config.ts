
// src/lib/firebase/config.ts
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage'; // Added

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage; // Added

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

auth = getAuth(app);
db = getFirestore(app);
storage = getStorage(app); // Added

export { app, auth, db, storage }; // Export storage

/*
Example Firestore Security Rules (save as firestore.rules in your project root and deploy via Firebase CLI):

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own document
    match /users/{userId} {
      allow read: if request.auth != null; // Allow any authenticated user to read user profiles (e.g., for avatars)
      allow update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null; // Allow any authenticated user to create their profile
    }
    // Other rules for your collections
  }
}

Example Firebase Storage Security Rules (save as storage.rules in your project root and deploy via Firebase CLI):
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{userId}/{fileName} {
      allow read; // Allow public read access to avatars
      allow write: if request.auth != null && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024 // Max 5MB
                   && request.resource.contentType.matches('image/.*'); // Only images
    }
  }
}

For development, you might use more open rules, but secure them for production:
Firestore:
match /{document=**} {
  allow read, write: if request.auth != null;
}
Storage:
match /{allPaths=**} {
  allow read, write: if request.auth != null;
}
*/

