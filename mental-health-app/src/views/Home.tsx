import { useState } from "react";
import "./View.css";
import { Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const btnList = [
  {
    id: 1,
    text: "Happiness",
    bgc: "pink",
  },
  {
    id: 2,
    text: "Anxiety",
    bgc: "rgba(238, 211, 70, 0.81)",
  },
  {
    id: 3,
    text: "Depression",
    bgc: "grey",
  },
  {
    id: 4,
    text: "Peace",
    bgc: "rgba(174, 224, 211, 1)",
  },
];

// define moodpack
interface MoodPack {
  id: number;
  tag: string;
  topic: string;
  description: string;
  dateTime: Date;
  public: boolean;
}

const Home = () => {
  const [list, setList] = useState<MoodPack[]>([]);
  const navigate = useNavigate();

  const handleBtn = async (tag: string) => {
    console.log(tag);
    //get userId & token
    const userId = sessionStorage.getItem("userid") || null;
    const token = sessionStorage.getItem("token");
    console.log(token);

    try {
      const response = await axios.get<MoodPack[]>(
        `http://localhost:8084/moodpacks/tag`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { tag: tag.toLowerCase(), userId },
        }
      );

      setList(
        response.data.map((moodpack: any) => ({
          id: moodpack.moodId,
          tag: moodpack.tag,
          topic: moodpack.topic,
          description: moodpack.description,
          dateTime: moodpack.dateTime,
          public: moodpack.public,
        }))
      );
      /* loadedMoodPacks is a new array containing all the objects mapped from the API response
      const loadedMoodPacks: MoodPack[] = [];

      for (const key in response.data) {
        loadedMoodPacks.push({
          id: response.data[key].moodId,
          tag: response.data[key].tag,
          topic: response.data[key].topic,
          description: response.data[key].description,
          dateTime: response.data[key].dateTime,
          public: response.data[key].public,
        });
      }
      console.log(loadedMoodPacks);
      setList(loadedMoodPacks);
      
      {
        console.log("List contents:", list);
      }*/
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleRead = (moodPack: MoodPack) => {
    console.log(moodPack, "mood");
    navigate(`/read-more-detail`, { state: { moodPack } });
  };

  const toAddMood = () => {
    navigate("/add-mood-pack");
  };

  const toGame = () => {
    navigate("/game");
  };

  const toCommunity = () => {
    navigate("/community");
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
          <Button className="primary-button">MoodPack</Button>
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
          <div
            style={{
              height: "30px",
            }}
          ></div>
          <div id="heading" className="slogan">
            {" "}
            You Are Capable Of Healing
          </div>
          <Button className="addBtn" onClick={() => toAddMood()}>
            {/*<Link to="/add-mood-pack"></Link>*/}+ Add a New Mood Pack
          </Button>
        </div>
      </div>

      <div className="tips">
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255, 50, 120, 0.8)",
            fontWeight: 500,
            paddingTop: "54px",
          }}
        >
          click on these tags👇
        </div>

        <div
          style={{
            fontSize: "18px",
            color: "rgba(255, 50, 120, 0.8)",
            fontWeight: 500,
            paddingTop: "60px",
            paddingLeft: "6px",
          }}
        >
          to access your mood records
        </div>
      </div>
      <div
        style={{
          height: "50px",
        }}
      ></div>
      <div className="board">
        <div className="boardContent">
          <div style={{ position: "relative", height: "60px" }}>
            <h1 className="myMood">My Mood Packs</h1>
          </div>
          <div className="btnStyle">
            {btnList.map((item) => {
              return (
                <div
                  onClick={() => handleBtn(item.text)}
                  key={item.id}
                  className="fourBtn"
                  style={{ backgroundColor: item.bgc }}
                >
                  <div className="text">{item.text}</div>
                </div>
              );
            })}
          </div>
          <div className="moodTable">
            <table>
              <tbody>
                <tr>
                  <th>Mood</th>
                  <th>Date</th>
                  <th style={{ width: "150px" }}></th>
                </tr>
                <tr className="border"></tr>
                {list.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.topic}</td>
                      <td>{new Date(item.dateTime).toLocaleString()}</td>
                      <td>
                        <div
                          className="readMore"
                          onClick={() => handleRead(item)}
                        >
                          Read More
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
