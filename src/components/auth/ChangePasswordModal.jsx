import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, ref } from "yup";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toastFire } from "../utils/Toast";

const ChangePasswordModal = () => {
  const user = Cookies.get("userData") ? JSON.parse(Cookies.get("userData")) : null;
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");
  const electronAPI = window.electron.ipcRenderer;
  const refSubmit = useRef(null);

  const initialvalue = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  electronAPI.on("changePassword:status", (ev, args) => {
    if (args.status == true) {
      setSuccess(args.message);
      setTimeout(() => {
        setSuccess("");
      }, 10000);
    } else {
      // console.log(args);
      setError({ message: args.message });
      setTimeout(() => {
        setError({});
      }, 20000);
    }
  });

  const validationSchema = object().shape({
    currentPassword: string().required(),
    newPassword: string().required(),
    confirmPassword: string()
      .required()
      .oneOf([ref("newPassword"), null], "Confirm passwords must match with new password"),
  });

  const submit = (values) => {
    return electronAPI.send("submit:changePassword", { ...values, name_slug: user.name_slug });
  };

  return (
    <dialog id="changePassword" className="modal">
      <div className="modal-box w-sm">
        <h3 className="font-bold text-lg">Change Password</h3>
        {success != "" ? (
          <div role="alert" className="alert alert-success mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{success}</span>
          </div>
        ) : null}
        {error.message ? (
          <div role="alert" className="alert alert-error mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error.message}</span>
          </div>
        ) : null}

        <div className="mt-3">
          <Formik
            initialValues={initialvalue}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              submit(values);
              resetForm();
              return false;
            }}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="grid grid-cols-1">
                <div className="w-full">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Current Password</legend>
                    <Field name="currentPassword" id="currentPassword" type="password" className="input w-full" placeholder="Type here" required></Field>
                    <p className="fieldset-label">
                      <ErrorMessage name="currentPassword"></ErrorMessage>
                    </p>
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">New Password</legend>
                    <Field name="newPassword" id="newPassword" type="password" className="input w-full" placeholder="Type here" required></Field>
                    <p className="fieldset-label">
                      <ErrorMessage name="newPassword"></ErrorMessage>
                    </p>
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Confirm New Password</legend>
                    <Field name="confirmPassword" id="confirmPassword" type="password" className="input w-full" placeholder="Type here" required></Field>
                    <p className="fieldset-label">
                      <ErrorMessage name="confirmPassword"></ErrorMessage>
                    </p>
                  </fieldset>
                </div>
              </div>
              <div className="mt-4 w-full hidden">
                <button ref={refSubmit} type="submit" className="btn btn-md btn-primary w-full md:w-fit">
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
            className="btn btn-primary"
            type="button"
            onClick={() => {
              return refSubmit.current.click();
            }}
          >
            Change Password
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ChangePasswordModal;
