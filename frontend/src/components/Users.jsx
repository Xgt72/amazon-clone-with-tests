import { useState, useEffect } from "react";
import useAxiosPrivate from "@hooks/useAxiosPrivate";

export default function Users() {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  console.debug(axiosPrivate);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("users", {
          signal: controller.signal,
        });
        console.debug(response.data);
        if (isMounted) {
          setUsers(response.data);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      <br />
    </article>
  );
}
