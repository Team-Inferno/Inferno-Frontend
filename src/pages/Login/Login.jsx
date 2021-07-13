import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../api/auth.api";
import { setUser } from "../../redux/user.slice";
import jwt_decode from "jwt-decode";
import Loader from "react-loader-spinner";
import "../css/auth.css";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const { mutate, isLoading, error } = useMutation(
    (userData) => login(userData),
    {
      retry: 3,
      onSuccess: (res) => {
        console.log("hellow from react query");
        const decoded = jwt_decode(res.data.jwt);
        console.log(decoded);
        dispatch(setUser(decoded));
        history.push("/home");
      },
    }
  );

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
            {error && error.response.data.error.email}
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
        <p className="forgot-password">
          Forgot password? <Link to="/Register">Reset</Link>
        </p>

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
