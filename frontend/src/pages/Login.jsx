/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState, useEffect } from "react";
import useAuth from "@hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "@api/axios";

const LOGIN_URL = "/login";

export default function Login() {
  const { dispatch } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // console.debug(response?.data);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const username = response?.data.username;

      dispatch({
        type: "LOGIN",
        payload: { username, email, roles, accessToken },
      });
      setEmail("");
      setPwd("");
      // console.debug(from);
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </label>
        <button type="submit">Sign In</button>
        <p>
          Need an Account?
          <br />
          <span className="line">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </form>
    </section>
  );
}
