import React, { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import Content from "../../components/Content";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import { toastFire } from "../../components/utils/Toast";

const AddUser = () => {
  const navigateTo = useNavigate();
  const users = window.users;
  const electronAPI = window.electron.ipcRenderer;
  const initialvalue = {
    name: "",
    email: "",
    password: "",
    roles: "",
  };

  electronAPI.on("addUser:status", (ev, args) => {
    if (args.success == true) {
      return toastFire("Create user success");
    }
  });

  const onSubmit = async (value) => {
    await electronAPI.send("submit:addUser", {
      name: value.name,
      email: value.email,
      password: value.password,
      roles: value.roles,
    });
  };

  const validationSchema = object().shape({
    name: string().required(),
    email: string().required(),
    password: string().required(),
    roles: string().required(),
  });

  return (
    <Content title={`Add User`}>
      <Formik
        initialValues={initialvalue}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log("Form data:", values);

          // setSubmitting(false);
          resetForm();
          onSubmit(values);
          // await onSubmit(values);
          return false;
          // navigateTo("/user-management");
        }}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
            <div className="w-full">
              {" "}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <Field name="password" type="password" id="password" className="input w-full" placeholder="Type here" required></Field>
                <p className="fieldset-label">
                  <ErrorMessage name="password"></ErrorMessage>
                </p>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Roles</legend>
                <Field name="roles" id="roles" as="select" className="input w-full" placeholder="Type here">
                  <option value="">-- select roles --</option>
                  <option value="red">Admin</option>
                  <option value="green">Normal-User</option>
                </Field>
                <p className="fieldset-label">
                  <ErrorMessage name="roles"></ErrorMessage>
                </p>
              </fieldset>
            </div>
          </div>
          <div className="mt-4 w-full flex justify-end">
            <button type="submit" className="btn btn-md btn-primary w-full md:w-fit">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </Content>
  );
};

export default AddUser;
