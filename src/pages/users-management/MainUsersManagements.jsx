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
  const [searchData, setSearchData] = useState(searchParams.get("search") != null ? searchParams.get("search") : "");
  const location = useLocation();
  const navigateTo = useNavigate();
  const electronAPI = window.electron.ipcRenderer;
  const users = window.users;
  const [listUsers, setListUser] = useState([]);
  const totalPageCalc = listUsers.length > 0 ? { ...listUsers[0] } : { totalPage: 0 }; // for pagination
  const totalPage = totalPageCalc.totalPage; // for pagination
  const userCookie = Cookies.get("userData") ? JSON.parse(Cookies.get("userData")) : null;

  //user name slug
  const deleteUsers = async (name_slug) => {
    await electronAPI.send("users:delete", {
      name_slug: name_slug,
    });
  };

  electronAPI.on("users:deleted", (ev, args) => {
    toastFire("Delete success");
    setListUser(users.getUser({ currentPage: currentPage }));
  });

  //set list data / load data user
  useEffect(() => {
    setListUser(users.getUser({ currentPage: currentPage, search: searchData }));
  }, [location]);

  useEffect(() => {
    setSearchParams({
      page: currentPage,
      search: searchData,
    });
  }, [currentPage, searchData]);

  const updateCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const updateSearchParamsPage = (page) => {
    setCurrentPage(page);
    setSearchParams((prev) => {
      return { ...prev, page: currentPage };
    });
  };

  return (
    <Content title={`User Management`}>
      <div className="flex justify-end">
        <div className="join mb-5">
          <div>
            <label className="input">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                value={searchData}
                onChange={(e) => {
                  return setSearchData(e.target.value);
                }}
                type="search"
                className="grow"
                placeholder="Search"
              />
            </label>
          </div>
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
            {listUsers.length > 0 ? (
              listUsers.map((val, index) => {
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
              })
            ) : (
              <>
                <tr>
                  <td colSpan="6" className="text-center">
                    No data found
                  </td>
                </tr>
              </>
            )}
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
      {listUsers.length > 0 ? (
        <div className="flex justify-end">
          <Pagination currentPage={currentPage} totalPage={totalPage} updateCurrentPage={updateCurrentPage} updateSearchParamsPage={updateSearchParamsPage} />
        </div>
      ) : null}
    </Content>
  );
};

export default MainUsersManagements;
