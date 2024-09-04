import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
import "./View.css";

//define comment
interface Comment {
  id: number;
  text: string;
  time: Date;
  user_id: number;
}

const PickDetail = () => {
  const location = useLocation();
  //{}作用：解构，否则会传一整个location.state,moodPackh只是其中一部分
  const { moodPack } = location.state;
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("userid");
  console.log("user:" + userId);

  //const num_userId = Number(userId);

  useEffect(() => {
    const fetchComments = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const response = await axios.get(
          `http://localhost:8084/comment/${moodPack.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComments(
          response.data.map((comment: any) => ({
            id: comment.commentId,
            text: comment.text,
            user_id: comment.userId,
          }))
        );
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [moodPack]);

  const submitComment = async (e: any) => {
    e.preventDefault();
    try {
      const moodId = moodPack.id;
      console.log(moodId, text);

      const token = sessionStorage.getItem("token");

      const res = await axios.post(
        `http://localhost:8084/comment/addcomment`,
        {
          moodId,
          userId,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        alert("Comment added successfully!");
        setText("");
      }
      console.log("Comment added successfully!");
    } catch (error) {
      console.error("Failed to submit comment:", error);
      alert("Failed to add comment");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getTagStyle = (tag: any) => {
    switch (tag) {
      case "happiness":
        return "happiness";
      case "anxiety":
        return "anxiety";
      case "depression":
        return "depression";
      case "peace":
        return "peace";
    }
  };

  const toHome = () => {
    navigate("/home");
  };

  const toCommunity = () => {
    navigate("/community");
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

  if (!moodPack) return <p>Loading...</p>;

  return (
    <div className="homeContent">
      <div className="top">
        <div className="left">
          <div className="logo"></div>
          <div>Moodwave</div>
        </div>
        <div className="right">
          <Button className="rounded-button" onClick={() => toHome()}>
            MoodPack
          </Button>
          <Button className="primary-button" onClick={() => toCommunity()}>
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
            It's okay to not be okay sometimes. <br></br>Allow yourself to feel,
            and remember that healing is a process.
          </div>
        </div>
      </div>
      <div className="board">
        <div className="boardContent">
          <div className="span">
            <span className="spanDate">{moodPack.dateTime}</span>
            <span className={`mood-tag-button ${getTagStyle(moodPack.tag)}`}>
              {moodPack.tag.toUpperCase()}
            </span>
          </div>
          <hr></hr>
          <div className="detail">
            <span style={{ color: "#8E7D7D" }}>Topic: </span>
            {moodPack.topic}
          </div>

          <hr></hr>
          <div className="detail">
            <span style={{ color: "#8E7D7D" }}>Description: </span>
            {moodPack.description}
          </div>
          <hr></hr>
          <div className="detail" style={{ color: "#8E7D7D" }}>
            Comments:
          </div>
          {comments.map((comment) => (
            <p
              key={comment.id}
              className={`${
                comment.user_id === moodPack.user_id
                  ? "author-comment"
                  : "detailSmall"
              }`}
            >
              {comment.text}
            </p>
          ))}
          <hr></hr>
          <input
            className="textArea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Comment"
          ></input>
          <hr></hr>
          <div>
            <Button className="submit-button" onClick={(e) => submitComment(e)}>
              Submit
            </Button>
            <Button className="back-button" onClick={handleBack}>
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickDetail;
