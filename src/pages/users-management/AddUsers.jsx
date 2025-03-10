import React, { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import Content from "../../components/Content";

const AddUsers = () => {
  const users = window.users;
  const electronAPI = window.electron.ipcRenderer;

  return (
    <Content title={`Add User`}>
      {/* <div>
        {users.getUser().map((user, index) => {
          return (
            <div key={index}>
              {user.id} - {user.name}
            </div>
          );
        })}
      </div>
      <div>tes aja</div> */}
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="bg-amber-200 w-full">a</div>
          <div className="bg-amber-600 w-full">a</div>
        </div>
      </>
    </Content>
  );
};

export default AddUsers;
