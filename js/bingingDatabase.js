
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';


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
const database =getDatabase(app);

const auth = getAuth(app);

var loginState=0;
const element=document.getElementById('login-btn')
const credential=document.getElementById('credentialForm')
const formClose = document.querySelector('#form-close');

document.getElementById('signupcontainer').addEventListener('click',(e)=>{
  let formName=document.getElementById('formName')
  formName.innerHTML="sign up"

  const button=document.createElement('signup')
  button.setAttribute('id','signup')
  button.setAttribute('value','sign up')
  button.setAttribute('value','Sign Up')

  credential.innerHTML=`
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

  signup.addEventListener('click',(e)=>{
    let email=document.getElementById('email').value
    let password=document.getElementById('password').value
    let username="Cinephile" + Math.floor(Math.random() * (1000 - 100 + 1))
  
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;


      set(ref(database,'users/'+ user.uid),{
          username: username,
          email : email,
          password: password
      })
  
      alert("user created")
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

const user=auth.currentUser

login.addEventListener('click',(e)=>{
  e.preventDefault()
  let dt=new Date()
  let email=document.getElementById('email').value
  let password=document.getElementById('password').value
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    update(ref(database,'users/'+user.uid),{
      last_login:dt
  })
    // alert('user logged in \n Now click on close button')
    loginForm.classList.remove('active')
    setTimeout(location.reload(),3000)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
})

formClose.addEventListener('click', () => {
  loginForm.classList.remove('active');
  if(loginState){
    location.reload()
  }
});
onAuthStateChanged(auth, (user) => {
 
  const userLoggedIn=document.createElement('div')
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // console.log(user)
    // ...
    
      userLoggedIn.classList.add('userloggedin')
      userLoggedIn.setAttribute('id', 'userloggedin')
      userLoggedIn.innerHTML=element.innerHTML
      element.appendChild(userLoggedIn)
      // console.log(element) 

      const userData = ref(database,'users/'+user.uid);
      
      onValue(userData, (snapshot) => {
      const data = snapshot.val();
      // console.log(data)
      localStorage.setItem('profileData', JSON.stringify(data));
      let profileData=JSON.parse(localStorage.profileData)
      let profileName=profileData.username
      let profileEmail=profileData.email
      credential.innerHTML=`
      <form action="" id="credentialForm">
            <h3 id="formName">Profile</h3>
            <div class="box">Name: ${profileName}</div>
            <div class="box">Email: ${profileEmail}</div>
            <input type="button" id="logout" value="login out" class="btn">
        </form>`
        logout.addEventListener('click',(e)=>{
          let userloggedin=document.getElementById('userloggedin')
        
          userloggedin.remove()
          signOut(auth).then(() => {
            // Sign-out successful.
            alert("user logged out")
            loginState=0
            localStorage.clear()
            location.reload()
          }).catch((error) => {
            // An error happened.
          });
        })
      });

  } else {
    
    // User is signed out
    // ...
  }
});




