import { Link } from "react-router-dom";

export default function Home() {
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
        <button type="button">Sign Out</button>
      </div>
    </section>
  );
}
