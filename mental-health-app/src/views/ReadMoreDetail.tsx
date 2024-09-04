import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";
import "./View.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

//define comment
interface Comment {
  id: number;
  text: string;
  time: Date;
  user_id: number;
}

const ReadMoreDetail = () => {
  const location = useLocation();

  //get moodpack object from location.state(解构，否则会得到整个state)
  const { moodPack } = location.state;
  const [comments, setComments] = useState<Comment[]>([]);

  const [text, setText] = useState("");
  //const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("userid");
  console.log("user:" + userId);
  const num_userId = Number(userId);

  //userEffect(包含依赖数组)，当[moodpack]改变时，setup部分会重新渲染
  //如果传空数组[]：在每次组件重新渲染时都被调用
  useEffect(() => {
    if (moodPack.public) {
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
              moodId: comment.moodId,
              text: comment.text,
              user_id: comment.userId,
            }))
          );
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };
      fetchComments();
    }
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

  //release moodpack
  const handlePublish = async () => {
    try {
      const token = sessionStorage.getItem("token");
      console.log("token in publish:" + token);

      await axios.post(
        `http://localhost:8084/moodpacks/${moodPack.id}/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("MoodPack has been published!");
    } catch (error) {
      console.error("Failed to publish MoodPack:", error);
      alert("Failed to publish MoodPack");
    }
  };

  //go back to the last page
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
          {moodPack.public ? (
            <div>
              <div className="detail" style={{ color: "#8E7D7D" }}>
                Comments:
              </div>
              {comments.map((comment) => (
                <p
                  key={comment.id}
                  className={` ${
                    comment.user_id === num_userId
                      ? "my-comment"
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
                placeholder="Write a comment..."
              ></input>
              <hr></hr>
              <Button
                onClick={(e) => submitComment(e)}
                className="submit-button"
              >
                Submit
              </Button>
              <Button className="back-button" onClick={handleBack}>
                Back
              </Button>
            </div>
          ) : (
            <div>
              <Button onClick={handlePublish} className="drift-button">
                Drift this mood for others to see
              </Button>
              <hr></hr>
              <Button className="back-button" onClick={handleBack}>
                Back
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadMoreDetail;
