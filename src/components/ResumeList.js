import React from "react";
import { useState, useEffect } from "react";
import Header from "./Header.js";
import CreateResume from "./CreateResume.js";
import { Routes, Route, Link } from "react-router-dom";
import ViewResume from "./ViewResume";
import EditResume from "./EditResume";

function ResumeList() {
  const [show, setShow] = useState(true);
  const [data, setData] = useState([]);
  // Loading initial data from the server
  useEffect(function () {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  function deleteResume(evt) {
    const id = evt.target.getAttribute("data-id");
    fetch(`/api/${id}`, {
      method: "DELETE",
    }).then(() => {
      const newData = data.filter((item) => item.id !== parseInt(id));
      setData(newData);
    });
  }

  function hideHome() {
    setShow(false);
  }
  function showHome() {
    setShow(true);
  }
  return (
    <div className="App">
      <div className="app-btn">
      <button onClick={showHome}>
        <Link to="/">Home</Link>{" "}
      </button>
      <button onClick={hideHome}>
        <Link to="/createResume">Create Resume</Link>{" "}
      </button>
      </div>
      <div className="resume-list">
        {show &&
          data &&
          data.map((item) => (
            <li key={item.id} className="demo-list-item">
              {item.fullName}
              <div className="resume-link">
              <button onClick={hideHome}>
                <Link to={"/ViewResume/" + `${item.id}`}> View</Link>
              </button>
              <button onClick={hideHome}>
                <Link to={"/EditResume/" + `${item.id}`}> Edit</Link>
              </button>
              {<button onClick={deleteResume} data-id={item.id}>
                  Delete
                </button>
              }
              </div>
            </li>
          ))}
      </div>

      <Routes>
        <Route path="/EditResume/:id?" element={<EditResume />} />
        <Route path="/ViewResume/:id?" element={<ViewResume />} />
        <Route
          path="/createResume"
          element={<CreateResume showHome={showHome} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default ResumeList;
