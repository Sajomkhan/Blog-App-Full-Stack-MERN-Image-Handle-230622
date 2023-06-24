import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:5010/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (res.ok) {
      res.json().then((userData) => {
        setUserInfo(userData);
        navigate("/", { replace: true });
      });
    } else {
      alert("Wrong credentials");
    }
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>LoginPage</button>
    </form>
  );
}

// // Page redirect another away:
//   import {Navigate} from "react-router-dom";
//   const [redirect,setRedirect] = useState(false);
//   if (redirect) {
//     return <Navigate to={'/'} />
//   }
