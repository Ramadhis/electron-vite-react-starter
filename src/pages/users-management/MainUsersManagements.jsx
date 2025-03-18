import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Content from "../../components/Content";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import confirmButtonFire from "../../components/utils/ConfirmDialog";
import { toastFire } from "../../components/utils/Toast";

const MainUsersManagements = () => {
  const pathname = window.location;
  const navigateTo = useNavigate();
  const electronAPI = window.electron.ipcRenderer;
  const users = window.users;
  const [listUsers, setListUser] = useState(users.getUser());

  const deleteUsers = async (name_slug) => {
    await electronAPI.send("users:delete", {
      name_slug: name_slug,
    });
  };

  electronAPI.on("users:deleted", (ev, args) => {
    toastFire("Delete success");
    setListUser(users.getUser());
  });

  return (
    <Content title={`User Management`}>
      <div className="overflow-x-auto">
        {/* <Link to={pathname.hash.substring(1)}>aa</Link> */}
        <table className="table table-md table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th>#ID</th>
              <td>Name</td>
              <td>Email</td>
              <td>Roles</td>
              <td>Last update</td>
              <td>#</td>
            </tr>
          </thead>
          <tbody>
            {listUsers.map((val, index) => {
              return (
                <tr key={index}>
                  <th>{val.id}</th>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.role}</td>
                  <td>{val.updated_at}</td>
                  <td>
                    <div className="tooltip tooltip-info" data-tip="Edit User">
                      <button
                        onClick={() => {
                          confirmButtonFire(
                            `Will you delete ${val.name} users account?`,
                            () => {
                              return false;
                            },
                            () => {
                              return false;
                            }
                          );
                        }}
                        className="btn btn-xs bg-blue-600"
                      >
                        <PencilSquareIcon className="w-4 text-white" />
                      </button>
                    </div>
                    <div className="tooltip tooltip-error" data-tip="Delete User">
                      <button
                        onClick={() => {
                          confirmButtonFire(
                            `Will you delete ${val.name} users account?`,
                            () => {
                              return deleteUsers(val.name_slug);
                            },
                            () => {
                              return false;
                            }
                          );
                        }}
                        className="btn btn-xs bg-red-700"
                      >
                        <XMarkIcon className="w-4 text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>#ID</th>
              <td>Name</td>
              <td>Email</td>
              <td>Roles</td>
              <td>Last update</td>
              <td>#</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Content>
  );
};

export default MainUsersManagements;
