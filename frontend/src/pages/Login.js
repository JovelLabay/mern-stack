import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN
  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    const { userStatus } = data;
    if (data.userStatus) {
      localStorage.setItem("token", userStatus);
      alert("loggedin");
      window.location.href = "/dashboard";
    } else {
      alert("invalid");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
