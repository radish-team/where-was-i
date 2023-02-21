import "./styles/App.css";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Show from "./components/Show";
import Navbar from "./components/Navbar";
import AddShow from "./components/addShow/AddShow";

function App() {
  const [login, setLogin] = useState("false");
  const [currentView, setCurrentView] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [showname, setShowname] = useState("");
  const [progress, setProgress] = useState([]);
  const [singleShowId, setSingleShowId] = useState("");
  const [showImage, setShowImage] = useState("");

  const [personalRank, setPersonalRank] = useState("");

  function homeButtonHandler() {
    setCurrentView("Homepage");
  }

  function check() {
    if (localStorage["user_id"] !== "false") {
      setLogin(localStorage["user_id"]);
      setCurrentView("Homepage");
    }
  }
  useEffect(() => {
    check();
  }, [login]);

  function renderSwitch(component) {
    switch (component) {
      case "AddNew":
        return (
          <div className="add-new-show">
            <AddShow currentView={currentView} />
          </div>
        );
      case "SingleShow":
        return (
          <>
            <div className="Homepage">
              <Homepage
                login={login}
                setLogin={setLogin}
                setCurrentView={setCurrentView}
                currentView={currentView}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                setShowname={setShowname}
                setProgress={setProgress}
                setSingleShowId={setSingleShowId}
                setShowImage={setShowImage}
              />
            </div>

            <Show
              currentView={currentView}
              showname={showname}
              progress={progress}
              login={login}
              singleShowId={singleShowId}
              showImage={showImage}
              setCurrentView={setCurrentView}
            />
          </>
        );
      case "Homepage":
        return (
          <div className="Homepage">
            <Homepage
              login={login}
              setLogin={setLogin}
              setCurrentView={setCurrentView}
              currentView={currentView}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setShowname={setShowname}
              setProgress={setProgress}
              setSingleShowId={setSingleShowId}
              setShowImage={setShowImage}
              setPersonalRank={setPersonalRank}
              personalRank={personalRank}
            />
          </div>
        );
      default:
        return;
    }
  }

  function addShowHandler() {
    setCurrentView("AddNew");
  }

  if (login === "false") {
    return (
      <div className="Login">
        <Login
          login={login}
          setLogin={setLogin}
          setCurrentView={setCurrentView}
          setUserInfo={setUserInfo}
        />
      </div>
    );
  } else {
    return (
      <div className="main-page">
        <Navbar
          homeButtonHandler={homeButtonHandler}
          addShowHandler={addShowHandler}
          login={login}
          setLogin={setLogin}
        />
        {renderSwitch(currentView)}
      </div>
    );
  }
}

export default App;
