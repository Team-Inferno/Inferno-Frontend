import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../api/auth.api";
import Loader from "react-loader-spinner";
import useAuthorization from "../../hooks/useAuthorization";
import "../css/auth.css";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { saveToken } = useAuthorization();
  const history = useHistory();

  const { mutate, isLoading, error } = useMutation(
    (userData) => login(userData),
    {
      retry: 3,
      onSuccess: (res) => {
        saveToken(res.data.jwt);
        history.push("/home");
      },
    }
  );

  console.log(error?.message);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      email: email,
      password: password,
    });
  };

  return (
    <div className="auth-container">
      {/*if user gets registered and needs to display verification email message from the props*/}
      {props.location.state ? (
        <div className="auth-message">
          <span>{props.location.state.message}</span>
        </div>
      ) : (
        ""
      )}

      <form className="auth-form">
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="">EMAIL</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span className="error">
            {error && error.response ? error.response.data.error.email : null}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="">PASSWORD</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <span className="error">
            {error && error.response
              ? error.response.data.error.password
              : null}
          </span>
        </div>
        <p className="forgot-password">
          Forgot password? <Link to="/Register">Reset</Link>
        </p>

        <button
          id="submit-button"
          type="button"
          onClick={(e) => handleSubmit(e)}
        >
          {isLoading ? (
            <Loader type="ThreeDots" color="#00BFFF" height={20} width={20} />
          ) : error ? (
            <>
              {" "}
              {error.message && <span className="error">{error.message}</span>}
            </>
          ) : (
            <>LOGIN</>
          )}
        </button>

        <p className="redirect">
          Don't have an account? <Link to="/Register">Register</Link>
        </p>
      </form>
    </div>
  );
};
