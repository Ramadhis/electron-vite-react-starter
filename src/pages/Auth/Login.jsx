import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const navigateTo = useNavigate();
  const [message, setMessage] = useState("");
  const electronAPI = window.electron.ipcRenderer;

  const initialvalue = {
    email: "",
    password: "",
  };

  electronAPI.on("login:status", (ev, args) => {
    if (args.status == true) {
      // console.log(args.data);
      Cookies.set("userData", args.data);
      return navigateTo("/dashboard");
    } else {
      console.log(args.message);
      setMessage(args.message);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  });

  const onSubmit = (value) => {
    electronAPI.send("submit:login", {
      email: value.email,
      password: value.password,
    });
  };

  const validationSchema = object().shape({
    email: string().required(),
    password: string().required(),
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="card bg-base-100 shadow-sm p-3 flex w-fit h-fit ">
        <div className="flex justify-center items-center">
          <img className="w-32 mx-4" src={"./assets/logo.png"} alt="" />
        </div>
        {message != "" ? (
          <div role="alert" className="alert alert-error mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{message}</span>
          </div>
        ) : null}
        <Formik
          initialValues={initialvalue}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            console.log("Form data:", values);
            onSubmit(values);
            // setSubmitting(false);
            resetForm();
            // await onSubmit(values);
            return false;
            // navigateTo("/user-management");
          }}
          validationSchema={validationSchema}
        >
          <Form>
            <fieldset class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
              <legend class="fieldset-legend">Login</legend>

              <label class="fieldset-label">Email</label>
              <Field name="email" id="email" type="email" className="input w-full" placeholder="Type here"></Field>
              <p className="fieldset-label">
                <ErrorMessage name="email"></ErrorMessage>
              </p>

              <label class="fieldset-label">Password</label>
              <Field name="password" type="password" id="password" className="input w-full" placeholder="Type here"></Field>
              <p className="fieldset-label">
                <ErrorMessage name="password"></ErrorMessage>
              </p>

              <button type="submit" class="btn btn-neutral mt-4">
                Login
              </button>
            </fieldset>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
