import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async(e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5010/api/user/register', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({username, password})
    })
    if (res.status === 200){
      alert('Registration Successfull')
      navigate('/', {replace: true})
    }else if (res.status === 400){
      alert('Username already exist')
    }else{
      alert('Registration Failure');
    }
  }
  
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
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
      <button>Register</button>
    </form>
  );
}
