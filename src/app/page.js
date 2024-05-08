"use client"
import { useEffect } from "react";
import { socket } from "@/socketClient";


export default function Home() {
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

  return (
    <>
      <main>
        <button onClick={()=>{
          socket.emit("chat message", "ciaoGino")
        }}>Vai</button>
      </main>
    </>
  );
}
