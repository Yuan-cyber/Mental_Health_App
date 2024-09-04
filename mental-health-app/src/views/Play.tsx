/*import React, { useRef, useEffect, useState } from "react";

const Game: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const [showGame, setShowGame] = useState(false);

  const handleStartGame = () => {
    setShowGame(true);
  };

  useEffect(() => {
    if (showGame) {
      console.log("showGame is true, loading Phaser script");

      const loadPhaserScript = async () => {
        const script = document.createElement("script");
        script.src = `public/dist/app.bundle.js`;

        script.onload = () => {
          console.log("Phaser script loaded");
          // 初始化 Phaser 游戏
          if ((window as any).initGame) {
            console.log("initGame function found");
            (window as any).initGame(gameRef.current);
          } else {
            console.error("initGame function not found");
          }
        };
        document.body.appendChild(script);

        return () => {
          document.body.removeChild(script);
        };
      };

      loadPhaserScript();
    }
  }, [showGame]);

  return (
    <div>
      <button onClick={handleStartGame}>Start Game</button>
      {showGame && <div ref={gameRef}></div>}
    </div>
  );
};

export default Game;*/

const Play = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe
        src={`/dist/index.html`}
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Phaser Game"
      ></iframe>
    </div>
  );
};

export default Play;
