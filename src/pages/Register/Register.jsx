import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import { register } from "../../api/auth.api";
import Loader from "react-loader-spinner";
import "../css/auth.css";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  const { mutate, isLoading, error } = useMutation(
    (userData) => register(userData),
    {
      retry: 3,
      onSuccess: (res) => {
        history.push("/login", { message: res.data.message });
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      email: email,
      username: username,
      password: password,
    });
  };

  return (
    <div className="auth-container">
      <form className="auth-form">
        <h1>Register</h1>
        <div className="form-group">
          <label htmlFor="">EMAIL</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span className="error">
            {error && error.response.data.error.email}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="">username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <span className="error">
            {error && error.response.data.error.username}
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
            {error && error.response.data.error.password}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="">Confirm password</label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <span className="error">
            {error && error.response.data.error.confirmPassword}
          </span>
        </div>

        <button
          id="submit-button"
          type="button"
          onClick={(e) => handleSubmit(e)}
        >
          {isLoading ? (
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={20}
              width={20}
              timeout={3000} //3 secs
            />
          ) : (
            <>Register</>
          )}
        </button>

        <p className="redirect">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};
