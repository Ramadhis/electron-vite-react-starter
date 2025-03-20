import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import Content from "../../components/Content";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import { toastFire } from "../../components/utils/Toast";

const EditUser = () => {
  const { name_slug } = useParams();
  const navigateTo = useNavigate();
  const users = window.users;
  const usersData = users.getUserBySlug({ name_slug });
  const electronAPI = window.electron.ipcRenderer;
  const [initialvalue, setInitialValue] = useState({
    name: usersData.name,
    email: usersData.email,
    roles: usersData.role,
  });

  electronAPI.on("editUser:status", (ev, args) => {
    if (args.success == true) {
      setTimeout(() => {
        toastFire(args.message);
      }, 1000);

      navigateTo("/user-management/");
    }
  });

  const onSubmit = async (value) => {
    await electronAPI.send("submit:editUser", {
      name: value.name,
      email: value.email,
      roles: value.roles,
      name_slug: name_slug,
    });
  };

  const validationSchema = object().shape({
    name: string().required(),
    email: string().required(),
    roles: string().required(),
  });

  useEffect(() => {
    // console.log(usersData.name);
    setInitialValue((prev) => {
      return { name: usersData.name, email: usersData.email, roles: usersData.role };
    });
  }, []);

  return (
    <Content title={`Edit User`}>
      <Formik
        initialValues={initialvalue}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log("Form data:", values);
          onSubmit(values);
          return false;
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
                <legend className="fieldset-legend">Roles</legend>
                <Field name="roles" id="roles" as="select" className="input w-full" placeholder="Type here">
                  <option value="">-- select roles --</option>
                  <option value="admin">Admin</option>
                  <option value="normal-user">Normal-User</option>
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

export default EditUser;
