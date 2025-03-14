import React from "react";
import { Link } from "react-router-dom";
import Content from "../../components/Content";
const MainUsersManagements = () => {
  const usersList = window.users.getUser();

  return (
    <Content title={`User Management`}>
      <div className="overflow-x-auto">
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
            {usersList.map((val, index) => {
              return (
                <tr key={index}>
                  <th>{val.id}</th>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.role}</td>
                  <td>{val.updated_at}</td>
                  <td>
                    <button className="btn bg-red-700">Delete</button>
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
