import React, { useState, useEffect } from "react";
import API from "../utils/API";
import PlayerOne from "./PlayerOne/PlayerOne";
import PlayerTwo from "./PlayerTwo/PlayerTwo";
import PlayerThree from "./PlayerThree/PlayerThree";
import PlayerFour from "./PlayerFour/PlayerFour";

const ViewStats = (props) => {
  console.log("ayo props check: " + props.player1.player);
  const [playerState, setPlayerState] = useState({
    matchId: props.matchId,
    player1: props.player1.player || "",
    player2: props.player2.player || "",
    player3: props.player3.player || "",
    player4: props.player4.player || "",
  });

  const [statsState, setStatsState] = useState({
    player1: "",
    player2: "",
    player3: "",
    player4: "",
  });

  const showData = () => {
    // pullName()
    API.getMatch(playerState.matchId)
      .then((result) =>
        setStatsState({
          player1: result.data.players[0] || "",
          player2: result.data.players[1] || "",
          player3: result.data.players[2] || "",
          player4: result.data.players[3] || "",
        })
      )
      .catch((err) => console.log(err));
  };

  useEffect ( () => {
    showData();
  }, []);
  
  if (
    playerState.player2 === "" &&
    playerState.player3 === "" &&
    playerState.player4 === ""
  ) {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <PlayerOne player1={statsState.player1} />
        </div>
      </div>
    );
  } else if (playerState.player3 === "" && playerState.player4 === "") {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <PlayerOne player1={statsState.player1} />
          <PlayerTwo player2={statsState.player2} />
        </div>
      </div>
    );
  } else if (playerState.player4 === "") {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <PlayerOne player1={statsState.player1} />
          <PlayerTwo player2={statsState.player2} />
          <PlayerThree player3={statsState.player3} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <PlayerOne player1={statsState.player1} />
          <PlayerTwo player2={statsState.player2} />
          <PlayerThree player3={statsState.player3} />
          <PlayerFour player4={statsState.player4} />
        </div>
      </div>
    );
  }
};

export default ViewStats;
