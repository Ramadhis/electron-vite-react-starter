import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const ipcRenderer = window.ipcRenderer;
  const elec = window.dir;
  const onSubmit = (value) => {
    return ipcRenderer.send("submit:tes", value);
  };

  return (
    <>
      <div>
        <div>{elec.data()}</div>
        <button
          onClick={(e) => {
            e.preventDefault;
            return onSubmit("tes");
          }}
        >
          tes
        </button>
        <a href="https://vite.dev" target="_blank">
          <img src={"./assets/logo.png"} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
