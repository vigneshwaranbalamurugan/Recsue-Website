const firebaseConfig = {
    apiKey: "AIzaSyDhk_8bhmMUo2pclKIksTpbVgftyB_IFRY",
    authDomain: "register1-45164.firebaseapp.com",
    databaseURL: "https://register1-45164-default-rtdb.firebaseio.com",
    projectId: "register1-45164",
    storageBucket: "register1-45164.appspot.com",
    messagingSenderId: "614555310804",
    appId: "1:614555310804:web:47e87fd212f77b6b0db941"
  };
  firebase.initializeApp(firebaseConfig);

    const auth = firebase.auth();
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const email = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Logged in successfully!');
          alert("Login Successfully");
          // Access the database using the authentication token
        })
        .catch((error) => {
          alert(error.message);
          console.error('Login failed:', error);
        });
    });  
