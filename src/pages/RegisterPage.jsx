import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { Alert,FormRow } from "../components";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
  isMember: true,
};

function RegisterPage() {
  const [values, setValues] = useState(initialState);

  const navigate = useNavigate();
  const { isLoading, showAlert, displayAlert, setupUser, user } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { username, email, password, isMember, confirm_password } = values;
    if (
      !username ||
      !password ||
      (!isMember && !email) ||
      (!isMember && !confirm_password)
    ) {
      displayAlert();
      return;
    }

    if (!isMember && confirm_password !== password) {
      displayAlert("confirm password must be the same with password!");
      return;
    }

    const currentUser = { username, email, password };

    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
        navigate("/");
    }
  }, [user]);

  return (
    <div className="signup-page">
      <div className="signup-form-main">
        <h1>{values.isMember ? "Login" : "Register"}</h1>
        {showAlert && <Alert />}
        {/* username input */}
        <FormRow
          iconBootstrap="bi bi-person-fill"
          type="text"
          name="username"
          placeholder="username"
          value={values.username}
          handlerChange={handleChange}
        />
        {/* email input */}
        {!values.isMember && (
          <FormRow
            iconBootstrap="bi bi-envelope-fill"
            type="text"
            name="email"
            placeholder="email"
            value={values.email}
            handlerChange={handleChange}
          />
        )}
        {/* password input */}
        <FormRow
          iconBootstrap="bi bi-lock-fill"
          type="password"
          name="password"
          placeholder="password"
          value={values.password}
          handlerChange={handleChange}
        />
        {!values.isMember && (
          <FormRow
            iconBootstrap="bi bi-lock"
            type="password"
            name="confirm_password"
            placeholder="confirm password"
            value={values.confirm_password}
            handlerChange={handleChange}
          />
        )}
        <button
          className="signup-btn"
          disabled={isLoading}
          onClick={(event) => {
            onSubmit(event);
          }}
        >
          {isLoading ? "loading..." : "submit"}
        </button>
        <p className="note-user1">
          {values.isMember ? "Not a member yet ?" : "Already a member?"}
          <div
            className="toggle-member-btn"
            onClick={() => {
              if (isLoading) {
                return;
              }
              toggleMember();
            }}
          >
            {!values.isMember ? " login" : " register"}
          </div>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
