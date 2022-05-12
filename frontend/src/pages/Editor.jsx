import { Link } from "react-router-dom";

export default function Editors() {
  return (
    <section>
      <h1>Editors Page</h1>
      <br />
      <p>You must have been assigned an Editor role</p>
      <br />
      <Link className="flexGrow" to="/">
        Home
      </Link>
    </section>
  );
}
