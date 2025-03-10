import React, { useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import Content from "../../components/Content";

const MainSetting = () => {
  const electronAPI = window.electron.ipcRenderer;
  const [directorySelected, setDirectorySelected] = useState("");
  const [dbFileSelected, setDbFileSelected] = useState("");

  const selectDirectory = (value) => {
    return electronAPI.send("selectDirectory", value);
  };

  electronAPI.on("directory:selected", (ev, args) => {
    // console.log(args);
    if (args.success == true) {
      setDirectorySelected(args.data.directory[0]);
    } else {
      alert(args.errors);
    }
  });

  electronAPI.on("dbFile:selected", (ev, args) => {
    // console.log(args);
    if (args.success == true) {
      setDbFileSelected(args.data.directory[0]);
    } else {
      alert(args.errors);
    }
  });

  const openFileFromDirectory = (value) => {
    return electronAPI.send("openFileFromDirectory", value);
  };

  const onSubmitBackup = (value) => {
    return electronAPI.send("submit:backup", value);
  };

  const onSubmitSwapSqlite = (value) => {
    return electronAPI.send("submit:swapDb", value);
  };

  return (
    <Content title={`Settings`}>
      <div>
        <div className="mb-3 mt-5 flex  items-end">
          <div className="">
            <div className="text-sm font-bold w-full mb-2">Backup sqlite db file</div>
            <input
              type="text"
              onClick={(e) => {
                e.preventDefault;
                selectDirectory("open");
              }}
              value={directorySelected}
              readOnly={true}
              placeholder="Select directory"
              className="input input-sm w-60 me-2"
            />
            <button
              onClick={(e) => {
                e.preventDefault;
                if (directorySelected == "") return alert("First of all, select the directory where the database backup will be stored.");
                return onSubmitBackup(directorySelected);
              }}
              className="btn btn-sm btn-primary"
            >
              Backup now
            </button>
          </div>
        </div>
        <div className="flex items-end mt-5 mb-5">
          <div className=" me-2">
            {" "}
            <div className="text-sm font-bold w-full mb-2"> swap sqlite database with the one you saved before </div>
            <input
              type="text"
              onClick={(e) => {
                e.preventDefault;
                openFileFromDirectory("open");
              }}
              value={dbFileSelected}
              readOnly={true}
              placeholder="Choose db/sqlite/sqlite3 file"
              className="input input-sm w-60 me-2"
            />
            <button
              onClick={(e) => {
                e.preventDefault;
                if (dbFileSelected == "") return alert("choose the database sqlite from your directory");
                return onSubmitSwapSqlite(dbFileSelected);
              }}
              className="btn btn-sm btn-primary bottom-0"
            >
              Swap database now
            </button>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default MainSetting;
