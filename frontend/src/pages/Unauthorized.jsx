export default function Unauthorized() {
  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className="flexGrow">
        <button type="button">Go Back</button>
      </div>
    </section>
  );
}
