
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfsKKxU3NUpoYULSsW7XbsPqCOBlvCGcg",
  authDomain: "binging-auth.firebaseapp.com",
  databaseURL: "https://binging-auth-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "binging-auth",
  storageBucket: "binging-auth.appspot.com",
  messagingSenderId: "39890550451",
  appId: "1:39890550451:web:9d412143c55d629bfe7ac6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const auth = getAuth(app);

var loginState = 0;
const loginBtn = document.getElementById('login-btn')
const credential = document.getElementById('credentialForm')
const formClose = document.querySelector('#form-close');
const dropdownContent = document.getElementById('myDropdown');
const dropdownDiv=document.getElementById('myDropdown12')
const container=document.querySelector(".login-form-container")
const icons=document.getElementById('impIcons')

const user = auth.currentUser

document.getElementById('signupcontainer').addEventListener('click', (e) => {
  let formName = document.getElementById('formName')
  formName.innerHTML = "sign up"


  credential.innerHTML = `
  <h3 id="formName">Sign up</h3>
            <input type="email" id="email" class="box" placeholder="enter your email">
            <input type="password" id="password" class="box" placeholder="enter your password">
            <input type="button" id="signup" value="sign up " class="btn">
            <input type="checkbox" id="remember">
            <label for="remember">remember me</label>
  `
  formClose.addEventListener('click', () => {
    loginForm.classList.remove('active');
    location.reload()
  });


  dropdownDiv.style.visibility = 'none';
  loginBtn.style.visibility = 'visible';




// for signup of new user

  signup.addEventListener('click', (e) => {
    e.preventDefault()
    console.log("singup user is called")
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let username = "Cinephile" + Math.floor(Math.random() * (1000 - 100 + 1))

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // for creating user entry in firebase
        set(ref(database, 'users/' + user.uid), {
          username: username,
          email: email,
          password: password
        })

        // alert("user created")
        container.style.background='white'
        container.innerHTML=`<div class="loader"></div>`
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorMessage)
      });
  })

})







// for log in of existing user

login.addEventListener('click', (e) => {
  e.preventDefault()
  let dt = new Date()
  console.log("login user is called")
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // for updating user entry in firebase
      update(ref(database, 'users/' + user.uid), {
        last_login: dt
      })
      // alert('user logged in')
      container.style.background='white'
      container.innerHTML=`<div class="loader"></div>`
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
})

formClose.addEventListener('click', () => {
  loginForm.classList.remove('active');
  if (loginState) {
    location.reload()
  }
});

function forspinner(){
      loginForm.classList.remove('active')
}




// to check if there exists a user currently

onAuthStateChanged(auth, (user) => {

  const userLoggedIn = document.createElement('div')
  if (user) {
    console.log("if user is called")
    const uid = user.uid;
  
  
    loginBtn.style.visibility = 'hidden';
    dropdownDiv.style.visibility = 'visible';

    setTimeout(forspinner,4000)

    const userData = ref(database, 'users/' + user.uid);

    onValue(userData, (snapshot) => {
      const data = snapshot.val();
      // console.log(data)
      localStorage.setItem('profileData', JSON.stringify(data));
      let profileData = JSON.parse(localStorage.profileData)
      let profileName = profileData.username
      let profileEmail = profileData.email

      let btnSend =document.querySelector('button')
      btnSend.innerHTML=`hii ${profileName}`;

      dropdownContent.innerHTML = `
      
        <div class="box">Name: ${profileName}</div>
         <div class="box">Email:${profileEmail}</div>
         <a href="favourite.html" onclick="displayDataList()">WatchList</a>
        <a href="#">Link 2</a>
        <input type="button" id="logout" value="login out" class="btn">
        `
      document.getElementById('logout').addEventListener('click', (e) => {
        // let userloggedin = document.getElementById('userloggedin')
        // userloggedin.remove()
        document.getElementById('myDropdown12').style.visibility = 'visible';
        document.getElementById('login-btn').style.visibility = 'hidden';
        signOut(auth).then(() => {
          // Sign-out successful.
          alert("user logged out")
          loginState = 0
          localStorage.clear()
          location.reload()
        }).catch((error) => {
          // An error happened.
        });
      })
    });

  } else {

  
  }
});




