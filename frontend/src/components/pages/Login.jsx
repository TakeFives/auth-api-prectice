import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { login, user } = useContext(AuthContext);
    console.log("Login component user:", user);

  const navigation = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await login(credentials);
        setMessage(`Welcome back, ${credentials.username}!`);
        navigation("/recipes");
    } catch (error) {
        console.error("Login failed:", error);
        setMessage("Login failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    if (user) {
      navigation("/recipes");
    }
  }
  , [user, navigation]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Don`t have an account? <a href="/register">Register here</a>
      </p>
    </>
  );
};

export default Login;
