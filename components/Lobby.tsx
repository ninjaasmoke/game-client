"use client";

import { uuid } from "@/app/handler";
import useFrontendStore from "@/app/store";
import styles from "@/components/Lobby.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

function Lobby() {
  const router = useRouter();
  const [screen, setScreen] = useState("welcome");
  const { roomId, setRoomId, setBrowserId } = useFrontendStore();

  const createRoom = async () => {
    try {
      const response = await axios.get("https://game-socket.azurewebsites.net/create");
      setRoomId(response.data);
      router.push(`/room/${response.data}`);
    } catch (error) {
      console.error(error);
    }
  };

  const joinRoom = async (roomId: string) => {
    router.push(`/room/${roomId}`);
  };

  useEffect(() => {
    // if window.localStorage.getItem("browserId") is null, set it to uuid
    const bId = window.localStorage.getItem("browserId");
    console.log(bId);
    if (bId == null) {
      window.localStorage.setItem("browserId", uuid);
      setBrowserId(uuid);
    } else {
      setBrowserId(bId);
    }
    console.log(window.localStorage.getItem("browserId"));
  }, []);

  return (
    <div className={styles.lobby}>
      {screen === "welcome" && (
        <WelcomeScreen setScreen={setScreen} createRoom={createRoom} />
      )}
      {screen === "join" && (
        <JoinRoomScreen setScreen={setScreen} joinRoom={joinRoom} />
      )}
    </div>
  );
}

export default Lobby;

type WelcomeScreenProps = {
  setScreen: (screen: "welcome" | "join" | "create") => void;
  createRoom: () => void;
};
function WelcomeScreen({
  setScreen,
  createRoom,
}: WelcomeScreenProps): React.ReactElement {
  return (
    <>
      <h1>Welcome to the Lobby</h1>
      <p>Find a game to join or create a new game</p>

      <div className={styles.buttons}>
        <button className={styles.joinGame} onClick={() => setScreen("join")}>
          Join
        </button>
        <button
          className={styles.createGame}
          onClick={() => {
            createRoom();
            setScreen("create");
          }}
        >
          Create
        </button>
      </div>
    </>
  );
}

type JoinRoomScreenProps = {
  joinRoom: (roomId: string) => void;
  setScreen: (screen: "welcome" | "join" | "create") => void;
};

function JoinRoomScreen({
  joinRoom,
  setScreen,
}: JoinRoomScreenProps): React.ReactElement {
  const { roomId, setRoomId } = useFrontendStore();

  return (
    <>
      <h1>Join a Room</h1>
      <input
        className={styles.lobbyInput}
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button
        onClick={() => {
          setRoomId(roomId);
          joinRoom(roomId);
        }}
        className={styles.joinGame}
      >
        Join
      </button>
      <button onClick={() => setScreen("welcome")} className={styles.back}>
        Back
      </button>
    </>
  );
}
