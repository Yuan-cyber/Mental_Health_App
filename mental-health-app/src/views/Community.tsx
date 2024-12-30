import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./View.css";

interface MoodPack {
  id: number;
  tag: string;
  topic: string;
  description: string;
  dateTime: Date;
  user_id: number;
}

const Community = () => {
  const [moodPacks, setMoodPacks] = useState<MoodPack[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicMoodPacks = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const response = await axios.get<MoodPack[]>(
          "http://localhost:8084/moodpacks/public",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMoodPacks(
          response.data.map((moodpack: any) => ({
            id: moodpack.moodId,
            tag: moodpack.tag,
            topic: moodpack.topic,
            description: moodpack.description,
            dateTime: moodpack.dateTime,
            user_id: moodpack.userId,
          }))
        );
      } catch (error) {
        console.error("Error fetching moods:", error);
      }
    };

    fetchPublicMoodPacks();
  }, []);
  //空数组说明只在打开页面时渲染一次

  const handlePick = (moodPack: MoodPack) => {
    console.log(moodPack, "mood");
    navigate(`/pick-detail`, { state: { moodPack } });
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
          <Button className="rounded-button" onClick={() => toHome()}>
            MoodPack
          </Button>
          <Button className="primary-button">Community</Button>
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
            <div>
              It's okay to not be okay sometimes.<br></br> Allow yourself to
              feel, and remember that healing is a process.
            </div>
          </div>
        </div>
      </div>

      <div
        className="tips"
        style={{
          fontSize: "24px",
          color: "rgba(255, 50, 120, 0.8)",
          fontWeight: 500,
        }}
      >
        take a look at other's drifting mood packs👇
      </div>

      <div className="board">
        <div className="boardContent">
          <h1 className="text-center font-bold text-3xl mx-auto py-2">
            MoodPack Ocean
          </h1>
          <table>
            <tbody>
              <tr>
                <th>Mood</th>
                <th>Description</th>
                <th style={{ width: "150px" }}></th>
              </tr>
              <tr className="border"></tr>
              {moodPacks.map((moodPack) => (
                <tr key={moodPack.id}>
                  <td>{moodPack.topic}</td>
                  <td>{moodPack.description}</td>
                  <td>
                    <div>
                      <button
                        className="readMore"
                        onClick={() => handlePick(moodPack)}
                      >
                        Pick
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Community;
