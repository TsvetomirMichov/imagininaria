# Imaginaria - Image Sharing Platform

<a href="https://ibb.co/q1THpkQ"><img src="https://i.ibb.co/PCq2gwH/screencapture-imaginaria-onrender-2023-09-10-18-12-05.png" alt="screencapture-imaginaria-onrender-2023-09-10-18-12-05" border="0"></a>

Imaginaria is an image sharing platform built with Vite, React, Material-UI 5, and Firebase. It provides users with the ability to register, log in, and upload images with descriptions. The platform also features a search component for filtering images by content text, user profiles with links to their social media platforms, and their own uploaded images.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

## Features

- User authentication and authorization.
- Upload and share images with descriptions.
- Search for images by content text.
- User profiles with links to social media platforms.
- Clean and intuitive Material-UI 5 design.
- Real-time updates with Firebase.

## Demo

Explore Imaginaria by visiting our live demo: [Demo Link](https://imaginaria.onrender.com/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following software and accounts set up:

- Node.js and npm (Node Package Manager)
- Firebase account

### Installation

1. Clone the repository:

````
git clone https://github.com/your-username/imaginaria.git
````
   
2. Install vite-project dependencies:

```
cd vite-project
npm install
```

3. Configure the firebase variables:
 ### Create a firebase.js file in the src/pages/lib and add the following code:

```
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_AUTH_DOMAIN_HERE",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "YOUR_APP_ID_HERE",
  measurementId: "YOUR_MEASUREMENT_ID_HERE"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app); //db
export const createNewUser = createUserWithEmailAndPassword;
export const loginUser = signInWithEmailAndPassword;
export const logoutUser = signOut;
export const createAppointment = addDoc;
export const storage=getStorage()
```

# Usage
* Create an account or log in to start placing food orders.
* Proceed to checkout, enter delivery details, and make a payment.
* Track your order in real-time.
* Admins have privileges to create, update and delete products

