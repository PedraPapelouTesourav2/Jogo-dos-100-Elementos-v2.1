// Configuração do Firebase para uso com <script> em HTML
const firebaseConfig = {
  apiKey: "AIzaSyAFAic-7Kowhp1eie2CTM2RJbx-g6LqcEo",
  authDomain: "jogo-fixe-74138.firebaseapp.com",
  databaseURL: "https://jogo-fixe-74138-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jogo-fixe-74138",
  storageBucket: "jogo-fixe-74138.firebasestorage.app",
  messagingSenderId: "411202933463",
  appId: "1:411202933463:web:6aa2a1707c57cc3e45d692",
  measurementId: "G-B5FN9EBBQM"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
