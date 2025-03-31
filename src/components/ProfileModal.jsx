import React, { useRef, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import { toastFire, toastFireFailed } from "./utils/Toast";
import Cookies from "js-cookie";

const ProfileModal = () => {
  const [userCookie, setUserCookie] = useState(Cookies.get("userData") ? JSON.parse(Cookies.get("userData")) : null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState({});
  const electronAPI = window.electron.ipcRenderer;
  const submitRef = useRef(null);

  const initialvalue = {
    name: userCookie.name,
    email: userCookie.email,
  };

  const validationSchema = object().shape({
    name: string().required(),
    email: string().required(),
  });

  electronAPI.on("editProfile:status", (ev, args) => {
    if (args.status == true) {
      // console.log(JSON.parse(Cookies.get("userData")));
      // setError({});
      setSuccess(args.message);
      setTimeout(() => {
        setSuccess("");
      }, 10000);

      Cookies.set("userData", args.data);
      setUserCookie(Cookies.get("userData") ? JSON.parse(Cookies.get("userData")) : null); //update userCookie state
    } else {
      setError(args);
    }
  });

  const submit = async (values) => {
    if (values.name == "" || values.email == "") {
      // console.log("empty");
      return false;
    } else {
      if (values.name != userCookie.name || values.email != userCookie.email) {
        return await electronAPI.send("submit:editProfile", { name: values.name, email: values.email, name_slug: userCookie.name_slug });
      }
      // console.log("same data");
    }
  };

  return (
    <dialog id="myProfile" className="modal">
      <div className="modal-box w-sm">
        <h3 className="font-bold text-lg">My profile</h3>

        {error.message ? (
          <div role="alert" className="alert alert-error mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error.message}</span>
          </div>
        ) : null}

        {success != "" ? (
          <div role="alert" className="alert alert-success mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{success}</span>
          </div>
        ) : null}

        <div className="mt-3">
          <Formik
            initialValues={initialvalue}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              submit(values);
              return false;
            }}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="grid grid-cols-1">
                <div className="w-full">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Name</legend>
                    <Field name="name" id="name" className="input w-full" placeholder="Type here" required></Field>
                    <p className="fieldset-label">
                      <ErrorMessage name="name"></ErrorMessage>
                    </p>
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email</legend>
                    <Field name="email" id="email" type="email" className="input w-full" placeholder="Type here" required></Field>
                    <p className="fieldset-label">
                      <ErrorMessage name="email"></ErrorMessage>
                    </p>
                  </fieldset>
                  {/* <fieldset className="fieldset">
                    <legend className="fieldset-legend">Role</legend>
                    <input value={user.role} className="input w-full" placeholder="Type here" disabled={true}></input>
                  </fieldset> */}
                </div>
              </div>
              <div className="mt-4 w-full hidden">
                <button ref={submitRef} type="submit" className="btn btn-md btn-primary w-full md:w-fit">
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-secondary">Close</button>
          </form>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              return submitRef.current.click();
            }}
          >
            Update Profile
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ProfileModal;
