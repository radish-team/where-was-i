import "../styles/Navbar.css";

function Navbar({ setLogin, homeButtonHandler, addShowHandler }) {
  async function handlerLogout() {
    setLogin("false");
    localStorage.setItem("user_id", "false");
  }

  return (
    <div className="navbar-container">
      <div className="header" onClick={homeButtonHandler}>
        <h1>
          WHERE
          <br />
          WAS I ?
        </h1>
      </div>
      <ul>
        <li>
          <span onClick={handlerLogout}>LOGOUT</span>
        </li>
        <li>
          <span onClick={addShowHandler}>ADD SHOW</span>
        </li>
        <li>
          <span onClick={homeButtonHandler}>HOME</span>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
