import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // console.log("tes", process.env.NODE_ENV);
  const [count, setCount] = useState(0);
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
        {/* <div>{elec.data()}</div> */}
        {/* <div>
          {getUser.map((user, index) => {
            return (
              <div key={index}>
                {user.id} - {user.name}
              </div>
            );
          })}
        </div> */}
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
      </div>
    </>
  );
}

export default App;
