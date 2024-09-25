import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import { Button } from "antd";
//interface Props {
//onLoginSuccess: (token: string) => void; // 登录成功后的回调函数
//}

const Login = () => {
  // state variables to hold the username and password entered by the user
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // preventing the default form submission behavior
    event.preventDefault();

    setLoading(true);
    setError(null);
    // making a POST request to the /login endpoint with the username and password
    try {
      const response = await fetch("http://localhost:8084/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });
      if (!response.ok) {
        throw new Error("Please check your name and password");
      }

      // get JSON response, and deconstruct
      const res = await response.json();
      const { token, userId } = res;

      // store token and userid into sessionStorage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userid", userId);

      console.log("Login successful. Token and User ID stored.");

      // redirect to home page
      toHome();

      //获取response.text内容，这里获取到的是后端添加的userId
      //const res = await response.text();
      //console.log("success", res);

      //存到session
      //sessionStorage.setItem("userid", res);
    } catch (err) {
      console.log("error");
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const toHome = () => {
    navigate("/home");
  };

  const toCreate = () => {
    navigate("/create");
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
        <div className="welcomeLine">
          <div className="welcome">Welcome let's get started!</div>
        </div>
        <div className="loginBoard">
          <div className="loginBoardContent">
            <form className="loginForm" onSubmit={handleSubmit}>
              <input
                className="input"
                type="text"
                value={name}
                name="username"
                onChange={(e) => setName(e.target.value)}
                placeholder="username"
              />
              <br></br>
              <input
                className="input"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />

              <Button
                className="login-button"
                name="login"
                htmlType="submit"
                disabled={loading}
              >
                Login
              </Button>
              {error && (
                <p style={{ color: "rgba(220, 63, 63, 1)", fontSize: "12px" }}>
                  {error}
                </p>
              )}

              <div className="createLink">
                <span className="text-stone-500">No account yet?</span>
                <span>
                  <button className="text-blue-400" onClick={toCreate}>
                    Create account
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

/*<form onSubmit={handleSubmit}>
      <div>
        
        <input
          type="text"
          value={name}
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=""
        />
      </div>
      <div>
        <button type="submit">
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </form>
  );
};*/
