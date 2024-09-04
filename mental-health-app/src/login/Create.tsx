import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./Login.css";

const Create = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e: any) => {
    e.preventDefault();
    console.log(name, password, phone);
    try {
      const res = await axios.post("http://localhost:8084/create", {
        name,
        password,
        phone,
      });
      if (res.status === 200) {
        alert("Successful");
        navigate("/login");
      }
    } catch (error) {
      console.error("Failed to create account. ");
    }
  };

  return (
    <div>
      <div className="homeLeft">
        <div className="top">
          <div className="left">
            <div className="logo"></div>
            <div className="logoText">Moodwave</div>
          </div>
        </div>
        <div className="heading">
          Mental Health<br></br>Support<br></br>Based on CBT
          <p
            style={{
              fontSize: "10px",
              fontWeight: 150,
            }}
          >
            CBT (Cognitive Behavioral Therapy) is a structured,<br></br>
            evidence-based approach<br></br> that helps individuals manage and
            <br></br>
            overcome mental health challenges.
          </p>
        </div>
      </div>
      <div className="homeRight">
        <div className="createAccount">
          <div className="createAccountSign">Create Account</div>
        </div>
        <div className="createBoard">
          <div className="createBoardContent">
            <form className="loginForm" onSubmit={(e) => handleCreate(e)}>
              <input
                className="input-create"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="username"
                required
              />
              <input
                className="input-create"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
              />
              <input
                className="input-create"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="phone no."
                required
              />
              <Button htmlType="submit" className="create-button">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
