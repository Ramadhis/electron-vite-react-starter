import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const Content = ({ title, children }) => {
  const pathname = window.location.hash;
  var pathnameSplit = pathname.split("/").slice(1);
  const navigateTo = useNavigate();
  const location = useLocation();
  const urlBreadcrumb = () => {
    var t = pathnameSplit
      .reduce(function (a, b) {
        if (b != "" && a) {
          a.push(b);
        }
        return a;
      }, [])
      .reduce(function (a, b, index, ar) {
        a.push("/" + ar.slice(0, ar.length - index).join("/") + "/");
        return a;
      }, []);

    return t.reverse();
  };

  const back = () => {
    history.back();
  };

  const breadcrumbName = (pathnameSplit) => {
    const splitPathname = pathnameSplit.split("-");
    let breadcrumbText = "";
    splitPathname.map((val, index) => {
      breadcrumbText += val.charAt(0).toUpperCase() + val.slice(1) + " ";
    });
    return breadcrumbText;
  };

  // useEffect(() => {
  //   console.log("locationNow", location);
  // }, []);

  return (
    <div>
      <div className="mb-2">
        <div className="text-lg mt-4">{title}</div>
        <div className="breadcrumbs text-sm">
          <ul>
            {urlBreadcrumb().length - 1 >= 1 ? (
              <button
                onClick={() => {
                  return back();
                }}
                className="btn btn-xs bg-primary text-primary-content flex justify-evenly me-2"
              >
                <ChevronLeftIcon className="w-4 text-primary-content" /> Back
              </button>
            ) : (
              <div></div>
            )}
            {urlBreadcrumb().map((val, index) => {
              return index === urlBreadcrumb().length - 1 ? (
                <li key={index}>{breadcrumbName(pathnameSplit[index]).split("?")[0]}</li>
              ) : (
                <li key={index}>
                  {/* <Link to={val}>{breadcrumbName(pathnameSplit[index]).split("?")[0]}</Link> */}
                  {breadcrumbName(pathnameSplit[index]).split("?")[0]}
                </li>
              );
            })}
          </ul>
          {/* <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Documents</a>
            </li>
            <li>Add Document</li>
          </ul> */}
        </div>
      </div>
      <div className="card w-full bg-base-100 shadow-sm p-3">{children}</div>
    </div>
  );
};

export default Content;
