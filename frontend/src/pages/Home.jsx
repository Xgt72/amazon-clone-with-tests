import { Link, useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import useAxiosPrivate from "@hooks/useAxiosPrivate";

export default function Home() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    try {
      await axiosPrivate.get("logout");
      // console.debug("You're logout");
      setAuth({});
      navigate("/linkpage");
    } catch (err) {
      navigate("/linkpage");
    }
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Link to="/linkpage">Go to the Link page</Link>
      <div className="flexGrow">
        <button type="button" onClick={logout}>
          Sign Out
        </button>
      </div>
    </section>
  );
}
