import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigateTo = useNavigate();
  const electronAPI = window.electron.ipcRenderer;

  const initialvalue = {
    email: "",
    password: "",
  };

  electronAPI.on("login:success", () => {
    console.log("success");
    return navigateTo("/");
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
