import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import React, { useEffect, useState, useRef } from "react";

const Pagination = ({ pagination }) => {
  const [url, setUrl] = useState(new URL(location)); //pagination
  const [href, setHref] = useState(null);
  const pagRef = useRef(null);
  // useEffect(() => {
  //     console.log(pagination);
  //     console.log(url);
  // }, []);

  //status = url
  //number = label
  const changePage = (number, status) => {
    if (status) {
      if (number == "&laquo; Previous" || number == "Next &raquo;") {
        let getPage = null;

        if (number == "&laquo; Previous") {
          getPage = new URL(pagination[0].url);
          url.searchParams.set("page", getPage.searchParams.get("page"));
        } else if (number == "Next &raquo;") {
          getPage = new URL(pagination[pagination.length - 1].url);
          url.searchParams.set("page", getPage.searchParams.get("page"));
        }
        // console.log(url);
      } else {
        url.searchParams.set("page", number);
      }

      pagRef.current.href = url.pathname + url.search;
      setHref(url.pathname + url.search);
      setTimeout(() => {
        pagRef.current.click();
      }, 500);
    } else {
      return;
    }
  };

  return (
    <>
      <nav className="mt-2">
        <ul className="pagination flex justify-center">
          <Link ref={pagRef} className="btn btn-success hidden" href={href} method="get">
            2
          </Link>
          <div className="overflow-auto inline-block">
            {pagination.map((val, index) => {
              return (
                <li
                  className={`inline-block`}
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    return changePage(val.label, val.url);
                  }}
                >
                  {/* <button
                                    className={`border border-zinc-300 px-3 py-1 text-white bg-[#2c508a] hover:bg-[#213e6d] disabled:bg-slate-400 disabled:cursor-not-allowed`}
                                    href="#"
                                    disabled={val.url ? false : true}
                                >
                                    {val.label
                                        .replace(
                                            "&laquo; Previous",
                                            "Sebelumnya"
                                        )
                                        .replace("Next &raquo;", "Berikutnya")}
                                </button> */}

                  <button
                    className={`inline-block px-3 py-1 text-white ${
                      url.searchParams.get("page") == val.label || (url.searchParams.get("page") == null && val.label == "1") ? `bg-[#213e6d]` : ``
                    } font-semibold hover:bg-[#213e6d] disabled:text-zinc-400 disabled:cursor-not-allowed`}
                    href="#"
                    disabled={val.url ? false : true}
                  >
                    {val.label.replace("&laquo; Previous", "Previous").replace("Next &raquo;", "Next")}
                  </button>
                </li>
              );
            })}
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
