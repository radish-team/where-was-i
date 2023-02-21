import { useState, useEffect } from "react";
import Show from "./Show";
import "../styles/Show.css";
import "../styles/Delete.css";

function Update({
  deleteButton,
  setDeleteButton,
  showname,
  singleShowId,
  login,
  setDefaultView,
  setCurrentView,
}) {
  function goBack(e) {
    e.preventDefault();
    setDeleteButton(false);
    setDefaultView(true);
  }

  async function deleteShow(e) {
    e.preventDefault();
    const obj = {
      show_id: singleShowId,
      user_id: login,
    };
    const query = await fetch(
      "http://localhost:4000/user/shows?user_id=" +
        login +
        "&show_id=" +
        singleShowId,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify(obj),
      }
    );
    setCurrentView("Homepage");
  }

  return (
    <div className="delete-container">
      <br></br>
      <h3>Are you sure you want to delete this show?</h3>
      <div className="delete-btn-container">
        <button onClick={deleteShow} className="btn delete-btn">
          Yes
        </button>
        <button onClick={goBack} className="btn">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Update;
