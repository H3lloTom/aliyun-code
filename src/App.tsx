import React from "react";
import InputSearch from "./InputSearch";

export default function App() {
  const link = () => {
    window.location.href = "/tree.html";
  };
  return (
    <div className="App">
      <button onClick={link}>跳转目录树</button>
      <InputSearch />
    </div>
  );
}
