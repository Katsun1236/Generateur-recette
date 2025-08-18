<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBZMnlHt0TzR33sRVaGJ9HZLLZVzEGnu-k",
    authDomain: "ratio-faction.firebaseapp.com",
    projectId: "ratio-faction",
    storageBucket: "ratio-faction.firebasestorage.app",
    messagingSenderId: "402552344518",
    appId: "1:402552344518:web:cad898ebb7f701770cecc7",
    measurementId: "G-20WL3ZM0XJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>