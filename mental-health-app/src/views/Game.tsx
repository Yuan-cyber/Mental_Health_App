import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import runImage from "../assets/run.png";

const Game: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/play");
  };

  const toHome = () => {
    navigate("/home");
  };

  const handleLogout = () => {
    // Clear the user session data
    sessionStorage.removeItem("userid");
    alert("You are logged out");
    navigate("/login");
  };

  const toCommunity = () => {
    navigate("/community");
  };

  return (
    <div className="homeContent">
      <div className="top">
        <div className="left">
          <div className="logo"></div>
          <div className="logoText">Moodwave</div>
        </div>
        <div className="right">
          <Button className="rounded-button" onClick={() => toHome()}>
            MoodPack
          </Button>
          <Button className="rounded-button" onClick={() => toCommunity()}>
            Community
          </Button>
          <Button className="primary-button">Game</Button>
          <Button className="rounded-button" onClick={() => handleLogout()}>
            Logout
          </Button>
        </div>
      </div>
      <div className="center">
        <div className="centerContent">
          <div className="slogan-game" style={{ textAlign: "center" }}>
            Bad moods are like little{" "}
            <span
              style={{ color: "rgba(255, 50, 120, 0.8)", fontWeight: "bold" }}
            >
              monsters
            </span>{" "}
            with different looks;
            <div
              className="centerContent"
              style={{ width: "500px", fontSize: "22px" }}
            >
              go through them, using the arrow keys<br></br>⬅️ ➡️ for moving
              <br></br>⬆️ for jumping
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div>
          <Button className="game-btn" onClick={handleStartGame}>
            Enter the Game
          </Button>
        </div>
        <div className="slogan-game2">
          Embracing your emotions, rather than avoiding them
        </div>
      </div>
      <div className="mt-32 flex justify-end">
        <img src={runImage} className="w-64 h-auto" />
      </div>
    </div>
  );
};

export default Game;
