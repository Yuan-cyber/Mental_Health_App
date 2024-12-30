import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./index.css";
import Login from "./login/Login";

import React from "react";
import Routes from "./router/router";
const App: React.FC = () => {
  const handleLoginSuccess = (token: string) => {
    localStorage.setItem("authToken", token); // 保存token到localStorage
    console.log("Login successful! Token saved.");
    // 可以在这里添加重定向逻辑，例如使用 react-router 进行路由跳转
  };

  return (
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  );
};

export default App;
