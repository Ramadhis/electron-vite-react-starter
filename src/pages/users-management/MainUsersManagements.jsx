import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Content from "../../components/Content";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import confirmButtonFire from "../../components/utils/ConfirmDialog";
import { toastFire } from "../../components/utils/Toast";
import Cookies from "js-cookie";
import Pagination from "../../components/utils/Pagination";

const MainUsersManagements = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") ? parseInt(searchParams.get("page")) : 1);
  const location = useLocation();
  const navigateTo = useNavigate();
  const electronAPI = window.electron.ipcRenderer;
  const users = window.users;
  const [listUsers, setListUser] = useState([]);

  const deleteUsers = async (name_slug) => {
    await electronAPI.send("users:delete", {
      name_slug: name_slug,
    });
  };

  electronAPI.on("users:deleted", (ev, args) => {
    toastFire("Delete success");
    setListUser(users.getUser({ currentPage: currentPage }));
  });

  useEffect(() => {
    setListUser(users.getUser({ currentPage: searchParams.get("page") }));
    // console.log("MainUserLoc", location);
  }, [location]);

  useEffect(() => {
    setSearchParams({
      page: currentPage,
    });
  }, [currentPage]);

  const updateCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const updateSearchParamsPage = (page) => {
    setCurrentPage(page);
    setSearchParams({ page: currentPage });
  };

  return (
    <Content title={`User Management`}>
      <div className="flex justify-end">
        <div className="join mb-5">
          <div>
            <label className="input input-sm join-item">
              <input type="text" placeholder="Search..." />
            </label>
            <div className="validator-hint hidden"></div>
          </div>
          <button className="btn btn-sm btn-primary join-item">Search</button>
        </div>
      </div>
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
                          return navigateTo(`/user-management/edit-user/${val.name_slug}`, {
                            state: {
                              prevUrl: location,
                            },
                          });
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
      <div className="flex justify-end">
        {/* <button
          className="btn btn-primary"
          onClick={() => {
            setCurrentPage((prev) => {
              return prev + 1;
            });
          }}
        >
          +
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            setCurrentPage((prev) => {
              return prev - 1;
            });
          }}
        >
          -
        </button> */}
        <Pagination currentPage={currentPage} updateCurrentPage={updateCurrentPage} updateSearchParamsPage={updateSearchParamsPage} />
      </div>
    </Content>
  );
};

export default MainUsersManagements;
