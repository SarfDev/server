"use client";
import { useEffect, useState } from "react";
import { socket } from "@/socketClient";

export default function Home() {
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [array,setArray] = useState([])

  const [noChange,setNoChange] = useState(false)

  // Client side
  useEffect(() => {
    socket.connect(() => {
      console.log("Connected to server");
      console.log(socket.id); // Stampa l'ID della connessione
    })

    return () => {
      socket.on("chat message",(msg, userName) =>{setArray(prevArray => [...prevArray, {userName,msg}])})
      socket.disconnect();
    };
  }, []);

  

  return (
    <>
      <main>
      <div className="flex gap-3">

        <label>Inserisci il Nome user</label>
        <input type="text" value={userName} disabled={noChange} onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="flex gap-3">

        <label>Inserisci il messaggio</label>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        </div>

        <button
          onClick={() => {
            socket.emit("chat message", input, userName);
            setNoChange(true)
            setInput(" ")
          }}
        >
          Vai
        </button>

        <div>
          {array.map((e, i) => (
            <p key={i}>{e.userName} : {e.msg}</p>
          ))}
        </div>
      </main>
    </>
  );
}
