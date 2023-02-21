import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "../styles/Login.css";

const firebase = require("firebase/app");
const fire = require("firebase/auth");

const app = firebase.initializeApp({
  apiKey: "AIzaSyBdo-9REbvNterk3UIMaAJhvd35BK2v0ls",
  authDomain: "where-was-i-426bb.firebaseapp.com",
  projectId: "where-was-i-426bb",
  storageBucket: "where-was-i-426bb.appspot.com",
  messagingSenderId: "236551239143",
  appId: "1:236551239143:web:406264d0b12a3428fc7942",
});
const auth = fire.getAuth(app);

function LoginForm({
  setLogin,
  setCurrentView,
  setUserInfo,
  loginPassword,
  loginUsername,
  setloginUsername,
  setloginPassword,
  setIsSignUp,
}) {
  async function loginUser(e) {
    e.preventDefault();
    let email = await fetch(
      `http://localhost:4000/user?username=${loginUsername}`
    );
    let data = await email.json();
    if (data.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `username does not exist`,
      });
    } else {
      fire
        .signInWithEmailAndPassword(auth, data[0].email, loginPassword)
        .then((userCredential) => {
          var user = userCredential.user.uid;
          setLogin(data[0].user_id);
          localStorage.setItem("user_id", data[0].user_id);
          setCurrentView("Homepage");
          setUserInfo({
            username: data[0].username,
            email: data[0].email,
            user_id: data[0].user_id,
          });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${errorMessage}`,
          });
        });
    }
  }

  function handleSignUpChange() {
    setIsSignUp(true);
  }

  return (
    <div className="login-area">
      <div className="login-title">
        <h2>Where Was I?</h2>
        <h3>Welcome back!</h3>
        <h3>Login to keep track of your show progress.</h3>
      </div>
      <div className="login-container">
        <form onSubmit={loginUser} className="form-login">
          <div className="login-user-field">
            <label for="username">
              <FontAwesomeIcon icon={faUser} />
            </label>
            <input
              placeholder="Username"
              type="text"
              name="username"
              value={loginUsername}
              onChange={(event) => setloginUsername(event.target.value)}
            />
          </div>
          <div className="login-pass-field">
            <label for="password">
              <FontAwesomeIcon icon={faLock} />
            </label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={loginPassword}
              onChange={(event) => setloginPassword(event.target.value)}
            />
          </div>
          <div className="login-btn-field">
            <button type="submit" className="btn">
              Login
            </button>
            <button className="btn" onClick={handleSignUpChange}>
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
