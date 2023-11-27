import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
}
