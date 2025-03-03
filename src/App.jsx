import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
function App() {
  // console.log("tes", process.env.NODE_ENV);
  const [count, setCount] = useState(0);
  const ipcRenderer = window.ipcRenderer;
  const electronAPI = window.electron.ipcRenderer;
  const [info, setInfo] = useState({
    status: false,
    data: [],
  });
  const users = window.users;
  const getUser = users.getUser();
  const elec = window.dir;
  const onSubmit = (value) => {
    return electronAPI.send("submit:tes", value);
  };

  electronAPI.on("submit:success", (ev, args) => {
    setInfo((prev) => {
      return { status: true, data: args };
    });
  });

  useEffect(() => {
    if (info.status == true) {
      console.log(info);
      setInfo((prev) => {
        return { status: false, data: [] };
      });
      console.log("submit success");
      alert("submit success");
    }
  }, [info]);

  return (
    <>
      <div>
        <div>{elec.data()}</div>
        <div>
          {getUser.map((user, index) => {
            return (
              <div key={index}>
                {user.id} - {user.name}
              </div>
            );
          })}
        </div>
        <button
          className="text-3xl font-bold underline"
          onClick={(e) => {
            e.preventDefault;
            console.log("clicked");
            return onSubmit("tes");
          }}
        >
          tes button AAAA
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
