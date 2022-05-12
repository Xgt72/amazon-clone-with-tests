/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Register.scss";
import { useAuthContext } from "@contexts/AuthProvider";
import axios from "@api/axios";
import { useRef, useState, useEffect } from "react";

const LOGIN_URL = "/login";

export default function Login() {
  const { setAuth } = useAuthContext();

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

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
      console.debug(response?.data);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, pwd, roles, accessToken });
      setEmail("");
      setPwd("");
      setSuccess(true);
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

  return success ? (
    <section>
      <h1>You are logged in!</h1>
      <br />
      <p>
        <a href="#">Got to Home</a>
      </p>
    </section>
  ) : (
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
            <a href="#">Sign Up</a>
          </span>
        </p>
      </form>
    </section>
  );
}
