"use client";
import { useEffect, useState } from "react";
import { socket } from "@/socketClient";

export default function Home() {
  const [input, setInput] = useState("");
  const [messaggi, setMessaggi] = useState([]);
  // Client side
  useEffect(() => {
    socket.connect(() => {
      console.log("Connected to server");
      console.log(socket.id); // Stampa l'ID della connessione
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  socket.on("chat message", (msg) => {
    setMessaggi((prev) => prev.push(msg));
  });

  return (
    <>
      <main>
        <input type="text" onChange={(e) => setInput(e.target.value)} />

        <button
          onClick={() => {
            socket.emit("chat message", input);
          }}
        >
          Vai
        </button>

        <div>
          {messaggi.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </div>
      </main>
    </>
  );
}
