import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./View.css";

const AddMood = () => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const tags = [
    { label: "Happiness", className: "happiness" },
    { label: "Anxiety", className: "anxiety" },
    { label: "Depression", className: "depression" },
    { label: "Peace", className: "peace" },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log({ tag, topic, description });
    try {
      const userId = sessionStorage.getItem("userid") || null;
      const token = sessionStorage.getItem("token");
      console.log(token);

      const res = await axios.post(
        "http://localhost:8084/moodpacks/add",
        {
          userId,
          tag: tag.toLowerCase(),
          topic,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        alert("MoodPack added successfully!");
        //setMessage("MoodPack added successfully!");
        setTopic("");
        setDescription("");
        setTag("");
      }
    } catch (error) {
      console.error("Failed to add MoodPack:", error);
      //setMessage("Failed to add MoodPack");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const toCommunity = () => {
    navigate("/community");
  };

  const toHome = () => {
    navigate("/home");
  };

  const toGame = () => {
    navigate("/game");
  };

  const handleLogout = () => {
    // Clear the user session data
    sessionStorage.removeItem("userid");
    alert("You are logged out");
    navigate("/login");
  };

  return (
    //动态类名：${mood.className}
    //条件类名：${tag === mood.label ? "active" : ""} ，
    //检查当前选中的标签（tag）是否与按钮的标签（mood.label）相匹配。
    <div className="homeContent">
      <div className="top">
        <div className="left">
          <div className="logo"></div>
          <div className="logoText">Moodwave</div>
        </div>
        <div className="right">
          <Button className="primary-button" onClick={() => toHome()}>
            MoodPack
          </Button>
          <Button className="rounded-button" onClick={() => toCommunity()}>
            Community
          </Button>
          <Button className="rounded-button" onClick={() => toGame()}>
            Game
          </Button>
          <Button className="rounded-button" onClick={() => handleLogout()}>
            Logout
          </Button>
        </div>
      </div>
      <div className="center">
        <div className="centerContent">
          <div className="slogan" style={{ textAlign: "center" }}>
            It's okay to not be okay sometimes.<br></br> Allow yourself to feel,
            and remember that healing is a process.
          </div>
          <div>
            {message && <div className="span">{message}</div>}
            {/*conditionally render content*/}
          </div>
        </div>
      </div>
      <div className="board">
        <div className="boardContent">
          <p className="how-do-i-feel">How do I feel now...</p>

          <form className="formAdd" onSubmit={(e) => handleSubmit(e)}>
            {tags.map((mood) => (
              <button
                type="button"
                key={mood.label}
                className={`mood-tag-button-small ${mood.className} ${
                  tag === mood.label ? "active" : ""
                }`}
                onClick={() => setTag(mood.label)}
              >
                {mood.label}
              </button>
            ))}
            <hr></hr>
            <input
              className="textArea-small"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Topic"
              required
            />
            <hr></hr>
            <input
              className="textArea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <hr></hr>
            <Button className="submit-button" htmlType="submit">
              Submit
            </Button>
            <Button className="back-button" onClick={handleBack}>
              Back
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMood;
