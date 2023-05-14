"use client";
import { useEffect, useState } from "react";


export default function Home() {


  const item = localStorage.getItem("data");
  const data = JSON.parse(item!);


  const Logout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("token");
    location.replace('/login')
  }


  return (
    <>
    <div>
      Hola :D --- { data.firstName  } {  data.lastName }


      <div className="mt-2 bg-cyan-400 w-1/6 text-white">
      <button onClick={()=> Logout()}>Cerrar Sesión</button>
      </div>
    </div>
    </>
  );
}
