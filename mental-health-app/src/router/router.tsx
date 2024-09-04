// routes.tsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../login/Login";
import Home from "../views/Home";
import AddMood from "../views/AddMood";
import ReadMoreDetail from "../views/ReadMoreDetail";
import Community from "../views/Community";
import PickDetail from "../views/PickDetail";
import Create from "../login/Create";
import Game from "../views/Game";
import Play from "../views/Play";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/add-mood-pack" element={<AddMood />} />
        <Route path="/read-more-detail" element={<ReadMoreDetail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/pick-detail/" element={<PickDetail />} />
        <Route path="/game" element={<Game />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
